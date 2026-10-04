# FastAPI 请求模型与响应模型

## 职责边界

| 模型 | 职责 | 常见字段 |
| --- | --- | --- |
| 请求模型 | 校验客户端允许提交的数据 | 标题、计划日期、优先级 |
| 响应模型 | 约束服务器允许返回的数据 | UUID、创建时间、状态 |

请求模型和响应模型不必相同：

- 客户端不应该决定 UUID、创建时间和初始状态；
- 密码、内部标记等字段不能暴露给客户端；
- 同一业务字段在输入和输出阶段可能使用不同表示。

```text
JSON 请求
  → TaskCreate 校验
  → 服务器生成或转换字段
  → TaskRead 校验
  → 存储
  → response_model 过滤与序列化
  → JSON 响应
```

## 共享字段约束

多个模型具有相同业务字段时，应复用基础模型，避免约束不一致：

```python
from datetime import date, datetime, time
from typing import Literal
from uuid import UUID

from pydantic import BaseModel, Field

TaskStatus = Literal["pending", "completed"]  # 示例状态集合


class TaskBase(BaseModel):
    title: str = Field(min_length=1)
    priority: int = Field(ge=1, le=4)


class TaskCreate(TaskBase):
    plan_date: date
    deadline: time | None = None


class TaskRead(TaskBase):
    id: UUID
    plan_date: date
    deadline: datetime | None = None
    status: TaskStatus
    created_at: datetime
```

`title` 和 `priority` 放在 `TaskBase` 中，请求模型和响应模型会使用相同约束。若两侧约束不同，应是明确的业务设计，而不是遗漏。

真实校验结果：

- `title=""`：触发 `string_too_short`；
- `priority=5`：超过 `le=4`，校验失败；
- `status="done"`：不属于声明的状态集合，校验失败。

如果只在 `TaskCreate` 中限制标题长度，而 `TaskRead` 漏掉约束，内部数据或数据库数据仍可能产生空标题响应。

## 服务器补充字段

```python
from datetime import datetime
from uuid import uuid4


def build_task(data: TaskCreate) -> TaskRead:
    deadline_at = (
        datetime.combine(data.plan_date, data.deadline)
        if data.deadline is not None
        else None
    )

    return TaskRead(
        **data.model_dump(exclude={"deadline"}),
        id=uuid4(),
        deadline=deadline_at,
        status="pending",
        created_at=datetime.now(),
    )
```

这些字段由服务器控制：

- `id`：保证标识生成规则统一且可信；
- `created_at`：使用服务器时间，避免客户端伪造；
- `status`：由业务流程决定初始值和允许的状态变化。

## 同一字段的输入与输出表示

本例中，客户端只输入截止时间：

```python
deadline: time | None
```

服务器结合 `plan_date` 生成完整时间点，响应中返回：

```python
deadline: datetime | None
```

适用条件：

- 客户端输入的是局部信息；
- 服务器拥有补全字段所需的上下文；
- API 文档明确说明输入和输出格式不同。

如果两个表示的语义容易混淆，可使用不同字段名，例如输入 `deadline_time`、输出 `deadline_at`。

## `response_model` 输出边界

```python
from typing import Any

from fastapi import FastAPI

app = FastAPI()


@app.post("/tasks", response_model=TaskRead)
def create_task(data: TaskCreate) -> Any:
    task = build_task(data)
    internal_data = {
        **task.model_dump(),
        "internal_note": "不会出现在响应中",
    }
    return internal_data
```

`response_model` 会：

- 为响应生成 OpenAPI 文档；
- 校验并序列化返回值；
- 只保留响应模型声明的字段；
- 在同时声明函数返回类型时优先生效。

它是路径操作装饰器的参数，不是路径操作函数的参数。函数实际返回的对象可以包含更多字段，但响应结果只暴露 `TaskRead` 定义的边界。

无论使用 `response_model` 还是函数返回类型声明输出模型，密码等敏感字段都应从输出模型中明确排除。

## PATCH：省略、`null` 与具体值

部分更新需要区分三种输入；具体语义由接口契约决定：

| 输入 | 本例语义 |
| --- | --- |
| 省略字段 | 保留旧值 |
| 显式 `null` | `detail`、`priority` 清空；`title`、`plan_date`、`deadline` 拒绝 |
| 具体值 | 校验通过后更新 |

空字符串 `""` 也是具体值，不等于 `null`；例如空标题会被长度约束拒绝。

```python
from pydantic import BaseModel, Field, field_validator


class TaskUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1)
    detail: str | None = None
    priority: int | None = Field(default=None, ge=1, le=4)

    @field_validator("title")
    @classmethod
    def reject_null_title(cls, value):
        if value is None:
            raise ValueError("title 不能为 null")
        return value


assert TaskUpdate().model_dump(exclude_unset=True) == {}
assert TaskUpdate(detail=None).model_dump(exclude_unset=True) == {"detail": None}
```

此例未开启默认值校验，省略 `title` 时不会运行该字段的验证器；显式传入 `null` 则会触发验证。

`exclude_unset=True` 排除的是未提供字段，保留显式传入的 `None`。`exclude_none=True` 会删掉这些 `None`，从而丢失“清空字段”的指令。

### 日期与时刻组合

以下是 Todo 的业务契约，不是 PATCH 的通用规则：

| 本次提供字段 | 新截止时间 |
| --- | --- |
| 只提供 `plan_date` | 新日期 + `23:59:59` |
| 只提供 `deadline` 时刻 | 原日期 + 新时刻 |
| 两者都提供 | 新日期 + 新时刻 |
| 两者都省略 | 保留原截止时间 |

判断分支时检查字段是否出现在更新字典中。仅日期或时刻发生更新时校验新截止时间晚于当前时间；本例允许过期任务只修改标题、备注。

参考：[FastAPI：部分更新与 exclude_unset](https://fastapi.tiangolo.com/tutorial/body-updates/)。

## 检查清单

- 请求模型是否只包含客户端允许控制的字段？
- 响应模型是否遗漏服务器生成字段？
- 敏感字段是否被排除？
- 共享业务字段的约束是否一致？
- 输入与输出表示不同时，转换位置和字段语义是否明确？
- `response_model` 是否与真实返回数据匹配？

参考：[FastAPI 官方文档：响应模型](https://fastapi.tiangolo.com/zh/tutorial/response-model/)

# JSON 解析与业务校验

## 解析成功不等于业务合格

`json.loads()` 负责把 JSON 文本转换为 Python 对象，不负责判断字段是否满足业务要求。例如 `{"title": "", "exercise_count": -2}` 是合法 JSON，但不符合“标题非空白、练习数量非负”的约定。

处理模型结构化回复时，要区分三层：

| 层次 | Python 类型 | 取值或处理 |
| --- | --- | --- |
| 完整 API 响应 | `dict` | 包含 `choices` 等接口字段 |
| 回答内容 | `str` | 本例从 `raw["choices"][0]["message"]["content"]` 取得 |
| 校验后的业务数据 | `dict` | 对回答字符串再做 JSON 解析和业务校验 |

外层响应已解析为字典，不代表其中的回答字符串也自动变成了字典。路径和结构取决于具体接口；HTTP 编码与解析基础见[HTTP 请求与 JSON 数据转换](./08_HTTP请求与JSON数据转换.md)。

## 从用途确定字段约束

以“学习任务草稿”为例：显示任务内容，并读取练习数量。数量未知时保留任务，用 `null` 表示未知，不编造数字。

| 字段 | 必需 | 接收条件 |
| --- | --- | --- |
| `title` | 是 | 非空白字符串 |
| `exercise_count` | 是 | `null`，或非负整数；拒绝布尔值 |

`null` 表示数量未知；`0` 表示数量明确为零；字段缺失则违反本例的必填约定，三者不能混用。其他业务可以采用不同规则。

## 先解析，再逐层校验

以下由任务解析实验提炼，假定 `content` 是字符串。校验通过返回原解析字典，不裁剪标题，也不补猜测值：

```python
import json


def parse_task(content):
    data = json.loads(content)
    if not isinstance(data, dict):
        raise ValueError("整体必须是字典")
    if "title" not in data:
        raise ValueError("缺少 title")
    title = data["title"]
    if not isinstance(title, str) or not title.strip():
        raise ValueError("title 必须是非空白字符串")
    if "exercise_count" not in data:
        raise ValueError("缺少 exercise_count")
    count = data["exercise_count"]
    if count is not None and (type(count) is not int or count < 0):
        raise ValueError("exercise_count 必须为 null 或非负整数")
    return data


task = parse_task('{"title": "复习二分查找", "exercise_count": null}')
assert task == {"title": "复习二分查找", "exercise_count": None}
```

关键写法：

- JSON 的 `null` 由 `json.loads()` 自动转成 Python 的 `None`，判断时使用 `is None` 或 `is not None`；
- `bool` 是 `int` 的子类，`isinstance(True, int)` 为真。要求严格整数时，`type(count) is int` 可拒绝 `True`、`False`；
- `or` 短路求值：类型不对就不执行 `strip()` 或数值比较，避免校验过程先触发无关异常；
- 先检查键存在，再取值，区分“缺字段”和“允许字段为空”；
- 本实现允许并保留额外字段，不是仅允许两个字段的严格模式；校验通过也不保证标题忠实于输入，内容真实性仍是另一层问题。

## 区分解析错误与业务错误

非法 JSON 由 `json.loads()` 抛出 `JSONDecodeError`；JSON 合法但不符合约定，由校验逻辑抛出 `ValueError`。

```python
try:
    task = parse_task('{"title": "练习", "exercise_count": -1}')
except json.JSONDecodeError as error:
    print(f"JSON 语法错误：{error}")
except ValueError as error:
    print(f"业务字段不合格：{error}")
else:
    print(task)
```

`JSONDecodeError` 本身是 `ValueError` 的子类，因此需要区分提示时，应把更具体的 `JSONDecodeError` 放在前面。不要把两类失败都包装成“网络请求失败”；此时请求可能已经成功。

| 代表输入 | 结果 |
| --- | --- |
| 数量为 `2`、`0` 或 `null` | 通过；`null` 对应 `None` |
| 缺少数量字段 | `ValueError` |
| 数量为 `-1`、`"2"`、`2.0` 或 `true` | `ValueError` |
| 标题为空白，或整体为列表 | `ValueError` |
| `{"title": "练习", "exercise_count":}` | `JSONDecodeError` |

## 接入已有调用链

```python
# task_provider 已补固定配置，调用结果仍是完整 API 响应字典
raw = call_with_retry(task_provider, messages, api_key)
answer = raw["choices"][0]["message"]["content"]
task = parse_task(answer)
```

包装函数只补参数并传递返回值，见[包装函数适配调用方式](./01_函数.md#包装函数适配调用方式)。回答提取与业务校验在重试函数返回后执行，因此本例不会自动重试 `parse_task()` 的失败。输出格式配置也不能代替本地业务校验。

## 参考

- [任务解析与调用接入源码](https://github.com/lumikok/agent-engineering-lab/blob/d7ca16f/02-structured-output/01-structured_demo.py)：文中函数为提炼版本，不包含完整脚本与测试流水。
- [Python：JSON 解析与 JSONDecodeError](https://docs.python.org/3/library/json.html)
- [Python：布尔类型与整数类型](https://docs.python.org/3/library/stdtypes.html#boolean-type-bool)

---
date: 2026-10-02
tags:
  - FastAPI
  - pytest
---

# FastAPI 接口测试

## 测试隔离

每个测试都应从可预测的初始状态开始，避免测试之间互相依赖。

```python
import pytest


@pytest.fixture(autouse=True)
def reset_tasks():
    tasks.clear()
    yield
    tasks.clear()
```

内存数据可以直接清空；数据库测试通常使用独立测试库、事务回滚或逐测试重建数据。

## 同时验证正常与失败路径

接口测试不只检查状态码，还应检查响应内容和数据副作用：

```python
before = len(tasks)

response = client.post("/tasks", json=invalid_data)

assert response.status_code == 400
assert len(tasks) == before
```

数量不变可以检查是否意外新增记录，但不能证明旧记录没有被修改。条件允许时，应通过新数据库会话检查实际持久化数据。

### 更新失败：比较完整快照

在失败请求前后，从独立会话查询所有记录，按稳定主键排序，并转换为普通字典快照：

```python
before = await snapshot_all_tasks(test_engine)
response = await client.patch(task_url, json=invalid_update)
assert response.status_code == 400
after = await snapshot_all_tasks(test_engine)
assert after == before
```

`snapshot_all_tasks` 是测试辅助函数：查询全部记录并返回按主键排序的字段字典列表，不能返回同一批可变 ORM 对象引用。

- 比较全部记录可同时发现新增、删除和字段变化；
- 每次 `400`、`422`、`404` 后立即检查，避免后续请求掩盖副作用；
- 成功响应之外，还要通过新会话确认更新已持久化。

### 用非默认数据区分实现分支

测试“只改日期应重置时刻”时，原截止时刻设为 `10:30:00`，再断言新时刻为 `23:59:59`。若原时刻已经是默认值，即使代码错误地保留旧时刻，测试也可能通过。

其他分支同样设置可区分的数据：只改时刻检查日期保留；两者都改检查组合；显式 `null` 检查清空；省略字段检查保留。

## 让排序测试可重复

排序依赖创建时间时，不要依靠测试运行速度制造时间差。应显式提供不同时间，或替换应用中的“获取当前时间”依赖。

```python
assert [task["id"] for task in response.json()] == expected_ids
```

只要接口承诺返回顺序，就应直接断言元素顺序。

## `==` 的比较规则

### 字典

两个字典相等，要求键集合相同，并且每个键对应的值相等；键的书写顺序不影响结果。

```python
assert {"id": 1, "title": "读书"} == {"title": "读书", "id": 1}
```

完整响应不会和只写了部分字段的字典相等。只检查部分字段时，应逐项比较：

```python
expected = {"title": "读书", "priority": 1}
body = response.json()

assert all(body[key] == value for key, value in expected.items())
```

### 列表

两个列表相等，要求长度相同、对应位置的元素相等，因此元素顺序也必须一致：

```python
assert ["high", "low"] != ["low", "high"]
```

如果接口不承诺顺序，应先按稳定字段排序后再比较，或在元素唯一且可哈希时比较集合。

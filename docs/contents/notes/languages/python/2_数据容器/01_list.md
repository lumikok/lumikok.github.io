---
date: 2026-10-02
tags:
  - python
---

# 列表

## 多条件排序

`sort()` 和 `sorted()` 通过 `key` 的返回值决定排序依据，`lambda` 只是临时定义这个函数的一种写法。

```python
tasks.sort(key=lambda task: (task.priority, task.created_at))
```

元组按从左到右的顺序比较：先比较 `priority`，相同时再比较 `created_at`。

### 排序字段可能为 `None`

`None` 不能直接和整数、日期等类型比较。可以先返回“是否为空”的标记，把空值和正常值分组：

```python
tasks.sort(
    key=lambda task: (
        task.priority is None,
        task.priority if task.priority is not None else 0,
        task.created_at,
    )
)
```

- `False < True`，因此非空值排在空值前面；
- 第一个元素相同时，才继续比较后面的元素；
- `reverse=True` 会反转整个排序结果，不适合直接表达“一个字段升序、另一个字段降序”。

### `sort()` 与 `sorted()`

```python
tasks.sort(key=...)             # 修改原列表，返回 None
new_tasks = sorted(tasks, key=...)  # 返回新列表，不修改原列表
```

### 筛选后再统一返回

`return` 放在循环内部会立即结束整个函数，导致最多只处理一个元素：

```python
def get_tasks(tasks, plan_date):
    matched = [task for task in tasks if task.plan_date == plan_date]
    return sorted(matched, key=lambda task: (task.priority, task.created_at))
```

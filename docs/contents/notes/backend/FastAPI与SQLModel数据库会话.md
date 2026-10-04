---
date: 2026-10-04
tags:
  - FastAPI
  - SQLModel
  - 数据库
---

# FastAPI 与 SQLModel 数据库会话

## 数据库、引擎、连接与会话

| 对象 | 职责与生命周期 |
| --- | --- |
| 数据库文件 | 保存已提交的数据，关闭应用后仍存在 |
| engine | 管理数据库连接及连接池，通常由应用复用 |
| connection | 与数据库通信，同一数据库可以有多条连接 |
| session | 跟踪对象变化、执行查询并管理事务，通常按请求创建 |

`session.close()` 释放会话资源，不会删除已提交的数据。新会话访问同一数据库，可以读到之前提交的记录。文件数据库与内存数据库的存活条件不同，不能把关闭连接等同于删除数据。

## 异步会话与事务

```python
from sqlmodel.ext.asyncio.session import AsyncSession


async def get_session():
    async with AsyncSession(engine, expire_on_commit=False) as session:
        yield session
```

FastAPI 通过 `Depends(get_session)` 给路由提供会话，依赖退出时由上下文管理器释放资源。

```python
session.add(task)                 # 将对象加入会话，尚未提交
await session.commit()            # 提交事务
await session.refresh(task)       # 从数据库重新读取对象字段
```

`expire_on_commit=False` 保留提交后的已加载属性，便于返回响应；它不代替提交，也不保证对象自动同步其他会话的更新。

```python
statement = select(Task).where(Task.plan_date == plan_date)
result = await session.exec(statement)
tasks = result.all()
```

`select()` 构造查询；`session.exec()` 执行查询；`all()` 取得结果。

## 更新：先校验候选值，再修改对象

从 session 取出的 ORM 对象会被跟踪。应先在局部变量中形成新值并完成业务校验，通过后再修改对象、提交：

```python
new_deadline = build_candidate_deadline(task, changes)
if deadline_changed and new_deadline <= datetime.now():
    raise HTTPException(status_code=400, detail="截止时间必须晚于当前时间")

for name, value in changes.items():
    if name != "deadline":
        setattr(task, name, value)
if deadline_changed:
    task.deadline = new_deadline

await session.commit()
await session.refresh(task)
```

这里的辅助函数和变量表示业务算法。若先修改对象再检查，失败前就可能污染会话中的对象；某些后续操作还会触发自动 flush。候选值校验不替代事务管理；提交失败时仍需回滚或结束当前会话。

## 每个测试使用独立数据库

关闭会话不能隔离已提交的数据。文件型 SQLite 测试可通过默认函数作用域的 `tmp_path`，为每个测试创建不同数据库文件。

```python
@pytest.fixture
async def test_engine(tmp_path, anyio_backend):
    path = (tmp_path / "test.db").as_posix()
    engine = create_async_engine(f"sqlite+aiosqlite:///{path}")
    try:
        async with engine.begin() as connection:
            await connection.run_sync(SQLModel.metadata.create_all)
        yield engine
    finally:
        await engine.dispose()
```

示例使用 `pytest`、`create_async_engine`、`SQLModel` 导入，并通过 AnyIO 的 `anyio_backend` fixture 选择 `"asyncio"`。

- `conftest.py` 中的 fixture 由 pytest 自动发现；
- fixture/测试通过参数名请求依赖，例如 `client(test_engine)`；
- `yield` 前准备资源，后面释放资源；
- `dispose()` 释放引擎连接资源，不负责删除数据库记录。

### 覆盖接口的会话依赖

```python
async def override_session():
    async with AsyncSession(test_engine, expire_on_commit=False) as session:
        yield session

app.dependency_overrides[get_session] = override_session
try:
    # 此处创建异步客户端并执行测试
    ...
finally:
    app.dependency_overrides.pop(get_session, None)
```

覆盖后，路由获得测试数据库的会话；测试结束撤销覆盖，避免影响后续测试。独立数据库负责数据隔离，关闭客户端/会话/引擎负责资源释放，两者作用不同。

## 测试请求与应用生命周期

`httpx.ASGITransport` 直接调用 ASGI 应用，不自动触发 lifespan。本例由 fixture 手工建表；应用正常启动建表、关闭释放引擎需要另外验证，接口测试通过不能证明启动/关闭流程正确。[HTTPX 官方说明](https://github.com/encode/httpx/blob/master/docs/advanced/transports.md)

## 时间类型：naive 与 aware

- naive datetime：不包含时区信息，例如 `datetime.now()`；
- aware datetime：包含时区信息。

本次使用 SQLModel `0.0.47`，普通 `datetime` 列采用 UTC 时间类型，写入 naive 值时出错。既有接口采用服务器本地时间，因此显式选用 `NaiveDatetime`：

```python
from pydantic import NaiveDatetime
from sqlmodel import SQLModel


class Task(SQLModel, table=True):
    # 省略主键及其他字段
    deadline: NaiveDatetime
    created_at: NaiveDatetime
```

这是保留既有时间契约的选择，不代表所有系统都应使用无时区时间。跨时区系统应统一时间语义，并同时调整输入、比较、存储与输出。[SQLModel 时间类型说明](https://sqlmodel.tiangolo.com/advanced/datetime/)

# HTTP 请求与 JSON 数据转换

## 请求与响应的处理链路

```text
输入校验 → 构造请求对象 → JSON 文本 → UTF-8 字节 → HTTP 请求
响应校验 ← Python 对象 ← JSON 文本 ← UTF-8 字节 ← HTTP 响应
```

输入校验检查发出的数据，响应校验检查收到的数据，两者不能互相代替。例如消息输入要求非空列表，每项包含合法角色和非空白内容；输出要求包含非空白字符串 `text`。这些都是具体接口的契约，不是所有 HTTP 接口的统一格式。

检查按“容器类型 → 必需字段 → 字段类型 → 内容约束”的顺序进行。校验成功后保留原数据；`strip()` 可用于判空，但不必据此裁剪原文。具体实现见[响应数据的分层校验](./05_异常.md#响应数据的分层校验)。

## 请求体结构必须匹配接口

```python
messages = [{"role": "user", "content": "你好"}]
payload = {"messages": messages}
```

`messages` 是列表，`payload` 是包含该列表的字典。两者都能转换成合法 JSON，但结构不同：

```json
[{"role": "user", "content": "你好"}]
```

```json
{"messages": [{"role": "user", "content": "你好"}]}
```

若服务端按 `payload["messages"]` 取值，直接发送列表就不符合接口契约。本地实验中，这种错误返回 HTTP 400；其他服务的状态码取决于实现。`Content-Type: application/json` 只声明数据格式，不会自动补上 `messages` 字段。

## Python 对象、JSON 文本与字节

```python
import json

payload = {"messages": [{"role": "user", "content": "你好"}]}
text = json.dumps(payload, ensure_ascii=False)  # str：JSON 文本
body = text.encode("utf-8")                    # bytes：传输用字节
restored = json.loads(body.decode("utf-8"))     # dict：还原后的对象
assert restored == payload
```

| 操作 | 输入 → 输出 | 作用 |
| --- | --- | --- |
| `json.dumps()` | Python 对象 → `str` | 按 JSON 语法序列化 |
| `.encode("utf-8")` | `str` → `bytes` | 按字符编码转换为字节 |
| `.decode("utf-8")` | `bytes` → `str` | 将字节解码为文本 |
| `json.loads()` | JSON 文本 → Python 对象 | 解析 JSON 结构 |

`ensure_ascii=False` 让中文直接保留在 JSON 文本中，不代表已编码成 UTF-8；编码仍由 `encode()` 完成。默认转成 `\uXXXX` 的中文也能正确还原。

不要用 `str(字典)` 代替 JSON 序列化：Python 的单引号、`None`、`True` 等表示不等于 JSON 的双引号、`null`、`true`。`json.loads()` 也不是响应契约校验：它可能解析出列表、数字等，而不一定是预期的字典。

## 使用标准库发送 JSON POST

以下从本地 HTTP 实验提炼，只展示传输与解析；调用前校验输入，返回后校验响应内容。

```python
import json
from urllib.request import Request, urlopen


def post_json(url, payload, timeout=3.0):
    body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    request = Request(
        url,
        data=body,
        method="POST",
        headers={"Content-Type": "application/json"},
    )
    with urlopen(request, timeout=timeout) as response:
        text = response.read().decode("utf-8")
        return json.loads(text)
```

- `Request` 描述地址、方法、请求头和请求体；`urlopen()` 实际发起请求；
- `data` 使用编码后的字节，`response.read()` 取得响应体字节；
- 本例与服务端约定响应使用 UTF-8 JSON，不应把该解析方式套到所有响应上；
- `with` 确保退出时关闭响应资源，异常交由调用层按阶段处理。

需要区分的失败层次：

| 阶段 | 典型问题 |
| --- | --- |
| 输入校验 | 字段缺失、消息内容类型错误，尚未发请求 |
| HTTP 调用 | 连接失败、等待超时、服务端返回错误状态 |
| 解码与解析 | 字节编码不匹配、响应不是合法 JSON |
| 响应校验 | HTTP 200 且 JSON 可解析，但 `text` 为数字 |

HTTP 200、JSON 可解析、字段契约合格、业务结果正确是不同层次，不能只凭前一层成功就跳过后一层检查。

## 超时与执行结果未知

本地实验服务只返回回显文本，`/slow` 等待 2 秒再尝试回复：

| 请求 | 客户端 `timeout` | 实验结果 |
| --- | --- | --- |
| `/generate` | 3 秒 | 正常返回并通过响应校验 |
| `/slow` | 0.5 秒 | 客户端等待超时 |
| `/slow` | 3 秒 | 延迟后成功返回 |
| `/bad-response` | 3 秒 | HTTP 200，但数字 `text` 被校验拒绝 |

直接 `raise TimeoutError(...)` 只能模拟异常处理路径，不证明发生过真实等待超时。`urlopen(timeout=...)` 针对阻塞操作，不是整个业务调用的严格总时限。

客户端超时只表示未及时取得结果，不代表服务端自动取消，也不能判断操作一定成功或一定没有执行。本地实验中，客户端断开后，服务端仍继续执行并尝试回复；这不能推导为所有超时请求都已成功。

对创建等有副作用的请求，不应因为超时就盲目重发。应查询结果，或在接口提供幂等保障时重发；这里说明处理边界，不展开查询协议或幂等实现。前端中的同类情况见[写入成功与刷新失败](../../web/fundamentals/04_原生前端请求与交互.md#写入成功不等于刷新成功)。

## 参考

- [本地实验源码与运行说明](https://github.com/lumikok/agent-engineering-lab/tree/04f9f56/01-reliable-call)：本文示例为提炼版本，实验为本地 HTTP 通信，不是真实模型服务调用。
- [Python：JSON 序列化与解析](https://docs.python.org/3/library/json.html)
- [Python：urllib.request](https://docs.python.org/3/library/urllib.request.html)

---
title: Agent Engineering Lab
description: 真实模型请求、结构化结果与只读工具调用的小实验。
start: 2026-10
end: present
status: ongoing
method: 个人实践 · AI 辅助学习
repo: https://github.com/lumikok/agent-engineering-lab
stack: Python · HTTP · JSON
order: 2
---

# Agent Engineering Lab

在 Todo API 之后继续做的 Agent 工程练习，已接入 DeepSeek，能解析结构化结果并调用本地只读查询工具。

## 仓库内容

| 单元 | 内容 |
| --- | --- |
| [可靠调用](https://github.com/lumikok/agent-engineering-lab/tree/main/01-reliable-call) | 消息校验、本地 HTTP、真实模型请求、超时与有限重试。 |
| [结构化结果](https://github.com/lumikok/agent-engineering-lab/tree/main/02-structured-output) | 解析 JSON，再检查字段、类型和未知数量的 `null`。 |
| [只读工具调用](https://github.com/lumikok/agent-engineering-lab/tree/main/03-tool-calling) | 接收模型请求，校验并执行白名单查询，按调用 ID 回送结果，限制循环轮数。 |

工具只查内存中的自造题库，不写文件或数据库；取消、持久化和有副作用操作的保护尚未实现。真实模型运行与模拟错误对照分别记录，重试和循环上限不等于总耗时上限。

查询、请求和循环主体由我在 AI 讲解下实现；协议样板、部分错误处理和修正有 AI 帮助。运行方法和完整结果见各单元说明。

## 对应知识笔记

- [HTTP 请求与 JSON 数据转换](/contents/notes/languages/python/08_HTTP请求与JSON数据转换)
- [异常](/contents/notes/languages/python/05_异常)
- [工具调用与有界循环](/contents/notes/ai/agents/05_工具调用与有界循环)

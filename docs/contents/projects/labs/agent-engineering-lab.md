---
title: Agent Engineering Lab
description: 从消息与响应校验、本地 HTTP 和失败对照起步的 Agent 工程学习实验。
start: 2026-10
end: present
status: ongoing
method: 个人实践 · AI 辅助学习
repo: https://github.com/lumikok/agent-engineering-lab
stack: Python · HTTP · JSON
order: 2
---

# Agent Engineering Lab

这是在 Todo API 实践之后开展的 Agent 工程学习仓库，先用小实验连接输入输出契约、HTTP 调用和错误处理。当前服务生成回显文本，尚未完成真实模型调用。

## 已有实践

代码与运行方法见[可靠调用起步单元](https://github.com/lumikok/agent-engineering-lab/tree/main/01-reliable-call)。

- **消息与响应校验**：检查消息列表、角色与文本；检查响应字典中的 `text` 字段及非空白字符串，并用模拟失败和坏响应观察调用方的处理。
- **本地 HTTP 链路**：将消息包装为 JSON，编码为 UTF-8 字节后发送 POST 请求，再读取、解码、解析并校验响应。
- **等待超时对照**：同一延迟服务在较短等待时间下超时，在较长等待时间下成功；客户端超时不会自动取消服务端工作，服务端执行结果不能据此确定。
- **坏响应对照**：HTTP 200 且 JSON 可解析，仍可能因为 `text` 类型错误而被响应校验拒绝。

## 实践方式与范围

学习中使用 AI 讲解、提示和调试反馈；消息校验、客户端请求与关键对照代码由我编写，实验服务端样板和部分计时输出由 AI 提供或调整。

目前形成的是本地 HTTP 与校验实验，未完成真实模型接入、自动重试、幂等或取消机制；也未形成完整 Agent 循环。各项实现与结果随实际实验补充。

## 对应知识笔记

- [HTTP 请求与 JSON 数据转换](/contents/notes/languages/python/08_HTTP请求与JSON数据转换)
- [异常](/contents/notes/languages/python/05_异常)

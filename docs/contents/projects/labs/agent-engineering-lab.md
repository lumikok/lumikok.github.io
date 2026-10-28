---
title: Agent Engineering Lab
description: 围绕消息校验、真实模型调用与有限重试开展的 Agent 工程学习实验。
start: 2026-10
end: present
status: ongoing
method: 个人实践 · AI 辅助学习
repo: https://github.com/lumikok/agent-engineering-lab
stack: Python · HTTP · JSON
order: 2
---

# Agent Engineering Lab

这是在 Todo API 实践之后开展的 Agent 工程学习仓库，从输入输出契约和本地 HTTP 起步，已接入 DeepSeek 真实文本调用与基础有限重试。

## 已有实践

代码与运行方法见[可靠调用起步单元](https://github.com/lumikok/agent-engineering-lab/tree/main/01-reliable-call)。

- **消息与响应校验**：检查消息列表、角色与文本；检查响应字典中的 `text` 字段及非空白字符串，并用模拟失败和坏响应观察调用方的处理。
- **本地 HTTP 链路**：将消息包装为 JSON，编码为 UTF-8 字节后发送 POST 请求，再读取、解码、解析并校验响应。
- **等待超时对照**：同一延迟服务在较短等待时间下超时，在较长等待时间下成功；客户端超时不会自动取消服务端工作，服务端执行结果不能据此确定。
- **坏响应对照**：HTTP 200 且 JSON 可解析，仍可能因为 `text` 类型错误而被响应校验拒绝。
- **真实模型调用**：用非流式 HTTP 请求取得 DeepSeek 回答，将厂商响应适配为内部 `text` 契约，并查看结束原因和用量；假密钥实验检查 HTTP 401 鉴权失败。
- **有限重试**：用模拟错误序列检查尝试上限、指数等待、失败后恢复和最终异常传播；HTTP 400、401 立即停止，可重试错误也不能无限重发。

## 实践方式与范围

学习中使用 AI 讲解、提示和调试反馈；消息校验、客户端请求与重试核心由我编写，实验服务端及受控失败样板、部分接入和输出由 AI 提供或调整。

真实模型调用与模拟失败对照分别记录：本地序列中的 503 和模拟超时不视为真实模型接口故障。当前重试策略不保证相同回答，也不能直接套用于创建任务等有副作用的操作。

结构化输出、工具调用、幂等、取消与完整 Agent 循环尚未完成，后续按实际实现补充。

## 对应知识笔记

- [HTTP 请求与 JSON 数据转换](/contents/notes/languages/python/08_HTTP请求与JSON数据转换)
- [异常](/contents/notes/languages/python/05_异常)

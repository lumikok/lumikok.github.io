---
title: AI 智能伴侣复现
description: 通过教程复现认识大模型对话应用，练习 Streamlit、流式调用与会话持久化。
start: 2026-04
end: 2026-05
status: completed
method: 教程复现
repo: https://github.com/lumikok/AI-partner-repro
stack: Streamlit · OpenAI API · JSON
order: 2
---

# AI 智能伴侣复现

这是跟随公开教程完成的 Streamlit AI 智能伴侣复现项目。在原有思路上调整了部分代码、交互和页面布局，并整理了单独的学习笔记。

## 项目作用

通过复现一个完整的对话应用，连接页面交互、模型调用和历史会话管理，作为大模型应用流程的入门实践。

## 学习内容

- Streamlit 页面组件与状态管理，连接控制面板和聊天界面；
- OpenAI 兼容接口与流式输出，将模型响应逐步显示在页面中；
- System Prompt 与人物设定，组织对话应用的输入；
- 使用本地 JSON 保存历史会话，并处理新建、加载和删除。

## 主要功能

- 自定义伴侣昵称和人物设定；
- 调用 OpenAI 兼容接口进行流式对话；
- 新建、加载和删除历史会话；
- 使用本地 JSON 文件保存聊天记录；
- 使用 Streamlit 构建控制面板和聊天界面。

通过这次复现，我第一次完整接触了 Streamlit 状态管理、大模型流式调用、System Prompt 和本地会话持久化。

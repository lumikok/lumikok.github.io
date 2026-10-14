---
title: FastAPI 记账本
description: 作为 FastAPI 与基础前端的学习载体，连接接口、数据库、页面和统计图表。
start: 2026-06
end: 2026-09
status: completed
featured: true
repo: https://github.com/lumikok/tally-book-lp
stack: FastAPI · SQLAlchemy · SQLite · JavaScript
order: 1
---

# FastAPI 记账本

这是一个用于学习和检验 FastAPI 与基础前端知识的记账本项目。从最初的接口练习开始，逐步加入数据库、路由拆分、异常处理、分页、图表和前端页面，最终形成一条完整的前后端链路。

## 项目作用

以记账业务承载 FastAPI 和基础前端学习，把分散的接口、数据库和页面知识连接成可运行的应用，并为后续 Todo 项目中的迁移实践提供基础。

## 学习内容

- FastAPI 路由、请求与响应模型、数据校验、异常处理和依赖注入；
- SQLAlchemy 模型、SQLite 持久化与数据库会话，将业务请求落实为数据操作；
- HTML、CSS、JavaScript 的表单、页面布局、列表交互与接口调用；
- 分类筛选、分页查询和统计接口，以及使用 ECharts 展示占比与趋势；
- 前后端联调和 FastAPI 单端口提供页面与 API，理解页面操作到数据库之间的完整请求链路。

## 已实现功能

- 开销的新增、查询、修改和删除；
- 分类筛选与分页；
- 分类支出占比图和每日支出趋势图；
- 响应式页面；
- FastAPI 单端口访问页面和 API。

## 技术栈

- 后端：FastAPI、SQLAlchemy、Pydantic、SQLite；
- 前端：HTML、CSS、JavaScript、ECharts。

这个项目让我实际连接了数据模型、路由、数据库会话、接口调用和页面交互，也暴露了自己在数据库设计和前端基础上的不足。

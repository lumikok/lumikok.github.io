---
title: 拾光 LearnTrace
description: 为学习记录、周复盘与成长节点设计的本地应用。
start: 2026-09
end: present
status: ongoing
method: Vibe Coding
featured: true
repo: https://github.com/lumikok/LearnTrace
release: https://github.com/lumikok/LearnTrace/releases/tag/v0.4.0
stack: FastAPI · SQLite · JavaScript · pywebview · PyInstaller
order: 1
---

# 拾光 LearnTrace

拾光是一个单用户、本地运行的学习记录应用。我希望它不仅保存“今天学了什么”，也能把日常记录、每周回顾和长期成长节点连接起来。

## 主要功能

- 添加、查看、编辑和删除学习记录；
- 按关键词、类别和日期分页查找；
- 使用 GitHub 式日历展示每日相对活跃度；
- 汇总每周记录，并保存收获、卡点和下一步行动；
- 手动记录重要的成长节点；
- 使用本地 SQLite 数据库，并支持备份与恢复；
- 提供可直接运行的 Windows 桌面版本。

## 开发方式

这个产品主要通过 vibe coding 完成。我负责提出需求、决定功能取舍、反馈问题、验收结果和推动迭代，代码实现主要由 AI 完成。

## 代表进展

- 2026 年 9 月 26 日：发布 `v0.4.0` Windows 桌面版，完成跨电脑运行验收。
- 2026 年 9 月 29 日：本地源码与构建更新到 `0.4.1`，接入正式产品图标；项目文档记录该版本尚未上传 Release，页面下载入口仍指向已发布的 `v0.4.0`。
- 2026 年 10 月 11 日：增加从应用备份导出只读数据库快照的工具和接入说明，供其他本地项目读取；快照由用户手动更新。

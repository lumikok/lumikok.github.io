---
title: 极简番茄钟 Minimal Pomodoro
description: 中文离线桌面番茄钟，以透明浮窗显示倒计时并保存专注统计。
start: 2026-10
end: 2026-10
status: completed
method: Vibe Coding
repo: https://github.com/lumikok/minimal-pomodoro
release: https://github.com/lumikok/minimal-pomodoro/releases/latest
stack: Tauri 2 · TypeScript · Vite · Rust
order: 2
---

# 极简番茄钟 Minimal Pomodoro

这是为个人学习设计的中文离线 Windows 桌面番茄钟。透明小浮窗显示倒计时，点击展开设置与专注统计；日常使用无需账号。

## 主要功能

- 提供 25、50 分钟专注预设，自定义专注和休息时间；
- 开始、暂停、继续和重置，每四次完整专注推荐长休息；
- 阶段之间手动衔接，可跳过休息；
- 透明浮窗、置顶与托盘隐藏，到点显示完成卡片并播放可关闭的铃声；
- 保存今日与累计完成次数、专注时长，以及设置和窗口位置；
- 休眠时冻结计时，重启后未完成段恢复为暂停。

## 代表成果

2026 年 10 月完成 `v0.2.0` 的透明浮窗与累计统计版本，提供 Windows x64 安装包。项目验收文档记录 Rust 22 项测试、Node 2 项时间格式测试和独立合成数据验收通过。

## 开发方式

这个产品主要通过 vibe coding 完成：我提出学习场景与产品需求，反馈界面和使用问题，参与功能取舍与验收，代码实现主要由 AI 完成。

目前记录的范围是离线计时与统计，不包含任务管理、账号或云同步。

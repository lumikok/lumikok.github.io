# lumikok 的笔记库

基于 VitePress 与 `@sugarat/theme` 的个人知识库。

## 内容结构

- `docs/contents/notes/`：按技术领域维护的长期知识笔记
- `docs/contents/essays/`：技术、思考与阅读文章
- `docs/contents/projects/`：个人产品、学习项目与工具探索
- `docs/contents/journey/`：人工筛选的阶段变化和成长节点
- `docs/contents/problems/`：按算法类型整理的题解

## 写一篇新笔记

1. 根据用途选择上面的栏目，不要把日期日志混入主题笔记。
2. 在最接近的主题目录中新建 Markdown 文件，首个一级标题会自动成为侧边栏标题。
3. 文件夹使用稳定、简短的英文分类名；正文和文件名可以使用中文。
4. 本地运行 `npm run dev`。侧边栏会在启动前自动重新生成。
5. 提交前运行 `npm run build`，检查链接和页面渲染。

## 写一篇新文章

在 `docs/contents/essays/tech/`、`thoughts/` 或 `reading/` 中新建 Markdown 文件：

```yaml
---
title: 文章标题
date: 2026-09-28
description: 用一句话说明这篇文章讨论什么。
---
```

文章总览、分类页、首页最近文章和侧边栏都会自动更新。

## 添加一个新项目

在 `docs/contents/projects/personal/`、`learning/` 或 `experiments/` 中新建 Markdown 文件：

```yaml
---
title: 项目名称
description: 用一句话说明项目的目的或收获。
start: 2026-09
end: present
status: ongoing
featured: false
repo: https://github.com/用户名/仓库名
stack: 技术一 · 技术二
---
```

- `end` 使用 `present` 表示仍在进行，也可以填写 `2026-10`。
- `status` 使用 `ongoing` 或 `completed`。
- `featured: true` 会把项目放到首页；普通项目保持 `false` 或省略。
- 如果需要标注开发方式，可增加 `method: Vibe Coding` 或 `method: 教程复现`。
- `repo`、`release` 和 `stack` 会自动显示在项目详情页，无需在正文重复维护。

项目总览、所属分类、首页精选和侧边栏都会自动更新。正文无需再重复写分类和时间。

成长足迹不自动收录所有内容，只在出现值得保留的阶段变化时人工添加。

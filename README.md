# lumikok 的笔记库

基于 VitePress 与 `@sugarat/theme` 的个人知识库。

## 内容结构

- `docs/contents/notes/`：按技术领域维护的长期知识笔记
- `docs/contents/journal/`：按日期归档的学习日志、计划与复盘
- `docs/contents/essays/`：随笔和读后感
- `docs/contents/problems/`：按算法类型整理的题解

## 写一篇新笔记

1. 根据用途选择上面的栏目，不要把日期日志混入主题笔记。
2. 在最接近的主题目录中新建 Markdown 文件，首个一级标题会自动成为侧边栏标题。
3. 文件夹使用稳定、简短的英文分类名；正文和文件名可以使用中文。
4. 本地运行 `npm run dev`。侧边栏会在启动前自动重新生成。
5. 提交前运行 `npm run build`，检查链接和页面渲染。

新增顶级栏目时，同时在 `scripts/generateSidebar.js` 的 `sidebarRules` 中登记。

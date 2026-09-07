import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docsRoot = path.join(projectRoot, "docs");

const sidebarRules = [
  { name: "notes", text: "知识库", basePath: "/contents/notes/" },
  { name: "journal", text: "学习日志", basePath: "/contents/journal/" },
  { name: "essays", text: "随笔", basePath: "/contents/essays/" },
  { name: "problems", text: "题解", basePath: "/contents/problems/" },
];

const directoryLabels = {
  ai: "AI 与 Agent", agents: "大模型与 Agent", algorithms: "数据结构与算法",
  c: "C 语言", cpp: "C++", python: "Python",
  array: "数组", "binary-tree": "二叉树", graph: "图", "hash-table": "哈希表",
  heap: "堆", "linked-list": "链表", list: "列表", queue: "队列", stack: "栈",
  backend: "后端开发", basics: "基础语法", complexity: "复杂度分析",
  "computer-fundamentals": "计算机基础", "data-structures": "数据结构",
  databases: "数据库", desktop: "桌面开发", "divide-and-conquer": "分治",
  foundations: "基础知识", "graph-theory": "图论", languages: "编程语言",
  math: "数学基础", mysql: "MySQL", oop: "面向对象", pointers: "指针技巧",
  preprocessing: "预处理", searching: "搜索", sorting: "排序", stl: "STL",
  techniques: "算法思想与技巧", tools: "工具", web: "Web 前端",
  fundamentals: "入门", html: "HTML", css: "CSS", react: "React",
  plans: "计划与复盘",
};

const collator = new Intl.Collator("zh-CN", { numeric: true, sensitivity: "base" });

function prettify(value) {
  return directoryLabels[value] ?? value.replace(/^\d+[._-]?/, "").replace(/[-_]/g, " ");
}

function readTitle(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  const frontmatter = source.match(/^---\s*[\r\n]+([\s\S]*?)[\r\n]+---/);
  const title = frontmatter?.[1].match(/^title:\s*["']?(.+?)["']?\s*$/m)?.[1];
  if (title) return title;
  return source.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? prettify(path.basename(filePath, ".md"));
}

function pageLink(filePath) {
  return "/" + path.relative(docsRoot, filePath).replace(/\\/g, "/").replace(/\.md$/, "");
}

function scanDirectory(dir, depth = 0) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
    .filter((entry) => !entry.name.startsWith("_") && entry.name !== "index.md")
    .sort((a, b) => {
      if (a.isDirectory() !== b.isDirectory()) return a.isDirectory() ? -1 : 1;
      return collator.compare(a.name, b.name);
    });

  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const items = scanDirectory(fullPath, depth + 1);
      if (!items.length) return [];
      const group = { text: prettify(entry.name), collapsed: depth > 0, items };
      const indexPath = path.join(fullPath, "index.md");
      if (fs.existsSync(indexPath)) group.link = pageLink(indexPath);
      return [group];
    }
    if (!entry.isFile() || !entry.name.endsWith(".md")) return [];
    return [{ text: readTitle(fullPath), link: pageLink(fullPath) }];
  });
}

const finalSidebar = {};
for (const rule of sidebarRules) {
  const scanDir = path.join(docsRoot, "contents", rule.name);
  if (!fs.existsSync(scanDir)) {
    console.warn(`Skip missing content section: ${rule.name}`);
    continue;
  }
  finalSidebar[rule.basePath] = [
    { text: rule.text, link: rule.basePath },
    ...scanDirectory(scanDir),
  ];
}

const outputPath = path.join(docsRoot, ".vitepress", "sidebar.generated.json");
fs.writeFileSync(outputPath, `${JSON.stringify(finalSidebar, null, 2)}\n`);
console.log(`Generated ${Object.keys(finalSidebar).length} sidebars: ${outputPath}`);

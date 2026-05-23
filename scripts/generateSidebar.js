// scripts/generateSidebar.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 项目根目录
const projectRoot = path.resolve(__dirname, "..");
const docsRoot = path.join(projectRoot, "docs");

// ========== 配置区：定义多个侧边栏规则 ==========
const sidebarRules = [
  {
    name: "notes",
    scanDir: path.join(docsRoot, "contents", "notes"), // 笔记实际目录
    basePath: "/contents/notes/", // URL 前缀
    topNav: {
      text: "📚导航",
      link: "/contents/notes/", // 指向 index.md 页面
    },
  },
  {
    name: "essays",
    scanDir: path.join(docsRoot, "contents", "essays"), // 随笔实际目录
    basePath: "/contents/essays/",
    topNav: {
      text: "✍️导航",
      link: "/contents/essays/",
    },
  },
  // 以后可以继续添加其他目录，如 '/projects/'
];
// =================================================

// 递归扫描目录，生成侧边栏项目（不包含顶层导航）
function scanDirectory(dir, docsRootParam, baseUrlPrefix) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const items = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(docsRootParam, fullPath);
    let link = "/" + relativePath.replace(/\\/g, "/").replace(/\.md$/, "");

    if (entry.isDirectory()) {
      const children = scanDirectory(fullPath, docsRootParam, baseUrlPrefix);
      if (children.length > 0) {
        items.push({
          text: entry.name,
          collapsed: true,
          items: children,
        });
      }
    } else if (
      entry.isFile() &&
      entry.name.endsWith(".md") &&
      entry.name !== "index.md"
    ) {
      items.push({
        text: entry.name.replace(/\.md$/, ""),
        link: link,
      });
    }
  }
  return items;
}

// 生成最终的侧边栏配置对象
const finalSidebar = {};

for (const rule of sidebarRules) {
  const { scanDir, basePath, topNav, name } = rule;
  if (!fs.existsSync(scanDir)) {
    console.warn(`⚠️ 目录不存在，跳过: ${scanDir} (规则: ${name})`);
    continue;
  }

  const generatedItems = scanDirectory(scanDir, docsRoot, basePath);
  // 在最前面插入导航页
  const sidebarItems = [topNav, ...generatedItems];
  finalSidebar[basePath] = sidebarItems;
  console.log(
    `✅ 已生成侧边栏: ${basePath} -> ${scanDir} (条目数: ${sidebarItems.length})`,
  );
}

// 输出到 docs/.vitepress/sidebar.generated.json
const outputDir = path.join(docsRoot, ".vitepress");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`📁 创建目录: ${outputDir}`);
}
const outputPath = path.join(outputDir, "sidebar.generated.json");
fs.writeFileSync(outputPath, JSON.stringify(finalSidebar, null, 2));
console.log(`🎉 侧边栏配置已生成: ${outputPath}`);

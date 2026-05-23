// scripts/generateSidebar.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// 获取当前文件的目录路径（scripts/）
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 项目根目录（my-blog/）
const projectRoot = path.resolve(__dirname, "..");
const docsRoot = path.join(projectRoot, "docs");

// 定义要扫描的目录及对应的侧边栏根路径
const sidebarConfigs = [
  {
    name: "笔记",
    scanDir: path.join(docsRoot, "contents", "notes"),
    baseUrl: "/contents/notes/",
    topNav: { text: "📚 笔记导航", link: "/contents/notes/" },
  },
  {
    name: "随笔",
    scanDir: path.join(docsRoot, "contents", "essays"),
    baseUrl: "/contents/essays/",
    topNav: { text: "✍️ 随笔导航", link: "/contents/essays/" },
  },
];

/**
 * 递归扫描目录，生成侧边栏 items
 * @param {string} dir 要扫描的绝对路径
 * @param {string} baseUrl 对应的 URL 前缀（如 '/contents/notes/'）
 * @returns {Array} 侧边栏项数组
 */
function scanDirectory(dir, baseUrl) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const items = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    // 计算相对于 docs 的路径，用于生成完整 URL
    const relativeToDocs = path.relative(docsRoot, fullPath);
    let link = "/" + relativeToDocs.replace(/\\/g, "/").replace(/\.md$/, "");

    if (entry.isDirectory()) {
      // 递归处理子文件夹
      const children = scanDirectory(fullPath, baseUrl);
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
      // 忽略 index.md，避免重复
      items.push({
        text: entry.name.replace(/\.md$/, ""),
        link: link,
      });
    }
  }
  return items;
}

// 生成最终的侧边栏对象
const finalSidebar = {};

for (const cfg of sidebarConfigs) {
  if (!fs.existsSync(cfg.scanDir)) {
    console.warn(`⚠️ 目录不存在，跳过: ${cfg.scanDir}`);
    continue;
  }
  const scannedItems = scanDirectory(cfg.scanDir, cfg.baseUrl);
  // 在最前面插入导航页
  const sidebarItems = [cfg.topNav, ...scannedItems];
  finalSidebar[cfg.baseUrl] = sidebarItems;
  console.log(`✅ 生成侧边栏: ${cfg.baseUrl} (共 ${sidebarItems.length} 项)`);
}

// 写入 JSON 文件到 docs/.vitepress/
const outputDir = path.join(docsRoot, ".vitepress");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}
const outputPath = path.join(outputDir, "sidebar.generated.json");
fs.writeFileSync(outputPath, JSON.stringify(finalSidebar, null, 2));
console.log(`🎉 侧边栏配置已保存到: ${outputPath}`);

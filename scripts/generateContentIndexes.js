import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docsRoot = path.join(projectRoot, "docs");
const projectsRoot = path.join(docsRoot, "contents", "projects");
const essaysRoot = path.join(docsRoot, "contents", "essays");

const markers = {
  projects: [
    "<!-- AUTO-CONTENT:PROJECTS:START -->",
    "<!-- AUTO-CONTENT:PROJECTS:END -->",
  ],
  essays: [
    "<!-- AUTO-CONTENT:ESSAYS:START -->",
    "<!-- AUTO-CONTENT:ESSAYS:END -->",
  ],
  homeProjects: [
    "<!-- AUTO-CONTENT:HOME-PROJECTS:START -->",
    "<!-- AUTO-CONTENT:HOME-PROJECTS:END -->",
  ],
  homeEssays: [
    "<!-- AUTO-CONTENT:HOME-ESSAYS:START -->",
    "<!-- AUTO-CONTENT:HOME-ESSAYS:END -->",
  ],
  category: [
    "<!-- AUTO-CONTENT:CATEGORY:START -->",
    "<!-- AUTO-CONTENT:CATEGORY:END -->",
  ],
};

function unquote(value) {
  const trimmed = value.trim();
  const quote = trimmed[0];
  if ((quote === '"' || quote === "'") && trimmed.at(-1) === quote) {
    return trimmed.slice(1, -1);
  }
  return trimmed.replace(/\s+#.*$/, "").trim();
}

function parseFrontmatter(source) {
  const block = source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---(?:\s*\r?\n|$)/)?.[1];
  if (!block) return {};

  const data = {};
  for (const line of block.split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z][\w-]*):\s*(.*?)\s*$/);
    if (!match) continue;
    const value = unquote(match[2]);
    data[match[1]] = value === "true" ? true : value === "false" ? false : value;
  }
  return data;
}

function readPage(filePath, category) {
  const source = fs.readFileSync(filePath, "utf8");
  const data = parseFrontmatter(source);
  const title = data.title || source.match(/^#\s+(.+)$/m)?.[1]?.trim();
  return {
    ...data,
    title,
    category,
    filePath,
    link: pageLink(filePath),
  };
}

function pageLink(filePath) {
  const relative = path.relative(docsRoot, filePath).replace(/\\/g, "/");
  return encodeURI(`/${relative.replace(/\.md$/i, "")}`);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function listCategories(root) {
  return fs
    .readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .map((entry) => {
      const directory = path.join(root, entry.name);
      const indexPath = path.join(directory, "index.md");
      if (!fs.existsSync(indexPath)) {
        throw new Error(`分类目录缺少 index.md：${path.relative(projectRoot, directory)}`);
      }
      const index = readPage(indexPath, entry.name);
      return {
        key: entry.name,
        directory,
        indexPath,
        title: index.title,
        order: Number(index.order) || Number.POSITIVE_INFINITY,
      };
    })
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title, "zh-CN"));
}

function listPages(category) {
  return fs
    .readdirSync(category.directory, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isFile() &&
        entry.name.toLowerCase().endsWith(".md") &&
        entry.name.toLowerCase() !== "index.md",
    )
    .map((entry) => readPage(path.join(category.directory, entry.name), category))
    .filter((page) => page.sidebar !== false && page.draft !== true);
}

function requireFields(page, fields, contentType) {
  const missing = fields.filter((field) => !page[field]);
  if (missing.length) {
    throw new Error(
      `${contentType}缺少 ${missing.join("、")}：${path.relative(projectRoot, page.filePath)}`,
    );
  }
}

function validateProject(project) {
  requireFields(project, ["title", "description", "start", "status"], "项目");
  if (!/^\d{4}-\d{2}$/.test(project.start)) {
    throw new Error(`项目 start 应为 YYYY-MM：${path.relative(projectRoot, project.filePath)}`);
  }
  if (!["ongoing", "completed"].includes(project.status)) {
    throw new Error(`项目 status 应为 ongoing 或 completed：${path.relative(projectRoot, project.filePath)}`);
  }
  if (project.status === "completed" && !/^\d{4}-\d{2}$/.test(project.end || "")) {
    throw new Error(`已完成项目需要 YYYY-MM 格式的 end：${path.relative(projectRoot, project.filePath)}`);
  }
  if (
    project.end &&
    !["present", "ongoing", "now"].includes(project.end) &&
    !/^\d{4}-\d{2}$/.test(project.end)
  ) {
    throw new Error(`项目 end 应为 YYYY-MM 或 present：${path.relative(projectRoot, project.filePath)}`);
  }
}

function validateEssay(essay) {
  requireFields(essay, ["title", "description", "date"], "文章");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(essay.date)) {
    throw new Error(`文章 date 应为 YYYY-MM-DD：${path.relative(projectRoot, essay.filePath)}`);
  }
}

function replaceGeneratedBlock(filePath, markerPair, content) {
  const source = fs.readFileSync(filePath, "utf8");
  const [start, end] = markerPair;
  const startIndex = source.indexOf(start);
  const endIndex = source.indexOf(end);
  if (startIndex < 0 || endIndex < startIndex) {
    throw new Error(`缺少自动生成标记：${path.relative(projectRoot, filePath)}`);
  }

  const next = `${source.slice(0, startIndex)}${start}\n${content.trim()}\n${end}${source.slice(endIndex + end.length)}`;
  if (next !== source) fs.writeFileSync(filePath, next);
  return next !== source;
}

function projectSort(a, b) {
  return b.start.localeCompare(a.start) || Number(a.order || 999) - Number(b.order || 999);
}

function essaySort(a, b) {
  return b.date.localeCompare(a.date) || a.title.localeCompare(b.title, "zh-CN");
}

function formatProjectTime(project, year) {
  const startMonth = project.start.slice(5, 7);
  if (!project.end || ["present", "ongoing", "now"].includes(project.end)) {
    return `${startMonth} — 至今`;
  }
  if (project.end === project.start) return startMonth;
  return project.end.startsWith(year)
    ? `${startMonth} — ${project.end.slice(5, 7)}`
    : `${startMonth} — ${project.end.replace("-", ".")}`;
}

function projectSummary(project) {
  const details = [project.category.title];
  if (project.method) details.push(project.method);
  return `${details.join(" · ")}　${project.description}`;
}

function timeline(items, type) {
  const groups = new Map();
  for (const item of items) {
    const year = (type === "project" ? item.start : item.date).slice(0, 4);
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year).push(item);
  }
  return [
    '<div class="archive-list">',
    ...[...groups].flatMap(([year, entries]) => [
      '  <div class="archive-year">',
      `    <h2>${year}</h2>`,
      ...entries.map((item) => {
        const time =
          type === "project" ? formatProjectTime(item, year) : item.date.slice(5).replace("-", ".");
        const summary =
          type === "project"
            ? projectSummary(item)
            : `${item.category.title}　${item.description}`;
        return `    <a class="archive-item" href="${item.link}"><time>${escapeHtml(time)}</time><span class="archive-body"><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(summary)}</span></span></a>`;
      }),
      "  </div>",
    ]),
    "</div>",
  ].join("\n");
}

function categoryList(items) {
  if (!items.length) return "暂无内容。";
  return items
    .map((item) => `- [${item.title}](${item.link}) — ${item.description}`)
    .join("\n");
}

function featuredList(items, type) {
  if (!items.length) return "暂无内容。";
  return [
    '<div class="featured-links">',
    ...items.map((item, index) => {
      const number = String(index + 1).padStart(2, "0");
      const summary =
        type === "project" ? projectSummary(item) : `${item.category.title}　${item.description}`;
      return `  <a href="${item.link}"><span class="featured-links__index">${number}</span><span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(summary)}</small></span></a>`;
    }),
    "</div>",
  ].join("\n");
}

export function generateContentIndexes() {
  const projectCategories = listCategories(projectsRoot);
  const projects = projectCategories.flatMap((category) => listPages(category));
  for (const project of projects) validateProject(project);
  projects.sort(projectSort);

  const essayCategories = listCategories(essaysRoot);
  const essays = essayCategories.flatMap((category) => listPages(category));
  for (const essay of essays) validateEssay(essay);
  essays.sort(essaySort);

  const changed = [];
  if (replaceGeneratedBlock(path.join(projectsRoot, "index.md"), markers.projects, timeline(projects, "project"))) changed.push("项目总览");
  if (replaceGeneratedBlock(path.join(essaysRoot, "index.md"), markers.essays, timeline(essays, "essay"))) changed.push("文章总览");

  for (const category of projectCategories) {
    const items = projects.filter((item) => item.category.key === category.key);
    if (replaceGeneratedBlock(category.indexPath, markers.category, categoryList(items))) changed.push(category.title);
  }
  for (const category of essayCategories) {
    const items = essays.filter((item) => item.category.key === category.key);
    if (replaceGeneratedBlock(category.indexPath, markers.category, categoryList(items))) changed.push(category.title);
  }

  const homePath = path.join(docsRoot, "index.md");
  if (replaceGeneratedBlock(homePath, markers.homeProjects, featuredList(projects.filter((item) => item.featured === true), "project"))) changed.push("首页项目");
  if (replaceGeneratedBlock(homePath, markers.homeEssays, featuredList(essays.slice(0, 3), "essay"))) changed.push("首页文章");

  console.log(`Generated indexes for ${projects.length} projects and ${essays.length} essays${changed.length ? `; updated ${changed.join("、")}` : ""}.`);
  return { projects, essays, changed };
}

const isMain =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) generateContentIndexes();

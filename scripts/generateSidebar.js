import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docsRoot = path.join(projectRoot, "docs");
const contentsRoot = path.join(docsRoot, "contents");
const outputPath = path.join(docsRoot, ".vitepress", "sidebar.generated.json");
const directoryMetaFile = "_sidebar.json";

const collator = new Intl.Collator("zh-CN", {
  numeric: true,
  sensitivity: "base",
});

function prettify(value) {
  return value
    .replace(/^\d+[._-]+/, "")
    .replace(/[-_]+/g, " ")
    .trim();
}

function unquote(value) {
  const trimmed = value.trim();
  const quote = trimmed[0];
  if ((quote === '"' || quote === "'") && trimmed.at(-1) === quote) {
    return trimmed.slice(1, -1);
  }
  return trimmed.replace(/\s+#.*$/, "").trim();
}

function readFrontmatter(source) {
  const block = source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---(?:\s*\r?\n|$)/)?.[1];
  if (!block) return {};

  const result = {};
  for (const key of ["title", "order", "sidebar", "draft"]) {
    const value = block.match(new RegExp(`^${key}:\\s*(.*?)\\s*$`, "m"))?.[1];
    if (value !== undefined) result[key] = unquote(value);
  }
  return result;
}

function readPage(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  const frontmatter = readFrontmatter(source);
  const heading = source.match(/^#\s+(.+)$/m)?.[1]?.trim();
  const parsedOrder = Number(frontmatter.order);

  return {
    title:
      frontmatter.title ||
      heading ||
      prettify(path.basename(filePath, path.extname(filePath))),
    order: Number.isFinite(parsedOrder) ? parsedOrder : undefined,
    hidden: frontmatter.sidebar === "false" || frontmatter.draft === "true",
  };
}

function readDirectoryMeta(dir) {
  const metaPath = path.join(dir, directoryMetaFile);
  let meta = {};

  if (fs.existsSync(metaPath)) {
    try {
      meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
    } catch (error) {
      throw new Error(
        `Invalid ${path.relative(projectRoot, metaPath)}: ${error.message}`,
      );
    }
  }

  const indexPath = path.join(dir, "index.md");
  const index = fs.existsSync(indexPath) ? readPage(indexPath) : undefined;
  const parsedOrder = Number(meta.order ?? index?.order);

  return {
    title: meta.title || index?.title || prettify(path.basename(dir)),
    order: Number.isFinite(parsedOrder) ? parsedOrder : undefined,
    collapsed: meta.collapsed,
    hidden: meta.hidden === true,
    indexPath: index && !index.hidden ? indexPath : undefined,
  };
}

function pageLink(filePath) {
  const relative = path.relative(docsRoot, filePath).replace(/\\/g, "/");
  if (path.basename(relative).toLowerCase() === "index.md") {
    const directory = path.posix.dirname(relative);
    return directory === "." ? "/" : `/${directory}/`;
  }
  return `/${relative.replace(/\.md$/i, "")}`;
}

function compareEntries(a, b) {
  const aOrder = a.order ?? Number.POSITIVE_INFINITY;
  const bOrder = b.order ?? Number.POSITIVE_INFINITY;
  if (aOrder !== bOrder) return aOrder - bOrder;
  if (a.kind !== b.kind) return a.kind === "directory" ? -1 : 1;
  return collator.compare(a.name, b.name);
}

function isIgnoredName(name) {
  return name.startsWith(".") || name.startsWith("_");
}

function scanDirectory(dir, depth = 0) {
  const candidates = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (isIgnoredName(entry.name) || entry.name.toLowerCase() === "index.md") {
      continue;
    }

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const meta = readDirectoryMeta(fullPath);
      if (!meta.hidden) {
        candidates.push({
          kind: "directory",
          name: entry.name,
          fullPath,
          meta,
          order: meta.order,
        });
      }
      continue;
    }

    if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
      const page = readPage(fullPath);
      if (!page.hidden) {
        candidates.push({
          kind: "page",
          name: entry.name,
          fullPath,
          page,
          order: page.order,
        });
      }
    }
  }

  return candidates.sort(compareEntries).flatMap((candidate) => {
    if (candidate.kind === "page") {
      return [{ text: candidate.page.title, link: pageLink(candidate.fullPath) }];
    }

    const items = scanDirectory(candidate.fullPath, depth + 1);
    if (!items.length && !candidate.meta.indexPath) return [];

    const group = {
      text: candidate.meta.title,
      collapsed: candidate.meta.collapsed ?? depth > 0,
      items,
    };
    if (candidate.meta.indexPath) group.link = pageLink(candidate.meta.indexPath);
    return [group];
  });
}

function discoverSections() {
  return fs
    .readdirSync(contentsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !isIgnoredName(entry.name))
    .map((entry) => {
      const fullPath = path.join(contentsRoot, entry.name);
      const meta = readDirectoryMeta(fullPath);
      return {
        kind: "directory",
        name: entry.name,
        fullPath,
        meta,
        order: meta.order,
      };
    })
    .filter((section) => !section.meta.hidden)
    .sort(compareEntries);
}

export function generateSidebar() {
  if (!fs.existsSync(contentsRoot)) {
    throw new Error(`Missing content directory: ${contentsRoot}`);
  }

  const sidebar = {};
  for (const section of discoverSections()) {
    const items = scanDirectory(section.fullPath);
    if (!items.length && !section.meta.indexPath) continue;

    const basePath = pageLink(path.join(section.fullPath, "index.md"));
    sidebar[basePath] = [
      {
        text: section.meta.title,
        ...(section.meta.indexPath ? { link: basePath } : {}),
      },
      ...items,
    ];
  }

  const output = `${JSON.stringify(sidebar, null, 2)}\n`;
  const previous = fs.existsSync(outputPath)
    ? fs.readFileSync(outputPath, "utf8")
    : undefined;
  if (output !== previous) fs.writeFileSync(outputPath, output);

  console.log(
    `Generated ${Object.keys(sidebar).length} sidebars from docs/contents: ${outputPath}`,
  );
  return sidebar;
}

export function sidebarWatcherPlugin() {
  return {
    name: "local-auto-sidebar",
    configureServer(server) {
      let timer;
      const onChange = (event, filePath) => {
        const absolutePath = path.resolve(filePath);
        const isContent = absolutePath.startsWith(`${contentsRoot}${path.sep}`);
        const isRelevant =
          event === "addDir" ||
          event === "unlinkDir" ||
          filePath.toLowerCase().endsWith(".md") ||
          path.basename(filePath) === directoryMetaFile;

        if (!isContent || !isRelevant) return;
        clearTimeout(timer);
        timer = setTimeout(async () => {
          generateSidebar();
          await server.restart();
        }, 100);
      };

      server.watcher.on("all", onChange);
      return () => {
        clearTimeout(timer);
        server.watcher.off("all", onChange);
      };
    },
  };
}

const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) generateSidebar();

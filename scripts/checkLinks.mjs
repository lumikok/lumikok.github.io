import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docsRoot = path.join(projectRoot, "docs");
const markdownFiles = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== ".vitepress" && entry.name !== "node_modules") walk(fullPath);
    } else if (entry.name.endsWith(".md")) {
      markdownFiles.push(fullPath);
    }
  }
}

function candidates(sourceFile, rawTarget) {
  const target = decodeURIComponent(rawTarget.split("#", 1)[0].split("?", 1)[0]);
  if (!target) return [];
  const base = target.startsWith("/")
    ? path.join(docsRoot, target.slice(1))
    : path.resolve(path.dirname(sourceFile), target);
  const extension = path.extname(base).toLowerCase();
  if ([".md", ".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".pdf"].includes(extension)) {
    return [base];
  }
  return [base, `${base}.md`, path.join(base, "index.md")];
}

walk(docsRoot);
const failures = [];
const externalPattern = /^(?:[a-z]+:|#|\/\/)/i;

for (const file of markdownFiles) {
  const source = fs.readFileSync(file, "utf8")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`\r\n]+`/g, "");
  const targets = [
    ...source.matchAll(/!?\[[^\]]*\]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g),
    ...source.matchAll(/<(?:a|img)[^>]+(?:href|src)=["']([^"']+)["']/gi),
  ].map((match) => match[1]);

  for (const target of targets) {
    if (!target || externalPattern.test(target)) continue;
    let resolved;
    try {
      resolved = candidates(file, target);
    } catch {
      failures.push(`${path.relative(docsRoot, file)} -> malformed URL: ${target}`);
      continue;
    }
    if (!resolved.some((candidate) => fs.existsSync(candidate))) {
      failures.push(`${path.relative(docsRoot, file)} -> ${target}`);
    }
  }
}

if (failures.length) {
  console.error(`Found ${failures.length} broken local link(s):\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(`Checked local links in ${markdownFiles.length} Markdown files.`);

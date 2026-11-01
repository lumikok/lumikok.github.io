import { execFileSync, spawnSync } from "node:child_process";
import path from "node:path";

const beijing = new Intl.DateTimeFormat("sv-SE", {
  timeZone: "Asia/Shanghai",
  year: "numeric", month: "2-digit", day: "2-digit",
  hour: "2-digit", minute: "2-digit", hourCycle: "h23",
});

export function resolvePublicationDate(filePath, explicitDate, cwd) {
  if (explicitDate !== undefined && explicitDate !== "") {
    const value = explicitDate instanceof Date ? explicitDate.toISOString() : String(explicitDate);
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const parsed = new Date(`${value}T00:00:00Z`);
      if (!Number.isNaN(+parsed) && parsed.toISOString().slice(0, 10) === value) {
        return { date: value, label: value, source: "manual" };
      }
    } else if (/^\d{4}-\d{2}-\d{2}T.*(?:Z|[+-]\d{2}:\d{2})$/.test(value)) {
      const parsed = new Date(value);
      if (!Number.isNaN(+parsed)) return fromTimestamp(parsed.toISOString(), "manual");
    }
    throw new Error(`博客 date 应为 YYYY-MM-DD 或带时区的 ISO 时间：${filePath}`);
  }

  const relativePath = path.relative(cwd, filePath).replace(/\\/g, "/");
  execFileSync("git", ["rev-parse", "--git-dir"], { cwd, windowsHide: true });
  const head = spawnSync("git", ["rev-parse", "--verify", "--quiet", "HEAD"], { cwd, windowsHide: true });
  if (head.status === 1) return { date: null, label: "未发布", source: "unpublished" };
  if (head.error) throw head.error;
  // 按提交历史顺序取最早记录，并跟随文件改名；不按时间戳排序。
  const history = execFileSync("git", [
    "log", "--follow", "--format=%cI", "--", relativePath,
  ], { cwd, encoding: "utf8", windowsHide: true }).trim().split(/\r?\n/).filter(Boolean);
  return history.length
    ? fromTimestamp(history.at(-1), "git")
    : { date: null, label: "未发布", source: "unpublished" };
}

function fromTimestamp(timestamp, source) {
  const label = beijing.format(new Date(timestamp));
  return { date: label.slice(0, 10), timestamp: new Date(timestamp).toISOString(), label, source };
}

import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, renameSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { resolvePublicationDate } from "./publicationDate.js";

test("首次提交、修改、改名与北京时间", () => {
  const root = mkdtempSync(path.join(tmpdir(), "blog-publication-"));
  const git = (...args) => execFileSync("git", args, { cwd: root, windowsHide: true });
  const commit = (time) => execFileSync("git", ["commit", "-m", "fixture"], {
    cwd: root, windowsHide: true,
    env: { ...process.env, GIT_AUTHOR_DATE: time, GIT_COMMITTER_DATE: time },
  });
  try {
    git("init");
    git("config", "user.name", "Test");
    git("config", "user.email", "test@example.invalid");
    const original = path.join(root, "original.md");
    writeFileSync(original, "# Test\n");
    assert.equal(resolvePublicationDate(original, undefined, root).label, "未发布");
    git("add", "original.md");
    commit("2026-01-01T18:45:00Z");
    const first = resolvePublicationDate(original, undefined, root);
    assert.equal(first.label, "2026-01-02 02:45");
    writeFileSync(original, "# Test\nUpdated\n");
    git("add", "original.md");
    commit("2026-02-01T00:00:00Z");
    const renamed = path.join(root, "renamed.md");
    renameSync(original, renamed);
    git("add", "-A");
    commit("2026-03-01T00:00:00Z");
    assert.deepEqual(resolvePublicationDate(renamed, undefined, root), first);
    assert.equal(resolvePublicationDate(renamed, "2025-05-17", root).label, "2025-05-17");
    assert.equal(resolvePublicationDate(renamed, "2025-05-17T20:30:00+08:00", root).label, "2025-05-17 20:30");
    assert.throws(() => resolvePublicationDate(renamed, "2026-02-30", root));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

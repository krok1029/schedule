import { readdir } from "node:fs/promises";
import { extname, join } from "node:path";

const ignoredDirectories = new Set([
  "node_modules",
  ".git",
  "dist",
  "coverage",
  ".vite",
  ".agent",
  ".temp",
  ".branches",
  "target",
  "build",
]);
const sourceExtensions = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".mts",
  ".cts",
  ".sql",
  ".rs",
  ".kt",
  ".kts",
  ".swift",
  ".py",
  ".sh",
  ".bash",
  ".zsh",
  ".html",
]);

export function isCheckedSource(path) {
  return sourceExtensions.has(extname(path)) && !/\.(?:test|spec|e2e-spec)\.[^/]+$/.test(path);
}

export function countLines(text) {
  if (!text) return 0;
  const lines = text.split(/\r\n|\n|\r/);
  return text.endsWith("\n") || text.endsWith("\r") ? lines.length - 1 : lines.length;
}

export async function collectSources(root) {
  const paths = [];
  for (const entry of await readdir(root, { withFileTypes: true })) {
    if (entry.isSymbolicLink()) continue;
    const path = join(root, entry.name);
    if (entry.isDirectory() && !ignoredDirectories.has(entry.name)) {
      paths.push(...(await collectSources(path)));
    } else if (entry.isFile() && isCheckedSource(path)) {
      paths.push(path);
    }
  }
  return paths.sort();
}

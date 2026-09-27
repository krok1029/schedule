import { readFile } from "node:fs/promises";
import { relative } from "node:path";
import { collectSources, countLines } from "./source-files.mjs";

const root = process.cwd();
const paths = await collectSources(root);
const violations = [];
for (const path of paths) {
  const count = countLines(await readFile(path, "utf8"));
  if (count > 600) violations.push(`${relative(root, path)}: ${count} 行`);
}
if (violations.length) {
  console.error(`以下程式檔超過 600 行，請依職責拆分：\n${violations.join("\n")}`);
  process.exitCode = 1;
} else {
  console.log(`行數檢查通過：${paths.length} 個程式檔均未超過 600 行。`);
}

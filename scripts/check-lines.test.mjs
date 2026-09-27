import { execFileSync } from "node:child_process";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, it } from "vitest";

it("blocks a 601-line source file while allowing 600 lines and test/style exceptions", async () => {
  const root = await mkdtemp(join(tmpdir(), "schedule-lines-"));
  const script = fileURLToPath(new URL("./check-lines.mjs", import.meta.url));
  const run = () => execFileSync(process.execPath, [script], { cwd: root, stdio: "pipe" });
  try {
    await writeFile(join(root, "app.ts"), "// source\n".repeat(600));
    await writeFile(join(root, "app.test.ts"), "// test\n".repeat(700));
    await writeFile(join(root, "app.css"), "/* style */\n".repeat(700));
    expect(() => run()).not.toThrow();
    await writeFile(join(root, "app.ts"), "// source\n".repeat(601));
    expect(() => run()).toThrow();
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

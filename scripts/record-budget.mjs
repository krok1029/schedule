import { mkdir, readFile, writeFile, rename } from "node:fs/promises";
import { recordObservation } from "./budget-policy.mjs";

const input = process.argv[2];
if (!input) throw new Error("用法：pnpm budget:record <從可信用量來源取得的 snapshot.json>");
const observation = JSON.parse(await readFile(input, "utf8"));
const policy = JSON.parse(await readFile("config/agent-budget.json", "utf8"));
await mkdir(".agent", { recursive: true });
const path = ".agent/weekly-usage.json";
let ledger = null;
try {
  ledger = JSON.parse(await readFile(path, "utf8"));
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
const result = recordObservation(ledger, observation, policy);
const temporary = `${path}.${process.pid}.tmp`;
await writeFile(temporary, JSON.stringify(result, null, 2) + "\n", { mode: 0o600 });
await rename(temporary, path);
console.log(`本週保守扣帳 ${result.chargedPercentagePoints} 個百分點；狀態：${result.status}。`);
if (result.status === "stop") process.exitCode = 2;

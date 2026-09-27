# Schedule｜每週課表與習慣追蹤

以固定週課表串起項目筆記、待辦、執行紀錄與回顧，幫助使用者安排生活、接續工作並逐步養成習慣。

核心流程：**安排 → 提醒 → 執行 → 記錄 → 回顧 → 調整**。

## 目前狀態

- 更新日期：2026-09-27。
- 階段：M0／M0.5 前置建置。已建立網頁開發骨架與本機檢查入口，產品功能尚未實作。
- 需求來源：專案「課表」先前的功能討論，以及本次 milestones 與 loop engineering 討論。
- 完整功能願景已整理；版本檢查點與執行方向已接受；精確套件版本與交付日期依驗證結果決定。
- 採用 loop engineering 的方向已確認；每週 agent 預算為帳戶週上限的 30%；已建立監看式用量帳本；自動執行器與硬性限制尚未建立。
- 已確認限制：專案使用的服務不付費；資料庫放 Supabase；採用完整 Vite 生態，包含 Oxc。
- 程式碼遵守 SOLID；除測試與純樣式檔外，每個程式檔最多 600 行。網頁預設採 Tailwind CSS、Zod、TanStack Query。

## 文件導覽

| 文件 | 用途 |
|---|---|
| [產品功能與使用情境](docs/product.md) | 想解決的問題、完整功能、已確認規則 |
| [Agent 開發入口](AGENTS.md) | 後續 agent 必讀的專案規則 |
| [程式碼規範](docs/coding-standards.md) | SOLID、600 行上限、拆檔與工具選型原則 |
| [領域詞彙](CONTEXT.md) | 項目、時段、待辦、執行紀錄等共同語言 |
| [技術與架構草案](docs/technical-direction.md) | 候選技術、取捨、同步與提醒方向 |
| [Vite 工具鏈](docs/toolchain.md) | Vite+、Rolldown、Oxc、Oxlint、Oxfmt、Vitest 的分工 |
| [免費服務與限制](docs/free-services.md) | 零服務費策略、免費額度、備份與發布方式 |
| [里程碑](docs/roadmap.md) | M0～M9 的成果、依賴與驗收標準 |
| [交付層級與 Issue／PR](docs/delivery-workflow.md) | Milestone → Spec → Ticket／Issue → 個別 PR |
| [Spec 索引與模板](docs/specs/README.md) | 全體 milestone 的 spec 分組、近期正文與票分解 |
| [Loop engineering 執行方式](docs/development-loop.md) | 任務如何進入、驗證、修正、保存與停止 |
| [決策紀錄](docs/open-questions.md) | Q01～Q15 已採用方向、執行預設與待驗證事實 |
| [Agent 預算](docs/agent-budget.md) | 每週 30%、共用記帳、停止門檻與執行限制 |
| [首批試跑任務](docs/tasks/pilot.md) | 三張小任務的初步驗收條件 |
| [任務卡模板](docs/tasks/TEMPLATE.md) | 後續拆分工作的共用格式 |

建議先讀產品功能，再讀技術方向與里程碑；準備實作時才進入 loop 文件與任務卡。

## 初步方向

採個人使用、單人開發與 AI 協作，優先驗證手機上的每日流程，再完成網頁與桌機體驗。產品需要跨裝置同步，不需要離線編輯；三端共用資料與業務規則，各自處理平台操作。

目前方向為 **TypeScript + Vite 生態工具鏈 + Supabase Free**。Vite+ 目前預設版為 RC，先依既定備援方案使用獨立 Vite、Vitest、Oxlint、Oxfmt；Vite 整合 Rolldown／Oxc；網頁／桌機介面沿用 React，手機沿用 Expo。

為符合零服務費限制，架構草案改為優先使用 Supabase 的資料存取、Auth、Storage 與必要的短任務函式，暫不另架常駐 NestJS 伺服器，也不預設需要 Prisma。此方向已隨 open questions 一併確認。網頁託管採 Cloudflare Pages Free，使用平台網址；決策理由見 [ADR-0001](docs/adr/0001-supabase-free-backend.md)。

免費服務有額度與可用性限制，不能承諾永久無限使用；超額時優先調整功能、清理或匯出資料，不自動升級付費。

## 開始實作之前

1. 依 Android／網頁／macOS 自用方向，驗證 Vite+ 相容性與 Supabase Free 可用額度。
2. 將已定的課表版本、跨日、取消、補記與封存規則轉成驗收案例。
3. 小規模驗證手機通知、Widget、健康資料，以及跨裝置同步衝突。
4. 建立最小可執行環境與預算記帳／停止機制，再以三張試跑任務校正 loop。

使用者已同意原 open questions 按建議方向執行；文件中的技術小驗證仍需實際完成，方向定案不代表功能已完成。可逆細節依實測調整並留下紀錄，重大變更再提出。

## 本機開發

使用 Node 24（`.nvmrc`）與 pnpm 10.17.0。在專案根目錄執行：

```sh
pnpm install --frozen-lockfile
pnpm dev
```

網頁開發入口為 http://127.0.0.1:5173/（若埠已使用，以啟動訊息為準）。目前是靜態起始畫面，尚無登入或課表功能。

- `pnpm check`：行數、格式、lint、型別、測試、建置。
- `pnpm format`：格式化應用與工具設定。
- Docker 啟動後，`pnpm db:start`／`pnpm db:stop`：啟停本機 Supabase；停止會保留本機資料。
- `pnpm budget:record <snapshot.json>`：記錄可信來源用量快照，格式與限制見[預算文件](docs/agent-budget.md)。

本批證據與剩餘限制見 [SETUP-001](docs/tasks/SETUP-001.md)。下一步補齊手機與資料權限驗證，然後執行 [PILOT-001](docs/tasks/pilot.md)。

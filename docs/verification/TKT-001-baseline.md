# TKT-001 基線驗證紀錄

日期：2026-10-10。來源：[GitHub #7](https://github.com/krok1029/schedule/issues/7)，父 spec [#4](https://github.com/krok1029/schedule/issues/4)。本文件是驗證證據；票據狀態以 GitHub 為準。

## 版本與交付

- 原始骨架：`0dd6f601c40dd590c83de943334d9baf9bb3e79f`。
- 本次驗證的整合基線：`70fe3e92dc7c8af8e20be55772f161344fa25aba`，包含已合併的 [PR #30](https://github.com/krok1029/schedule/pull/30) 接軌修正。
- #30 僅修正文檔，不代表 #7 驗收完成。本次後續 PR 承接其剩餘交付；保留既有歷史，未重建空基線或 force push。
- 本次僅增加驗證紀錄與入口連結，沒有變更應用、依賴或檢查工具。合併後仍須記錄整合 commit 並重跑檢查，才能將 #7 判定 Done。

## 納入與排除盤點

驗證基線共 84 個追蹤檔案，逐類檢視如下：

| 範圍 | 納入用途 |
|---|---|
| README、CONTEXT、AGENTS、docs | 產品規則、規格來源、開發規範及歷史證據 |
| .github | issue／PR 模板；沒有自訂 CI workflow |
| apps/web | 靜態 React 起始畫面、樣式與 Vite 設定 |
| 根目錄 manifests、lockfile、TS／lint／test 設定 | 鎖定依賴與品質入口 |
| scripts、config/agent-budget.json | 行數檢查、監看式預算政策與測試 |
| supabase/config.toml | 本機服務設定；秘密欄位使用環境變數引用 |

`git ls-files` 未包含 `.env`、`.agent`、node_modules、dist、coverage、Supabase 暫存或分支資料。`git check-ignore` 驗證 `.env`、`.env.local`、`.agent/weekly-usage.json`、node_modules、apps/web/dist、supabase/.temp、supabase/.branches 均受忽略規則保護。

對追蹤檔案執行私鑰、GitHub token、常見 API key 與 JWT 格式搜尋，無命中；檢視 Supabase 設定中的環境變數引用。這是基線內容盤點，並非保證能辨識所有秘密的完整安全稽核。

## 乾淨安裝與品質驗證

環境：macOS、Node `v24.21.0`、pnpm `10.17.0`。使用 `git archive` 將整合基線匯出到全新暫存目錄，不複製現有 node_modules 或建置產物。

可重現步驟（在儲存庫根目錄開始）：

```sh
verification_dir=$(mktemp -d)
git archive 70fe3e92dc7c8af8e20be55772f161344fa25aba | tar -xf - -C "$verification_dir"
cd "$verification_dir"
pnpm install --frozen-lockfile
pnpm check
```

| 實際命令／檢查 | 結果 |
|---|---|
| `pnpm install --frozen-lockfile --offline` | 首次失敗：沙箱內快取缺少 functions-js tarball；不宣稱離線可重現 |
| `pnpm install --frozen-lockfile` | 允許一般安裝後成功；86 個套件，輸出 reused 86、downloaded 0，鎖定檔無變更 |
| `pnpm check` | 退出碼 0；行數、格式、lint、型別、Vitest、Vite build 全通過 |
| Vitest | 3 個測試檔、29 個測試通過 |
| Vite build | 61 個模組；JS 245.78 kB、CSS 7.06 kB |
| 安裝與檢查後逐檔比對 | 匯出目錄中的 84 個追蹤檔案均與基線相同 |

鎖定檔 SHA-256：`1f76daa553d70b655ade8fd30f185cf2dbcd3fceb99295417a516926fb5b6fa8`。

最初匯出輔助命令因系統 Python 不支援 tarfile 的 filter 參數失敗，改用系統 tar 解開 Git archive 後成功；未修改專案或降低驗收。shell 啟動曾出現 RVM 的 ps 權限訊息，但品質命令完整執行且退出碼為 0。

## 既有骨架審查

審查範圍包含基線的應用入口、畫面、設定、行數工具、預算工具與其測試，不限於本次文件差異。

- `main.tsx` 負責 React／Query provider 組裝；`app.tsx` 僅呈現靜態畫面，未混入資料存取。
- 預算計算在 `budget-policy.mjs`，檔案 IO 在 `record-budget.mjs`；行數政策／走訪在 `source-files.mjs`，CLI 結果處理在 `check-lines.mjs`。呼叫方向單向，未發現循環依賴或空殼分層。
- TypeScript strict、noUncheckedIndexedAccess、exactOptionalPropertyTypes 已啟用。尚無業務 API、持久化或可替換的外部 Adapter，無需為此次基線另建抽象。
- 9 個受管程式檔：HTML 13 行、App 24 行、main 23 行、Vite config 5 行、budget-policy 52 行、check-lines 17 行、record-budget 21 行、source-files 59 行、Vitest config 5 行。測試與純 CSS 按既定規則豁免，沒有透過壓縮或改名規避。
- 現有行數測試實際建立 600／601 行檔案並確認 CLI 成敗。預算工具仍是人工可信讀值、單一操作者的監看模式；政策 JSON／本機帳本視為受控設定，沒有並行鎖、自動換週或硬性限額，不能作為無人值守安全閘門。

## 未完成能力與驗收界線

- 瀏覽器畫面與操作、格式／型別違規的實際阻擋演練：由 #8 補齊；本次建置不代表視覺驗收。
- Android 啟動與可攜共用輸入規則：由 #9 補齊，現有 repo 沒有手機應用。
- 本機資料重建與兩個一般使用者的 RLS 隔離：由 #10 補齊；本次未啟動 Supabase，歷史啟停成功不能替代資料權限驗證。
- 登入、課表、項目持久化與產品資料表尚未實作；沒有雲端部署或付費服務。
- GitGuardian 檢查不等於專案的品質 CI；目前仍依本機 `pnpm check`。

#7 前三項 AC 的盤點、基線審查與乾淨目錄品質檢查證據已備妥，PR 審查／合併及第四項整合後驗證仍待完成。父 spec #4 與 M0／M0.5 不因此完成。

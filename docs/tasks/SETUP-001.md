# SETUP-001：最小開發環境與驗證入口

狀態：環境建置與本機檢查完成；瀏覽器畫面驗收待補。2026-09-27。本批只處理此卡；PILOT-001 仍待本卡與手機環境前置完成。

## 範圍

建立 pnpm workspace、React／Tailwind 起始畫面、TanStack Query provider、Vite／Vitest／Oxlint／Oxfmt／TypeScript、600 行檢查、本機 Supabase 初始化、監看式用量記帳。保留既有規劃文件。

Vite+ npm 預設版為 1.0.0-rc.1，依穩定版優先規則採文件既定的獨立工具備援方案；沒有安裝 Vite+ 預發行版。

## 驗收

- [x] 鎖定正式版相容依賴，乾淨安裝可重現。
- [x] 行數、格式、lint、型別、測試與網頁建置通過。
- [x] 本機 Supabase 可啟停，留下驗證狀態。
- [x] 用量記帳拒絕錯誤窗口／缺漏讀值，28 個百分點回傳停止狀態。
- [x] 記錄尚未驗證的手機／原生能力與下一張卡。

## 執行限制

本週基線讀值 64%，reset 1791071949，limitId codex；全專案 30 個百分點上限、28 個百分點停止新輪次；批次 60 分鐘。帳戶讀值可能包含其他專案消耗，保守計入。沒有常駐自動執行器、沒有發布或遠端 push。

## 驗證紀錄

- `pnpm install`：成功；精確版本與鎖定檔已保存。
- 將 workspace manifests／鎖定檔複製到全新暫存目錄後，`pnpm install --frozen-lockfile --offline` 成功，使用本機套件快取而非重用 node_modules。
- `pnpm check`：行數、格式、Oxlint、TypeScript、Vitest、Vite build 全數通過；3 個測試檔、29 個測試。
- 其中以暫存實體檔驗證 600 行通過／601 行失敗，以及測試／純樣式例外；預算測試包含 28 個百分點門檻、缺漏／錯誤窗口與結束後閒置區間。
- 將 Node 型別與 runtime 對齊至主版本 24 後，再次 `pnpm typecheck` 通過；設定變更後 `pnpm format:check` 通過。
- `pnpm dev`：Vite 開發伺服器可啟動。瀏覽器工具因無法驗證管理員安全政策拒絕存取 localhost，未繞過；**尚未完成瀏覽器畫面／操作驗收**。建置通過不代表視覺驗收通過。
- `pnpm exec supabase init`：已建立本機設定；`pnpm db:start` 成功，容器健康、資料庫 `select 1` 回傳 1；`pnpm db:stop` 成功並保留資料。本批沒有 seed 測試資料。

## 流程接軌註記

此卡為一票一 issue／PR 規則採用前的歷史建置紀錄，當時尚無 issue／PR 或 Git 提交，不視為新交付流程中的 Done。

2026-10-10 接軌核對：既有成果已依使用者指示提交並推送至 `main`，基線為 `0dd6f601c40dd590c83de943334d9baf9bb3e79f`。後續由 [TKT-001／#7](https://github.com/krok1029/schedule/issues/7) 交付盤點、可重現驗證與必要修正的獨立 PR；不追稱此歷史建置已經 PR 審查，也不將已推送等同於驗收完成。

## 交接與範圍限制

這批只有開發骨架，沒有登入、資料表、RLS、課表、筆記或雲端資源。Zod／Supabase client 已鎖定安裝，功能整合尚未完成。原始碼皆低於 600 行；行數掃描／政策計算／帳本 IO 分開，未建立空殼業務分層。

下一批先完成 Android 最小畫面、可攜 schema／共用規則、一般使用者身分的本機 Supabase 權限測試，再將 PILOT-001 拆成 Ready 任務。手機通知、Widget、健康資料仍需 M0 平台驗證。M0 與 M0.5 尚未整體完成。

預算為監看式單一寫入者帳本，沒有自動讀值、模型呼叫閘門或並行鎖；不可宣稱 30% 硬上限已生效。

本批結束讀值：帳戶週用量 73%，相對起點 64% 保守扣帳 9 個百分點（包含同區間其他專案可能消耗）。區間已 end；尚未超過 28 個百分點停止門檻。開發伺服器與本批 Supabase 容器已停止。

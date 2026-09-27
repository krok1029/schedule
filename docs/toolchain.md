# Vite 生態工具鏈

更新：2026-09-27。使用者已指定完整 Vite 工具鏈，包含 Oxc。已接受以 Vite+ 為整合入口；已完成第一批網頁工具鏈驗證；手機整合仍待完成。

## 工具分工

| 工具 | 責任 | 在 Schedule 的使用方式 |
|---|---|---|
| Vite | 開發伺服器、網頁建置入口 | React 網頁與 Tauri 前端 |
| Rolldown | 模組打包 | 使用 Vite 整合的版本，避免另外堆疊第二套網頁打包流程 |
| Oxc | JavaScript／TypeScript 解析與轉換等編譯基礎 | 沿用 Vite／Rolldown 的整合；不自行組裝 compiler pipeline |
| Oxlint | 靜態規則檢查 | TypeScript／JavaScript 專案規則 |
| Oxfmt | 格式化 | 支援格式的原始碼與文件；SQL、Rust 等仍依各自工具 |
| Vitest | 單元與適合的整合測試 | 領域邏輯、共用資料存取與網頁；取代原草案的 Jest 主方案 |
| tsdown | 函式庫打包 | 共用套件確實需要產物時才使用 |
| Vite Task | 任務執行與快取 | 需要跨 workspace 編排時使用；先本機快取 |
| TypeScript 型別檢查 | 完整型別驗證 | 使用選定整合版本支援的檢查方式，不能把轉譯成功當型別通過 |
| Playwright | 網頁端到端操作 | 補足工具鏈之外的使用流程驗收 |

Vite 8 已整合 Rolldown 與 Oxc；這表示採用正式 Vite 即可使用該編譯／打包方向，不需要選舊的 rolldown-vite 過渡套件。[Vite 8 公告](https://vite.dev/blog/announcing-vite8)

## 網頁應用層工具

| 工具 | 採用方向 | 注意事項 |
|---|---|---|
| Tailwind CSS | 網頁／Tauri 介面的樣式基礎，使用官方 Vite 整合 | 不等於購買 Tailwind Plus；手機不直接套 Web CSS |
| Zod | 表單、匯入與外部資料的執行期 schema 驗證，共用可攜 schema | 不取代資料庫權限／約束；與資料庫型別分工 |
| TanStack Query | 管理伺服器資料查詢、快取、mutation 與失效刷新 | 搭配共用 Supabase 資料存取，不當成多人同步衝突解法 |

Tailwind 官方提供 `@tailwindcss/vite` 整合；Zod 提供執行期驗證與型別推導；TanStack Query 用於伺服器狀態管理。[Tailwind Vite](https://tailwindcss.com/docs/installation/using-vite)、[Zod](https://zod.dev/)、[TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview)

查詢的 staleTime、前景刷新、重試與失效策略須明確設定並驗證，避免免費流量被過度輪詢消耗。對權限、驗證、版本衝突不盲目重試；重新送出寫入需保證冪等。手機的前景／網路狀態需平台整合，不假定網頁行為自然成立。[TanStack Query 預設行為](https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults)

優先穩定且相容的新工具／主流工具，按需求加入；不因工具同屬 TanStack 就一併引入 Router、Form、Table 等未有明確需求的套件。完整規範見[程式碼規範](coding-standards.md)。

## Vite+ 作為統一入口

Vite+ 官網目前標示免費、MIT 開源，並整合上述主要工具，適合作為此專案的統一入口。[Vite+ 官方介紹](https://viteplus.dev/)

規劃使用其 check／test／build／pack／run 類工作流程，但實作時須依選定版本與 CLI help 確認命令和設定。整合文件目前也提供預發行版本路徑，不在這份文件承諾某版為最新穩定版。[Vite+ 使用指南](https://viteplus.dev/guide/)

建議採專案內依賴與鎖定檔，保留既有 Node 管理習慣；無需為了工具鏈更動全機預設。Vite+ 支援專案本地 CLI。[本地 CLI](https://viteplus.dev/guide/#install-vp-globally)

若 M0.5 發現 Vite+ 整合版或外掛不相容，可用獨立的 Vite、Vitest、Oxlint、Oxfmt 與按需 tsdown；這是同一工具生態的備援路徑，不能因此默默回到全套 ESLint／Prettier／Jest。必要的相容性例外要記錄原因和影響。

## 不強行統一的平台邊界

- Expo 原生 App 依官方 Metro 流程建置，保留必要的 React Native 設定。Oxlint／Oxfmt 可以共用，但不能假定 Vitest 直接替代所有 React Native 元件測試。[Expo Metro](https://docs.expo.dev/guides/customizing-metro/)
- Tauri 的網頁畫面走 Vite，Rust 本體走 Cargo；原生簽章與打包不由 Oxc 處理。
- Supabase Edge Functions 依其支援執行環境驗證；SQL migration／RLS／RPC 以資料庫測試驗證，不只跑 JavaScript 測試。
- 型別檢查是獨立通關條件。Oxc 的 TypeScript 轉換與型別檢查不同；Vite+ check 的實際型別支援須核對選定版本。[Vite+ check](https://viteplus.dev/guide/check)

## M0.5 驗收

- 依鎖定檔從乾淨環境安裝成功。
- 一份 React 畫面可開發、建置，並由靜態服務提供。
- 共用 TypeScript 規則在 Vitest 下可執行；型別錯誤和規則錯誤各能被擋下。
- 格式化結果可重現；agent 與人工使用相同設定。
- 啟用原始碼 600 行檢查（測試與純樣式檔除外），並驗證邊界與例外範圍。
- Tailwind、Zod、TanStack Query 與選定的 Vite+／React 版本完成最小整合驗證。
- 手機可引用共用規則，原生建置仍正常。
- loop 保存實際驗證命令與結果；重試不跳過型別、權限或測試檢查。

不額外購買遠端快取、付費 CI 或工具鏈訂閱；服務費限制見[免費服務](free-services.md)。

## SETUP-001 實測選型（2026-09-27）

從 npm 官方 registry 核對，Vite+ latest 為 `1.0.0-rc.1`，因此依穩定版規則啟用上述獨立工具備援路徑。精確依賴以 `package.json` 與 `pnpm-lock.yaml` 為準；本機 Node 24.21.0、pnpm 10.17.0。

已驗證 Vite 8.3.1、Vitest 5.0.2、Oxlint 1.85.0、Oxfmt 0.70.0、TypeScript 7.0.2。React／Tailwind 與 Query provider 已接入骨架；Zod 與 Supabase client 已安裝，外部資料 schema、登入、RLS 與手機共用整合留待後續任務。tsdown 與工作快取依實際需要加入。

格式化採鎖定 Oxfmt 版本的預設規則，升級時需檢查格式差異。本機 `pnpm check` 已通過；尚未建立 CI 或無人值守執行器。

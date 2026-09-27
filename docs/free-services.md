# 免費服務與費用限制

更新與查核：2026-09-27。使用者要求專案使用的服務不付費；資料庫使用 Supabase。這是選型限制，超出免費能力時要先調整方案，不自動升級。

## 免費的定義

- 採開源工具、本機執行或無固定費的免費方案；不把短期試用金當長期免費架構。
- 不購買網域、付費 API、付費資料庫方案、雲端快取、常駐伺服器或付費發布會員。
- 免費方案有配額與可用性限制。到額度時可停止相關功能、降低頻率或匯出清理，不能自動開啟超額計費。
- 這裡控制新增專案服務費；既有電腦、網路、電力不是雲端免費額度。開發 agent 僅用既有可用額度，不購買額外 API／credits；既有帳戶方案本身不因此被宣稱免費。Schedule 每週 agent 工作合計最多為帳戶週上限的 30%，見[預算政策](agent-budget.md)。
- 不以保活請求、輪流開新帳戶或其他方式規避免費方案規則。

## 建議服務清單

| 用途 | 方案 | 邊界與替代 |
|---|---|---|
| 資料庫 | Supabase Free PostgreSQL（已指定） | 依免費配額設計；接受可能暫停，準備匯出／還原 |
| 登入 | 建議 Supabase Auth Free | 採 Google OAuth，避免把寄信當無限制免費能力；回呼與權限依真機／網頁實測驗證 |
| 附件 | 建議 Supabase Storage Free | 圖片在用戶端壓縮、限制單檔與總量；保留獨立附件備份 |
| 必要伺服器函式 | Supabase Edge Functions 免費額度 | 只做短任務；需先確認時間、記憶體和呼叫上限 |
| 網頁 | 建議 Cloudflare Pages Free，使用平台網址 | 靜態資源請求免費；建置及其他限制仍要遵守，不默認開啟付費 Workers |
| 手機建置 | 本機 Expo／Android 工具 | 不以付費 EAS 為必要條件；原生模組可使用 development build |
| 桌機建置 | 本機 Tauri／Rust 工具 | 先自用；公開發布的簽章／公證成本另評估 |
| 備份 | 本機匯出並保存到既有儲存位置 | 資料庫與附件分開備份，敏感資料不提交 Git |
| CI／loop | 優先本機；需要雲端時再核對免費額度 | 不購買 runner／額外用量，額度不足改本機或停止 |

Cloudflare 的靜態請求與 Functions 計費不同，選型只承諾以免費靜態方案規劃。[Cloudflare Pages 計費](https://developers.cloudflare.com/pages/functions/pricing/)

本機可跑 Expo／EAS 建置；它省去雲端建置需求，不免除平台簽章或發布要求。[Expo 本機建置](https://docs.expo.dev/build-reference/local-builds/)

## Supabase Free 的目前限制

官方目前列出：每個專案 500 MB 資料庫、1 GB 檔案儲存、5 GB egress 及另外的 5 GB cached egress；最多 2 個活躍免費專案，閒置一週會暫停。Free 不提供自動備份與 PITR。額度可能調整，開通前再核對帳戶可用情況。[Supabase 定價](https://supabase.com/pricing)

對本專案的影響：

- 本機開發與測試優先，不預設每個環境都有一個免費雲端專案。
- 不一次生成無限未來課表／週期待辦實例；按需要展開，歷史依保留政策管理。
- 附件先限制大小與總量；取回資料分頁、只訂閱必要變化，避免大量輪詢消耗流量。
- 服務暫停時呈現無法同步，已排在手機的本機提醒與雲端資料新鮮度分開顯示；不能承諾免費雲端全年不中斷。
- 使用量接近上限時提醒使用者清理／匯出／降低使用；不自動升級。

## 登入、備份與發布不能漏算

**登入寄信**：Supabase 預設 SMTP 僅供有限測試，收件人與速率受限，不能當公開產品的通用寄信服務。建議先以符合需求的 OAuth 登入驗證；若改用信箱連結，需另找確實可用的免費 SMTP 及其限制。[Supabase SMTP](https://supabase.com/docs/guides/auth/auth-smtp)

**資料備份**：Free 自行安排匯出與還原。資料庫備份不含 Storage 中實際檔案，需另存附件與對應關係，M9 實際重建驗證。[Supabase 備份](https://supabase.com/docs/guides/platform/backups)

**手機與桌機發布**：先以網頁及自用安裝規劃。Android 可採直接提供 APK 的方式，當時適用的裝置／開發者驗證要求仍須確認；不把 Play 商店上架列為零費用前提。[Android 發布方式](https://developer.android.com/studio/publish)

Apple 的免費開發帳戶與付費 Developer Program 權益不同，因此 iOS 正式商店發布及需要會員的發布流程不列入零預算首發承諾。若未來需要，另選免費可行的使用方式或由使用者改變預算約束。[Apple 帳戶與會員](https://developer.apple.com/help/account/basics/about-your-developer-account)

## 開通前的檢查

1. 確認是 Free 方案，帳戶還有足夠額度；不啟用付費附加服務。
2. 確認免費限制能支援本輪驗收；不能支援就標明限制或改方案。
3. 保存還原步驟與用量查看入口，不把免費服務當備份本身。
4. 後續條款或額度改變時更新此文件；沒有使用者新的授權不改付費。

---
status: accepted
date: 2026-09-27
---
# 零服務費下使用 Supabase 作為第一版後端

使用者要求專案服務不付費，指定 Supabase 資料庫，並同意其餘待決方向依建議執行。因此採 Supabase Free 的 PostgreSQL、Auth、Storage 與必要 RPC／Edge Functions，網頁使用 Cloudflare Pages Free；暫不另架 NestJS 常駐 API，也不以 Prisma 作為資料存取前提。

這能減少託管與運維支出，但會把權限與原子寫入集中到 RLS、資料庫函式與供應商介面；客戶端不可繞過資料規則。接受免費額度、可能暫停與自行備份的代價；以版本化 SQL、共用資料存取層、資料庫與附件獨立匯出降低移轉成本。

若必要業務邏輯超過短任務函式能力，或免費額度無法支援實際使用，再評估新的免費部署方案；不以新增需求作為自動升級付費理由。詳見[技術方向](../technical-direction.md)與[免費服務](../free-services.md)。

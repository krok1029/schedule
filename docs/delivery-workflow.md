# Milestone → Spec → Ticket／Issue → PR

狀態：已採用，2026-09-27。依使用者最新指示更新交付方式；適用產品、基礎設施、修正與文件票。

## 層級與責任

| 層級 | 定義 | 完成條件 |
|---|---|---|
| Milestone | 一個可交付階段，由多份 spec 組成 | 納入此階段的 spec 全部驗收，加上 milestone 的整體使用情境通過 |
| Spec | 一組內聚能力的行為契約，含目的、規則、邊界與整體驗收 | 子 ticket 全部 Done，跨票整合情境驗證通過 |
| Ticket／Issue | spec 下的一個可獨立驗證、可單獨合併的交付單位 | 自己的 PR 合併到目標版本，當前版本驗收與整合後檢查通過 |
| PR | 交付單一 ticket 的變更與證據 | 關聯對應 issue，完成審查與驗證；合併由使用者決定 |

每份 spec 展開成多張 ticket。每張 ticket 只有一份主要 spec、一個對應 issue、一條工作分支與一個交付 PR；一張 ticket 可包含多次 commit，修正審查意見直接更新同一 PR。若 PR 被關閉而未合併，替代 PR 必須保留連結與原因，同時只能有一個有效交付 PR。

產品 spec 的正文放 `docs/specs/`；milestone/spec 索引見 [specs/README](specs/README.md)。初期以 GitHub 作為 issue／PR 平台範本，repo 為 [krok1029/schedule](https://github.com/krok1029/schedule)，已依使用者指示建立為公開；六份 spec 與 23 張 tickets 已發布，目前無 ticket PR。

## 如何切出獨立 ticket

- 一張票交付可觀察的完整行為，包含該行為必要的 UI、資料、權限與錯誤處理；不單純拆「前端一票、後端一票」而兩邊都不能驗收。
- 可以依賴已 Done 的 ticket；獨立指的是在已合併的基礎上能測試、審查與合併，不是所有票都無依賴。
- 不依賴另一張未合併 PR 的隱含變更，初期不採堆疊 PR。依賴未完成就維持 Draft／Blocked。
- 工具、基礎設施、可行性驗證也可以獨立成票，但需有具體結果與可重現驗證，例如「601 行來源檔被檢查擋下」或「Android 拒絕通知授權仍可使用核心畫面」。
- ticket 必須列正常、失敗與適用的邊界案例。沒有持久化／重試／平台影響的項目可註明不適用並附原因，不為套模板新增功能。
- 若無法在既定批次完成，先縮小可驗收行為或拆成有明確依賴的票，不靠降低驗收或把未完成程式混入 PR。

## 真實來源與連結

- Milestone：目標與整體驗收以 `docs/roadmap.md` 為準，遠端 milestone 留摘要與連結。
- Spec：規則與 AC 編號以 repo 內 spec 為準；追蹤 issue 如有建立，只負責子票列表與導覽，不複製整份規格。
- Ticket：尚無遠端 repo 時使用 `docs/tasks/<ID>.md` 草稿；建立 issue 後，issue 作為狀態、執行紀錄、驗收證據與 PR 連結的真實來源。本機草稿保留 issue URL 與遷移說明，不再雙邊更新狀態。
- PR：寫 ticket issue URL／編號、spec 路徑與驗收 AC 編號、milestone、變更結果、實際驗證與限制。不得填假的 issue／PR 編號或宣稱文件已在 GitHub 生效。
- Ticket ID 保持穩定，與 issue 編號分開，例如 `PILOT-001` 對應之後取得的真實 issue URL；不預先分配 GitHub 編號。

GitHub PR 以 `Closes #<真實 issue 編號>` 關聯自己的 ticket issue。自動關聯／關閉關鍵字的行為取決於 PR 是否以 repository 預設分支為目標；非預設分支需明確人工連結與核對關閉狀態。issue 自動關閉不等於 spec 或 milestone 驗收通過。[GitHub 官方說明](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/linking-a-pull-request-to-an-issue)

PR 不使用關閉關鍵字指向整份 spec 的追蹤 issue，也不順帶關閉其他 ticket。

## Ready 與交付順序

1. Spec 先明確列 AC、範圍、不在範圍與 ticket 分解；近期 spec 詳細化，後期索引維持 Draft，不一次產生大量尚不可執行的 issues。
2. 建立真實 ticket issue，填 milestone、spec、依賴、修改範圍、驗證方式與預算。依賴已合併、未決事項清空才標 Ready。
3. 一次選一張 Ready issue，建立獨立分支，依 loop 實作、驗證、修正並保留 checkpoint。
4. 每張票個別開 PR，附 issue 關聯與證據；仍在實作或待驗證的 PR 保持 Draft，完整後才進 In Review。
5. 審查通過且當前版本驗證通過為 Verified／待合併；使用者決定合併。合併後檢查通過才把 ticket 標 Done；若失敗，記錄阻礙並重開追蹤，不能只憑 issue 自動關閉算完成。
6. spec 子票全 Done 後做整體 AC 驗收；milestone 另做跨 spec 的交付驗收。取消或延後票需明確調整範圍，不能悄悄移除驗收要求。

SOLID、來源檔 600 行上限、免費服務、每批一票、最多三次有依據修正、60 分鐘與週預算 30%／28 個百分點停止門檻全部沿用。

## 授權與目前接軌狀態

本次指示確立「每票建立 issue 並個別發 PR」的交付方式。確認 repo 與存取環境後，已定案票的 issue 建立、任務分支 push、對應 PR 建立可依此執行，不逐票重問同樣的流程授權；不因此自動合併、發布、建立付費服務或啟動無人值守排程。遠端 repo 的建立／可見性仍需具體目的地，不能自行猜測。

2026-10-10 接軌核對：既有文件與骨架已依使用者指示分成 5 個 commit 並推送到 `main`，基線為 `0dd6f601c40dd590c83de943334d9baf9bb3e79f`。六份 spec 與 23 張 tickets 已發布，但基線尚未完成正式 ticket 驗收。既有 SETUP-001 不能追稱已走過 issue／PR。依 [TKT-001／#7](https://github.com/krok1029/schedule/issues/7) 從既有基線另開分支與獨立 PR，盤點既有檔案、排除密鑰與本機產物，交付乾淨安裝、品質檢查證據及必要修正；審查涵蓋既有骨架。保留現有歷史，不重建空基線或 force push。使用者合併且整合後驗證通過才 Done，下游依賴維持不變。

## 使用技能產生規格與票（後續指示，優先於前述手動草稿）

使用者指定以 `grill-with-docs` → `to-spec` → `to-tickets` 產生正式規格與票。已找到本機安裝的三份技能；使用者後續指定 `grill-with-docs`，結合 `grilling` 與 `domain-modeling`，並使用選項方式互動。第一批範圍已確認為 M0／M0.5，M1～M9 保留概略索引。

1. `grill-with-docs`：沿用已定案產品／技術／預算規則，只釐清仍有分歧的決策；查證事實由 agent 負責，設計理解經使用者確認才定稿。
2. `to-spec`：整理已討論內容，提出最高層、最少且能驗證外部行為的測試切入點，經確認後依技能模板發布 spec issue。
3. `to-tickets`：先呈現完整功能切片、阻擋依賴與每票成果，由使用者確認粒度／依賴，再逐票發布 issue；父 spec 保持開啟。
4. 一票一 PR、SOLID、600 行、免費服務與週預算限制仍適用。`ready-for-agent` 是技能的規格完整度標籤，不能取代依賴、審查或預算檢查，也不能讓父 spec 被直接當成實作票。

相依 `setup-matt-pocock-skills` 的 GitHub tracker、五個預設 triage labels 與 single-context 文件設定已經使用者確認並保存於 `docs/agents/`。M0／M0.5 已完成技能要求的確認並發布六份 spec 與 23 張 tickets；本機保留來源索引。後續 milestone 草稿仍須同樣確認。正式 spec issue 發布後作為規格來源，本機正文保留草稿／來源指標，避免雙邊維護矛盾。

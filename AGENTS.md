# Schedule 開發規範

此檔適用於 Schedule 儲存庫。使用者明確指示優先；已接受的產品規則與技術方向見下列文件。

## 開始工作

- 先讀 [README](README.md)、[領域詞彙](CONTEXT.md)與當前任務卡。
- 修改程式前讀[程式碼規範](docs/coding-standards.md)；資料規則依[決策紀錄](docs/open-questions.md)。
- 工具選型依[工具鏈](docs/toolchain.md)，服務必須符合[零服務費限制](docs/free-services.md)。
- Agent 工作遵守[每週預算](docs/agent-budget.md)：全專案共用週上限的 30%，28 個百分點停止開新輪次；尚未有硬性限額執行器，不能假稱已啟用。

## 互動方式

- 後續提問一律使用選項互動，建議選項排第一；沿用已確認決策。確認後的詞彙即寫入 CONTEXT.md，ADR 依 domain-modeling 的必要性條件建立。

## 技能工作流程

- 正式拆票依使用者指定採 `grill-with-docs`（結合 `grilling` 與 `domain-modeling`）→ `to-spec` → `to-tickets`。先讀各技能，不以手寫模板代替流程。
- 第一批先完整處理 M0／M0.5；M0／M0.5 的六份 spec 與 23 張票已確認並發布，執行前讀 GitHub 正文／comments；其餘 milestone 仍為概略草稿。不重問已定案事項。
- GitHub repo：`https://github.com/krok1029/schedule`，公開；tracker／labels 的一次性技能設定已確認；六份父 spec 已發布為 GitHub #1～#6；23 張 tickets 已發布，來源見 docs/tasks/m0-m05-proposal/README.md，目前無 ticket PR。

## 交付結構

- 依 [Milestone → Spec → Ticket／Issue → PR](docs/delivery-workflow.md)工作；一票一 issue、一分支、一個交付 PR。
- Ready 前需 spec／AC、真實 issue、已合併依賴與獨立驗收；一批只做一張票。
- PR 關聯對應 issue，附當前版本驗證；Verified 不等於 Done，合併並整合後驗證通過才 Done。spec／milestone 另需整體驗收。
- repo 確認後依既定範圍建立 issue、push 分支與開 PR；不自動合併／發布。未確認 repo 時保留本機草稿，不虛構遠端成果。

## 必須遵守

- 維持 SOLID：職責集中、以組合擴充、替代實作遵守契約、小介面、業務邏輯與外部存取分離。依實際需要抽象，不為套原則建立空殼分層。
- **除測試檔與純樣式檔之外，專案每個程式檔不得超過 600 行。第 601 行起必須拆檔。** 空白與註解計入；不得壓縮排版、改名或移到測試／樣式檔規避。
- 依職責拆分，保持清楚的 Interface 與呼叫方向；不可只切成互相循環依賴的片段。600 行是上限，不是建議長度。
- TypeScript 使用 strict；外部輸入先驗證。Zod 驗證不能取代 Supabase RLS、資料庫約束與原子寫入。
- 網頁／桌機介面預設 React + Tailwind CSS；Zod 負責執行期資料驗證，TanStack Query 負責伺服器狀態；手機仍用 Expo／Metro。
- 優先採持續維護、主流且相容的現代穩定工具；按需求引入並鎖版本，不默默改用 preview／canary，也不因追新擴大架構。

## 完成前

- 檢查受影響程式檔的行數與拆分品質；SOLID 需要審查，不能只靠 lint 宣稱通過。
- 執行適用的格式、lint、型別、測試與建置驗證，保留實際命令與結果。
- 開發骨架已建立；本機統一入口為 `pnpm check`。CI 尚未設定，手機與資料權限檢查另行補齊，不把本機檢查當成全平台已驗證。
- 保留無關變更；測試失敗不可藉降低驗收條件或跳過測試通關。

## Agent skills

### Issue tracker

Specs 與 tickets 發布為 https://github.com/krok1029/schedule 的 GitHub Issues；使用 gh。詳見 docs/agents/issue-tracker.md。

### Triage labels

沿用 needs-triage、needs-info、ready-for-agent、ready-for-human、wontfix。詳見 docs/agents/triage-labels.md。

### Domain docs

Single-context：共用根目錄 CONTEXT.md 與 docs/adr/。詳見 docs/agents/domain.md。

# Issue tracker: GitHub

Repo：https://github.com/krok1029/schedule（公開）。

使用 gh 操作。尚未有 git remote 或不在 clone 目錄時，命令一律明確指定 --repo krok1029/schedule；日後核對 remote 後才可省略。多行內容先寫 UTF-8 暫存檔，再用 --body-file 提交。

## 來源與交付

- Milestone 目標沿用 docs/roadmap.md；每個 milestone 對應多份 spec。
- to-spec 的發布結果是一個 spec issue，使用技能規定的模板。
- to-tickets 先讓使用者確認粒度與阻擋關係，再按依賴順序發布每張 ticket issue；每張連到父 spec，並歸屬同一 milestone。
- 已發布的 spec／ticket issue 是正文與追蹤狀態來源；既有本機草稿留來源連結，不雙邊維護。
- Ticket 每票獨立分支與 PR，PR 關聯自己的 ticket issue；不得關閉父 spec 或其他 ticket。
- 原生 sub-issue／blocking 關係可用時採用；不可用時在正文放 Parent 與 Blocked by 的真實 issue 連結，不虛構關係。
- 取工作時只選已確認的 ticket，核對依賴已合併且驗證通過、預算允許；spec 父 issue 不可直接當實作票。
- 先用 gh issue view 讀完整正文、標籤與 comments；讀 PR 時另讀實際 diff。
- 不自動合併、發布或啟動無人值守；使用者已授權範圍內的 issue／分支 push／PR 可執行。

## Pull requests as a triage surface

PRs as a request surface: no.

## 技能詞彙

Publish to the issue tracker = 建立 GitHub issue。
Fetch the relevant ticket = 讀取對應 issue 正文、標籤與 comments。
先確認 repo、issue 身分與實際狀態，不只靠標題猜測。

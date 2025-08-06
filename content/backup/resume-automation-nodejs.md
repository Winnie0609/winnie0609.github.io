---
title: '如何用 Node.js 實現履歷自動化？Markdown + EJS + Puppeteer 指南'
date: '2025-07-15'
slug: 'resume-automation-nodejs'
description: '使用 Markdown + EJS + Puppeteer 建立自動化履歷生成系統，解決純 HTML 履歷難維護、手動操作繁瑣的問題'
tags: ['EJS', 'Puppeteer']
---

## 問題

因為想要客製化樣式，因此原本的履歷是用純 HTML 搭配 CSS 製作的，再手動存成 PDF 檔案。

這個過程存在**三個**痛點：

1. **難維護**：每次修改內容，都必須在複雜的 HTML 結構中找到對應的元素，耗時也容易出錯。
2. **手動麻煩**：修改完成後，需要手動打開瀏覽器，透過「列印」功能另存為 PDF，操作重複且效率低。
3. **版控困難**：純 HTML 檔案在版本控制 (如 Git) 中，很難一眼看出每次提交的具體內容變更 。

## 解法

這裡的解法是讓 Style 以及 Content 各自獨立，如果要調整可以直接修改內容。這裡會使用 Markdown + EJS + Puppeteer 這個組合技。

- 內容：使用 Markdown 撰寫，內容如果要修改，可以直接修改 Markdown 檔案
- 樣式模板：固定樣式模板，使用 EJS 建立可以重複使用的 HTML 結構和樣式
- PDF 生成：通過 Puppeteer 執行 HTML 轉成 PDF 的流程

## 實作

### 專案結構

```bash
/resume-generator
├── content/
│   └── resume.md         # 內容
├── templates/
│   ├── resume.ejs        # HTML 模板
│   └── style.css         # CSS 樣式
├── output/               # 存放產出的 HTML 和 PDF
├── build.js              # 腳本
└── package.json
```

### 安裝套件

```bash
# 初始化專案
pnpm init -y

# 安裝所需套件
pnpm install markdown-it ejs puppeteer gray-matter fs-extra
```

- `markdown-it`: Markdown 解析器
- `ejs`: 簡單直觀的模板引擎，語法類似 HTML。
- `puppeteer`: Google 開發的無頭 (headless) 瀏覽器工具，可以將 HTML 頁面匯出成 PDF
- `gray-matter`: 用於解析 Markdown 檔案最上方的 **Front Matter** 中繼資料 (即 `---` 包覆的區塊)。
- `fs-extra`: `fs` 模組的增強版，方便檔案讀寫。

### 步驟

1. **撰寫 Markdown 內容 (`content/resume.md`)**

使用 YAML 格式在檔案開頭定義變數，底下是標準的 Markdown 內容。這塊由 `---` 包圍的區域可以存放任何結構化資料，可以把資訊或是變數放在這裡，之後可以用 `gray-matter` 套件將這些資料解析並提取出來。

```markdown
---
name: '王大明'
title: '資深前端工程師'
email: 'da-ming.wang@email.com'
phone: '+886 912 345 678'
linkedin: 'linkedin.com/in/da-ming-wang'
---

## 個人簡介

一個對技術充滿熱情的前端工程師，擁有超過五年以上的大型專案開發經驗...

## 工作經歷

### ABC 科技 (2020/01 - 至今)

**資深前端工程師**

- 負責開發與維護公司主要的電商平台，使用 React 與 TypeScript。
- 導入元件庫 Storybook，提升團隊協作效率 30%。
- ...

## 技能

- **程式語言:** JavaScript, TypeScript, Python
- **框架:** React, Vue.js, Node.js
- ...
```

1. **建立 EJS 模板 (`templates/resume.ejs`)**

跟寫 HTML 一樣寫模板。可以使用 `<%= variable %>` 來插入變數，`<%- content %>` 來插入 HTML 內容。樣式定義在 `style.css` , 檔案需要和 ejs template 放在一個層級。

```html
<!DOCTYPE html>
<html lang="zh-TW">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><%= name %> - 履歷</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <header>
      <h1><%= name %></h1>
      <h2><%= title %></h2>
      <div class="contact-info">
        <span><%= email %></span> | <span><%= phone %></span> |
        <span><%= linkedin %></span>
      </div>
    </header>
    <main><%- content %></main>
  </body>
</html>
```

1. 準備腳本 (`build.js`)

腳本會讀取 Markdown 內容，套用模板，最後生成 PDF.

![markdown-ejs-flowchart.png](/images/markdown-ejs-flowchart.png)

完整的 Code 在這裡:

注意：必須將 `templates/style.css` 複製到 `output` 資料夾中，這樣生成的 HTML 才能正確載入樣式，Puppeteer 生成的 PDF 才會有漂亮的排版。

1. 執行腳本

可以透過 `process.argv` 在 Node.js 腳本中取得執行指令時傳入的參數。`process.argv` 是一個陣列，第一個元素是 Node.js 的路徑，第二個是腳本路徑，後續的元素才是我們傳入的參數。

因此，我們可以這樣執行腳本，並在 `build.js` 中取得 `resume.md` 這個檔名：

```bash
# 直接用 node 執行，並傳入目標檔名
node build.js resume.md
```

如果想使用 `npm` / `pnpm` script，可以這樣設定 `package.json`：

```bash
"scripts": {
   "build": "node build.js"
}
```

執行時，參數要放在 `--` 後面：

```bash
# 執行建置命令，並傳遞 'resume.md' 作為參數
pnpm run build -- resume.md
```

## 範例

![sample-resume](/images/sample-resume.png)

## 小結

通過這個流程建立了一個小小的履歷自動化流程，只需要在 Markdown 中更新內容就可以獲得一個漂亮的履歷。這裡示範了一個簡單的例子，之後預計會加入更多的模板或是整合 CI/CD 當 Push 了最新版本的履歷時可以自動生成最新的 PDF 放在 Release 中。

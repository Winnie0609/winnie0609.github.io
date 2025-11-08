---
title: '初探前端 Bundler：原理、流程與 Vite/Webpack 速懂比較'
date: '2025-11-08'
slug: 'bundler-intro-vite-webpack'
description: '快速了解前端 Bundler 的誕生動機、基本運作流程，以及 Webpack 與 Vite 開發體驗的關鍵差異。'
tags: ['Bundler', 'Webpack', 'Vite']
---

現在的前端開發已經頗便利，無論是使用 React、Vue 還是其他的主流框架，只要一行命令 (如，`create vite`,`vue create`)就能快速建立新專案，幾乎不需要手動配置打包工具。對大多數專案來說 Bundler 工具似乎已經「自動搞定」，大概只有在開發 Library, NPM 套件或是特殊需求時才會碰到需要自己設定打包流程的情況。

不過無論平常有沒有在手動調整 build 設定，在面對新工具百花齊放的時代，大致了解 Bundler 背後的原理以及功能還是很重要的。

---

### 為什麼需要 Bundler

- 早期 HTTP/1.1 的限制: JS 檔案需要 sequential downloading（串行下載）
- 早期 JavaScript 沒有模組系統
- code splitting, tree shaking, minification 等

瀏覽器在解析 HTML 時遇到 `<script>` tag 會發起 HTTP request，下載 JS 檔案並執行。當一個 App 有很多 JS 檔案時，下載時間會變長。例如有 20 個 JS 檔案需要下載，但瀏覽器對同一個域名最多只能同時建立 6 個 TCP 連接（HTTP/1.1 限制），所以前 6 個同時下載，剩下 14 個排隊等待。這種 sequential downloading（串行下載）是導致載入變慢的主因，時間浪費在等待連接釋放。

```
<head>
  <script src="main.js"></script>
  <script src="first.js"></script>
  <script src="second.js"></script>
  <!-- 省略中間檔案 -->
  <script src="twentieth.js"></script>
</head>
```

補充：這是早期的問題，現在有 HTTP/2 可以多路復用，但 bundler 還有其他原因（code splitting, tree shaking, minification 等）

---

## Bundler 的功能

- 主要功能： 把多個 JS 檔案合併輸出成一個或少數幾個檔案，減少 HTTP 請求數量。
- 其他功能：
  - Tree Shaking：移除未使用的 code（例如只 import lodash 的一個函數，不會打包整個 lodash）
  - Code Splitting：將 bundle 拆分，實現按需載入（lazy loading）
  - 轉譯（Transpilation）：把 TypeScript、ES6+ 轉成瀏覽器支援的 JavaScript
  - 壓縮與混淆：減少檔案體積
  - 資源處理：處理 CSS、圖片、字型等非 JS 資源（可以 import CSS/圖片，bundler 會轉成 base64 或獨立檔案）
  - Source Map：方便除錯，對應打包後的 code 到原始碼

Bundler 的功能包含了減少 HTTP 請求數量、處理 Tree Shaking, Code Splitting 等。這篇不著墨在 bundler 的功能，所以只大略提及功能，不深入闡述。

---

## Bundler 是怎麼運作的

Bundler 的運作方式分成兩個階段：一、Dependency Resolution（依賴解析）；二、Bundling（打包）。

### Dependency Resolution（依賴解析）: 建立 dependency graph

Bundler 工具一般會先設定一個入口(如 `main.js`)，Bundler 會從入口檔案開始，用 parser (如 Babel parser、acorn、esbuild）把 code parse 成 AST (Abstract Syntax Tree)。接著遍歷 AST 找出所有 `ImportDeclaration` 或 `require()` 節點，遞迴處理每個 dependency, 建立 dependency graph.

```
// 找出`ImportDeclaration` 或 `require()`節點
// main.js
import { add } from './utils.js'; -> 相對路徑，到系統檔案找
import React from 'react'; -> 到 node_module 找

const result = add(1, 2);
```

這個 graph 記錄了所有模組之間的依賴關係，用於決定載入順序、避免命名衝突，以及實作 tree shaking.

```
// dependency graph 大概長這樣
{
  'main.js': {
    dependencies: ['./utils.js', 'react'],
    code: '...'
  },
  './utils.js': {
    dependencies: ['./helper.js'],
    code: '...'
  },
  'react': {
    dependencies: ['react-dom', 'scheduler'],
    code: '...'
  }
}
```

### Bundling（打包）

- 根據 dependency graph 決定模組載入順序
- 用函數包裹每個模組（建立作用域）
- 轉換 import/export 成瀏覽器可執行的 code
- 輸出單一或多個 bundle 檔案

根據 dependency graph 將每個模組包裹起來成為獨立的作用域，把 ES module 的語法(import/export) 轉換成瀏覽器可以執行的形式，最後注入一個 runtime（模組載入器），輸出可執行的 bundle(如 bundle.js)，瀏覽器會載入並執行這個檔案。

---

## HMR 機制

HMR(Hot module replacement) 是指改 code 時不刷新整頁，只替換改動的模組的機制，因為不刷新頁面所以狀態會被存下來。

HMR（Hot Module Replacement）機制現在幾乎是主流 Bundler 工具（如 Webpack、Vite、Parcel 等）的標準配備。以 Webpack 為例，它會盡量只熱更新被更動的模組，但如果改動影響到 module boundary 或全局狀態，有時還是會觸發整頁 reload。Vite、Parcel 等也會根據實際情境落在「熱更新」或「整頁刷新」之間。

- 原理：

```
改 code → 存檔 → 只更新改動的模組 → 保留頁面狀態
```

- 實際例子：

```
寫一個購物車，填了 10 個商品
改了按鈕顏色的 CSS
- 沒 HMR：整頁重載，10 個商品不見了
- 有 HMR：只更新 CSS，購物車內容還在
```

---

## Webpack & Vite 的比較

現在常見的打包工具有 Webpack、Parcel 等，這幾年 Vite 成為新的主流。Vite 的最大特點是在開發環境下，HMR 速度很快，整體開發體驗也很流暢。

在 Production build 階段，Vite 是用 Rollup 來進行打包，產出的速度和 Webpack 不相上下，但 Rollup 的 tree-shaking 更徹底，通常能產生體積更小、結構更乾淨的 bundle。

### Webpack 的開發環境：

- 啟動的時候會建立完整的 dependency graph
- 將整個專案打包到記憶體（webpack-dev-server），執行打包好的那個檔案 (如，`build.js`)
- 由於所有檔案都在記憶體準備好，code 變動時要重新解析、建 AST、產生 bundle，有時候會因依賴鏈長、編譯慢而延遲 HMR。

```
// Webpack 的處理流程
$ webpack-dev-server

[1/4] 🔍 Resolving modules...     (掃描所有檔案)
[2/4] 🏗️  Building dependency graph... (建立關係圖)
[3/4] 📦 Bundling...              (打包到記憶體)
[4/4] ✅ Ready in 8.3s

瀏覽器請求 main.js
→ 返回打包好的 bundle (從記憶體)
```

### Vite 的開發環境：開發時不打包（Bundleless Development）

- 啟動時不建立 dependency graph，直接啟動 server
- 利用瀏覽器原生的 ES Modules 支援（`<script type="module">`），直接執行需要的檔案
- 只有當檔案真被瀏覽器請求時才做轉譯，開發時無需「預先打包」整包專案
- 修改某個檔案時，只需重新編譯那個檔案，HMR 幾乎無感（除非 module boundary 被更動）。

```
// Vite 的處理流程
$ vite

✅ Ready in 289ms

瀏覽器請求 /main.js
→ Vite 讀取檔案
→ Parse main.js 成 AST
→ 找到 import { add } from './utils'
→ 轉換成 import { add } from './utils.js'
→ 找到 import React from 'react'
→ 轉換成 import React from '/@modules/react'
→ 回傳轉換後的檔案

瀏覽器請求 /utils.js
→ Vite 讀取檔案
→ Parse utils.js 成 AST
→ 轉換 import 路徑
→ 回傳

瀏覽器請求 /@modules/react
→ Vite 去 node_modules/react 找
→ Parse 成 AST（如果需要）
→ 回傳
```

|            | Webpack                      | Vite                   |
| ---------- | ---------------------------- | ---------------------- |
| 開發環境   | 打包到記憶體（bundle         | 不打包（bundleless）   |
| 啟動速度   | 慢（要先打包                 | 快（不打包）           |
| HMR 速度   | 較慢（要重新 bundle 改動部分 | 超快（只處理單一檔案） |
| 瀏覽器載入 | 載入 bundle.js               | 載入原始 ES Modules    |
| 生產環境   | 打包（Webpack）              | 打包（Rollup）         |

## 現代還需要 bundler 嗎？

雖然 HTTP/2/3 與 ES Modules 支援已經降低了打包的必要性，小型專案可以不用 Bundler 直接用原生 ES Modules 部署。但大部份大型專案依然強烈依賴 Bundler 的進階功能，如跨瀏覽器支援（Babel）、Polyfill 注入、資源 hash、長期快取（cache busting），還有 SSR（Server Side Rendering）等複雜場景。

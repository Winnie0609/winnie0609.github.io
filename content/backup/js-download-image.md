---
title: '在網頁上設置下載按鈕'
date: '2021-10-14'
slug: 'js-download-image'
description: '本篇介紹了如何在網頁上設置下載按鈕：使用 HTML <a> download Attribute,通過 blob 下載圖片以及通過 blob 下載 txt 檔案。'
tags: ['javascript']
---

## 本篇大綱

1. 簡介
2. 使用 HTML`<a>`download Attribute
3. 通過 blob 下載圖片
4. 通過 blob 下載 txt 檔案

## 簡介

稍微記錄如何在網頁上設置下載按鈕。第一個方式為使用 HTML`<a>`tag 原先提供的 download 屬性，但它有其限制性。另一個方法則為通過 blob 物件讓使用者能夠直接儲存檔案。

Codepen Live Demo: [Download file buttons](https://codepen.io/huiniong/pen/rNzxoZq)

## 作法

### 作法 1：使用 HTML`<a>`download attribute

```javascript
<a
  href="https://i.imgflip.com/5qptjs.jpg"
  download="meme-filename"
  target="_blank"
>
  Download
</a>
```

這裡以圖片下載為例。使用`<a>`的 download attribute 直接下載是最方便的方式。某些情況下，需要提供使用者下載的不是已經存在的檔案，而是一個連結，使用`<a>`tag 會出現這個狀況：`<a>`tag 在被點擊後，瀏覽器會打開檔案，使用者需要手動儲存檔案。

---

### 作法 2：通過 blob 的方式直接儲存圖片

可以通過操作 blob 物件來達到按鈕在被點擊後，儲存檔案的框框跳出，讓使用者直接儲存檔案的效果。

```javascript
<button class="image-blob-button">Download</button>
```

首先 fetch 需要下載的 URL 獲得 blob, 接著使用 URL.createObjectURL 來創建 objectURL. 這時候回傳的結果會是：

```javascript
'blob:https://cdpn.io/211925a7-4b2e-42a7-b2f0-6fc043dc7bbe';
```

接著創造`<a>`tag, 其下載連結為剛剛創造出來的 objectURL. 檔名可以使用 `.download` 來設定。接下來將創造好的連結塞到 body 內，再觸發它就可以達到想要的效果了。

```javascript
const imageBlobButton = document.querySelector('.image-blob-button');
imageBlobButton.addEventListener('click', downloadImage);

async function downloadImage() {
  // fetch the image blob
  const url = 'https://i.imgflip.com/5qptjs.jpg';
  const response = await fetch(url);
  const blob = await response.blob();

  // create an objectURL
  const blobURL = URL.createObjectURL(blob);

  // set <a> tag's href to blob url
  const link = document.createElement('a');
  link.href = blobURL;
  link.download = 'meme';

  // Append link and trigger the download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
```

---

### 作法 3：下載 text file

如果要下載 txt 檔案，或是將特定的字串轉換成 txt 檔案下載，使用的方法與剛才提到的方式類似。這裡下載不是 url 而是一個字串 / 檔案，因此要先創造一個新的 blob 物件，其餘包括取得 objectURL 的方式和觸發點擊的寫法則與 url 的相同。

```javascript
const context = "helllo, let's download some text!";
const txtBlobButton = document.querySelector('.txt-blob-button');
txtBlobButton.addEventListener('click', downloadTxt);

function downloadTxt() {
  // first argument should be array
  blob = new Blob([context], { type: 'text/plain' });
  let blobUrl = URL.createObjectURL(blob);
  let link = document.createElement('a');

  link.href = blobUrl;
  link.download = 'text';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
```

---

## 實際使用案例

之前在實習專案開發中遇到需要設置下載按鈕的功能，找到了這個解法，又想起之前做過的迷因小作品能夠用上，所以就把他加進去啦。迷因在製作好後，會回傳該迷因的鏈接，因此就可以通過 blob 的方式來讓用戶下載圖片。

順道一提，這是剛剛開始學 React 時候寫的小東西，半年後再看回覺得真的是有很大很大很大的進步空間啊。

Github repo: [Winnie0609/meme-generator](https://github.com/Winnie0609/meme-generator)
Live Demo: [Mene Generator](https://winnie0609.github.io/meme-generator/)

---

## 參考資料

1.  [Downloading images in the browser with Node.js](https://dev.to/eckhardtd/downloading-images-in-the-browser-with-node-js-4f0h)
2.  [Blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)
3.  [W3 school HTML`<a>`download Attribute](https://www.w3schools.com/tags/att_a_download.asp)
4.  [Blob-对象介绍](https://zhuanlan.zhihu.com/p/161000123)

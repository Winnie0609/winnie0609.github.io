---
title: 'React Meme Generator 實作'
date: '2021-04-15'
slug: 'react-meme-generator'
description: 'Meme Generator 提供用戶製作迷因圖。使用串接 API 的方式將迷因圖呈現在畫面上，輸入文字後便可以下載該迷因圖。'
tags: ['react', 'javascript']
---

[Github](https://github.com/Winnie0609/meme-generator)  
[Live Demo](https://winnie0609.github.io/meme-generator/)

[![Meme Generator Demo](https://i.imgur.com/OixZDnw.gif)](https://i.imgur.com/OixZDnw.gif)

## 簡介

Meme Generator 提供用戶製作迷因圖。使用串接 API 的方式將迷因圖呈現在畫面上，輸入文字後便可以下載該迷因圖。

## 功能

- 提供用戶挑選迷因模板
- 提供用戶輸入文字
- 提供圖片下載

## 前置作業

1.  先看 meme api 所提供的文件
2.  申請此網站的賬號（之後在處理 caption 環節時候會用到）
3.  把 username 和 password 存在 env file

```js
// .env
// 前綴要加上 REACT\_APP 不然無法直接引用
// 不需要額外安裝其他的套件

REACT_APP_IMGFLIP_USERNAME = 用戶名;
REACT_APP_IMGFLIP_PASSWORD = 密碼;
```

## 步驟

### fetch API

[https://api.imgflip.com/get_memes](https://api.imgflip.com/get_memes)  
抓取到的資料共有 100 筆，資料如照片所示。

```js
//filename : App.js
const [templates, setTemplates] = useState([]);

useEffect(
  fetch('https://api.imgflip.com/get_memes')
    .then((res) => res.json())
    .then((json) => setTemplates(json.data.memes)),
  []
);
```

[![](https://i.imgur.com/xa7u0Xa.png)](https://i.imgur.com/xa7u0Xa.png)

把抓取到的資料呈現到畫面上。

```js
// App.js
return (
  <div>
    {templates.map((template) => {
      return (
        <img
          style={{ width: '200px' }}
          key={template.id}
          src={template.url}
          alt={template.name}
        />
      );
    })}
  </div>
);
```

[![](https://i.imgur.com/aRyql7i.jpg)](https://i.imgur.com/aRyql7i.jpg)

### 點擊模板，進入該模板進行編輯

點擊模板的動作可以使用 state 來處理。設置 template state，預設為 null，點擊後更新為該 template. 當 template 為 null 時，顯示所有模板；template 被更新後就顯示被點擊的模板以及供用戶輸入的框框。因為兩個地方都會用到模板，因此把模板拆成獨立的 component。

```js
const [template, setTemplate] = useState(null);
//設定template的初始值為null

return (
  <div>
    //如果點擊了圖片的情況
    {template && <Meme template={template} />}
    //如果沒有點擊圖片的情況
    {!template &&
      templates.map((template) => {
        return (
          <Meme template={template} onClick={() => setTemplate(template)} />
        );
      })}
  </div>
);
```

```js
// meme.js

import React from 'react';

function Meme({ template, onClick }) {
  return <img src={template.url} alt={template.name} onClick={onClick} />;
}

export default Meme;
```

[![](https://i.imgur.com/nOkeqfK.gif)](https://i.imgur.com/nOkeqfK.gif)

### 製作讓用戶輸入的框框

使用 form 製作框框分別為 top text 以及 buttom text. 在 return 中，照片的位置下加入 form，form 內包含 2 個 input。另外加入 submit button 做提交資料用。

```js
{
  template && (
    <form
      onSubmit={(e) => {
        e.prevertDefault();
      }}
    >
      <Meme template={template} /> //圖片顯示
      <input placeholder="top text" />
      <input placeholder="buttom text" />
      <button type="submit"> Generate </button>
    </form>
  );
}
```

### 通過 API 將用戶的資料放到照片上

- 抓取用戶輸入的資料
- 設定點擊 submit button 後會執行的動作
- 使用 imgflip 網站提供的 image caption url 獲取已完成的迷因圖
- 如果成功獲取已經完成的迷因圖就顯示該圖片

#### 抓取用戶輸入的資料

用戶需要輸入的框框有兩個，分別為 top text 和 bottom text，都使用 state 來更新他們的 value.

```js
// App.js

const [topText, setTopText] = useState("")
const [bottomText, setBottomText] = useState("")

<input
  placeholder = "top text"
  value = {topText}
  onChange={(e) => setTopText(e.target.value)}
/>
```

[![](https://i.imgur.com/gKqMmkh.png)](https://i.imgur.com/gKqMmkh.png)

#### 設定點擊 submit button 後會執行的動作

點擊 submit 之後，會去 fetch 設定到的 url 格式，這裡使用 async await 來處理。設定 url 的格式：需要 template_id, text0, text1, 用戶名, password.

[![](https://i.imgur.com/mWGDJl0.png)](https://i.imgur.com/mWGDJl0.png)  
[![](https://i.imgur.com/RcQb6Un.png)](https://i.imgur.com/RcQb6Un.png)

url 需要的參數通過 `objectToQueryParams` 傳入. 成功獲取資料後 json 回傳的是一個有已經完成的迷因圖的 url」 和是否成功的提示。將這個 url 存在 meme status 中。

```js
//App.js

//引入存在 env file 的資訊
const username = process.env.REACT_APP_IMGFLIP_USERNAME;
const password = process.env.REACT_APP_IMGFLIP_PASSWORD;

//設定 url 格式
const objectToQueryParam = (obj) => {
  const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
  return '?' + params.join('&');
};

<form
  onSubmit={async (e) => {
    e.preventDefault();

    const params = {
      template_id: template.id,
      text0: topText,
      text1: bottomText,
      username: username,
      password: password,
    };

    const response = await fetch(
      `https://api.imgflip.com/caption\_image${objectToQueryParam(params)}`
    );
    const json = await response.json();
    setMeme(json.data.url);
  }}
/>;
```

#### 顯示已經完成的迷因圖

將這個 url 存在 meme status 中，如果 meme 有資料，則顯示那張已經完成的迷因圖。

```js
//App.js

if (meme) {
  return (
    <div>
      <h2>Feel free to download your meme.</h2>
      <img src={meme} alt="custom meme" />
    </div>
  );
}
```

[![](https://i.imgur.com/r2J4zae.png)](https://i.imgur.com/r2J4zae.png)

## 小結

上面的解說都只截取了部分的程式碼，看起來會有一些亂，文末附了完整的程式碼，參照著看會比較清楚。這是一個功能比較單一的迷因產生器，目前只能製作只需要輸入兩段文字的迷因，需要超過兩段文字的迷因圖，文字位置會措置，這個之後再回來修嘿。

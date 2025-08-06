---
title: '【實作記錄】玻璃擬態登入頁面'
date: '2021-03-03'
slug: 'glassmorphism'
description: '玻璃擬態 (Glassmorphism) 畫面實作，現代化UI設計趨勢'
tags: ['css']
---

[live Demo](https://winnie0609.github.io/glassmorphism-login-page/login.html)  
[Github](https://github.com/Winnie0609/glassmorphism-login-page)  
[Code Pen](https://codepen.io/huiniong/full/mdOKYyG)

[![Login Page Demo](https://i.imgur.com/0GnjbUc.gif)](https://i.imgur.com/0GnjbUc.gif)

## 簡介

這是接觸網頁前端三巨頭時練習的第一個小作品。尚未學習 RWD 之觀念，因此畫面在手機觀看會爆掉 QAQ。頁面呈現玻璃擬態(Glassmorphism) 效果。

## 功能

- CSS: 用戶輸入的部分設置了 Placeholder
- CSS: 每一個預設可以點擊之按鈕都設置了 hover 效果
- JS: 用戶點擊 Sign in 按鈕後，先前輸入的資料會淨空
- JS: 設置了用戶輸入提醒，若缺少用戶名/密碼將會跳出警告
- JS: 用戶名與密碼藉有輸入將會跳出 "username, Welcome!" 之字樣

## 小筆記

記錄一些 CSS 小筆記，作往後回顧之用。

### Glassmorphism 效果

```js
.loginSec{
    padding: 42px 22px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.10);
    border: 1px solid rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    box-shadow:
    0 0.9px 8.5px -9px rgba(0, 0, 0, 0.041),
    0 2.4px 23.5px -9px rgba(0, 0, 0, 0.069),
    0 5.7px 56.7px -9px rgba(0, 0, 0, 0.098),
    0 19px 188px -9px rgba(0, 0, 0, 0.16)
    ;
}
```

### Hover 底線效果

```js
#forgetBtn::after{
    content: '';
    display: block;
    border-bottom: solid 1.3px #ffffff;
    height: 1.3px;
    transform: scaleX(0);
    transform-origin: 0% 100%;
    transition: transform .3s;
}

#forgetBtn:hover:after{
    transform: scaleX(1);
    transition: transform .3s;
}
```

### 背景圖縮放不影響比例

```js
body{
    background-image: url("https://i.postimg.cc/3rv5HhSL/login-page-background.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    background-attachment: fixed;
}
```

## 小結

這個畫面可以改進的地方有很多，由於是第一次練習，因此沒有特別修改，想留下一些~~黑歷史~~記錄。

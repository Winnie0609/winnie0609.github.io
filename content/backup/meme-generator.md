---
title: '【實作記錄】Joke Generator App'
date: '2021-04-02'
slug: 'meme-generator'
description: '這是為了練習串接 API 所設計的小遊戲，使用原生 JS 製作，界面模擬聊天機器人跟使用者互動。'
tags: ['javascript']
---

[Live Demo](https://winnie0609.github.io/joke-generator/joke.html)  
[Github](https://github.com/Winnie0609/joke-generator)  
[CodePen](https://codepen.io/huiniong/full/jOyBgXw)

[![Joke Generator Demo](https://i.imgur.com/NMfSYoI.gif)](https://i.imgur.com/NMfSYoI.gif)

## 簡介

這是為了練習串接 API 所設計的小遊戲，使用原生 JS 製作，界面模擬聊天機器人跟使用者互動。由於沒有設計真的的聊天機器人，所以使用了看起來笨笨的方法（延遲執行的方法）來操作。

## 功能

- 第一個聊天室可以進入
- 點擊 “ Tell me a Joke “ 就會出現笑話
- 提供簡單回復按鈕：Tell me the answer、LOL😂
- 暫時僅適用於 Android 和桌面用戶

## 小筆記

- API: [https://official-joke-api.appspot.com/jokes/programming/random](https://official-joke-api.appspot.com/jokes/programming/random)
- 使用 async/ await 的方式 fetch API
- 使用 setTimeOut， 讓用戶在點擊按鈕 1 秒後才出現結果

## 小結

簡單的練習 fetch API，並沒有什麼太大的問題，反而在刻畫面上有比較大的問題，使用 Apple Device 瀏覽畫面就會直接爆掉。

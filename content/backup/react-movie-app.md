---
title: 'React Movie App 實作'
date: '2021-04-17'
slug: 'react-movie-app'
description: '使用 React 實作 Movie App. 這裡練習了如何使用 TMDB 提供的 API 來獲取需要的資料、使用 useState 以及 useEffect 來更新資料、拆分 component、使用 styled component 的方法。'
tags: ['react', 'javascript',]
---

[Github](https://github.com/Winnie0609/movie-app)  
[Live Demo](https://winnie0609.github.io/movie-app/)

[![Search Movie App Demo](https://i.imgur.com/3nQ48gx.gif)](https://i.imgur.com/3nQ48gx.gif)

## 簡介

這個為了練習使用 React 的邏輯以及編寫方式所刻的 Movie App。這裡練習了如何使用 TMDB 提供的 API 來獲取需要的資料、使用 useState 以及 useEffect 來更新資料、拆分 component、使用 styled component 的方法。下面記錄了搜尋頁面 fetch API 的詳細步驟，其他頁面則只是記錄重點功能。參考資料附在文末。

另外，因為專案一直在添加新的功能，因此檔案名字以及 Code 都會有調整，並不完全跟筆記的一樣。

## 功能

- 首頁有即將上映之電影 & 熱門電影/電視劇 (可通過點擊按鈕切換)
- 電影的呈現方式使用橫軸的滾動條
- 電影頁則是以卡片的形式呈現，點擊卡片會出現電影資訊
- 彈出的 Modal 內含有電影預告的網址，導致外部鏈接
- 搜尋到的電影可以加入 favourite list 裡，同時也會加到 local storage 裡
- 已經儲存的電影可點擊菜單列的愛心查看
- 無法顯示的照片使用默認照片顯示

## 前置作業

- 需要使用的 API : [The Movie Database API](https://www.themoviedb.org/)
- 先到 TMDB 網站申請賬號，再根據 [官方文件](https://developers.themoviedb.org/3/getting-started/introduction) 申請網站的 API key .文件上都有清楚的申請步驟，申請成功後，把 key 以及 Access Token 保存下來。
- Modal 以及 Pagination 使用 meterial ui

```bash
$ npm install @material-ui/lab
```
---
title: '【實作記錄】The Dice Game'
date: '2021-03-12'
slug: 'dice-game'
description: '這是使用純 JS 寫的小小擲骰子遊戲，主要用來練習使用 JS 操控 DOM.'
tags: ['javascript', 'game', 'dom', 'project']
---

[live Demo](https://winnie0609.github.io/dice-game/dice.html)  
[Github](https://github.com/Winnie0609/dice-game)

[![Login Page Demo](https://i.imgur.com/0HcsX0Q.gif)](https://i.imgur.com/0HcsX0Q.gif)

## 簡介

這是使用純 JS 寫的小小擲骰子遊戲，主要用來練習使用 JS 操控 DOM.

## 功能

- 點擊按鈕擲骰子，點數直接加到分數板，贏家為先獲得 20 分的隊伍
- 兩隊玩家各有兩個角色可以選擇
- 玩家可以輸入名字
- 輪到藍隊玩家時，其角色會出現藍色框框；粉隊玩家則為粉色框框
- 點數更換成骰子的 icon

## 小筆記

- 圖片重疊: 使用 position:absolute 進行定位
- inner.HTML: 可以直接加入 html tag

```js
characterPlayer1_first.addEventListener('click', function () {
  document.querySelector('.border1').innerHTML =
    '<img class="img1" src="./img/robot-1.png" alt="player one">';
});
```

# 小結

這不是一個複雜的遊戲，基本擲骰子積計分的功能蠻快就做出來了。反而花最多時間的地方在玩家回合的粉色和藍色框框，原本框框設置成照片的 border, 但在換角色時候，框框就無法顯示。最後才想到把框框獨立出來就好了(༎ຶ⌑༎ຶ) 其他部分則沒有遇到太大的問題。之後有機會要再改良的話，應該會從兩隊勝率不均這個部分下手。

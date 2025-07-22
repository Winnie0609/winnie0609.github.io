---
title: '【實作記錄】Snake Game'
date: '2021-03-15'
slug: 'snake-game'
description: '這是一款復古風的貪吃蛇遊戲。點擊開始，蛇便會開始往前移動，通過鍵盤上下左右鍵操控蛇的方向。蛇往前的邏輯是碰到果實，碰到的格子會移除、蛇的最後會增加一格。'
tags: ['javascript', 'game', 'project']
---

[Live Demo](https://winnie0609.github.io/snake-game/5nack.html)  
[Github](https://github.com/Winnie0609/snake-game)  
[CodePen](https://codepen.io/huiniong/full/gOgOEgB)

[![Snake Game Demo](https://i.imgur.com/Yu06HZw.gif)](https://i.imgur.com/Yu06HZw.gif)

## 簡介

這是一款復古風的貪吃蛇遊戲。點擊開始`ᐅ`，蛇便會開始往前移動，通過鍵盤上下左右鍵操控蛇的方向。蛇往前的邏輯是碰到果實，碰到的格子會移除、蛇的最後會增加一格。果實和障礙物則隨機產生。在碰到障礙物、墻壁以及自己的身體時，遊戲便會結束，同時顯示蛇身長度以及分數。點擊`restart`可以重啟遊戲。

## 功能

- 隨機產生果實(藍色)與障礙物(block)
- 可通過 WASD 鍵 / ↑ ↓ ← → 鍵移動蛇
- 蛇的長度會隨著吃的果實而增加
- 吃的果實越多，移動速度就越快
- 碰到障礙物、墻壁、自己遊戲便會結束
- 提供建議遊戲規則
- 吃果實、碰到障礙物有音效
- 音效可以透過 “Volume icon” 關閉
- 遊戲結束後會顯示分數以及蛇的長度

## 小筆記

### 增加音效的方法

- [Audio for Web games](https://developer.mozilla.org/en-US/docs/Games/Techniques/Audio_for_Web_Games)

```js
var myAudio = document.createElement('audio');
myAudio.src = 'mysprite.mp3';
myAudio.play();
myAudio.pause();
```

### 使用鍵盤操控

```js
document.addEventListener('keyup', control);

function control(e) {
  if (e.keyCode === 39 || e.keyCode === 68) {
    console.log('right pressed');
    direction = 1;
  } else if (e.keyCode === 38 || e.keyCode === 87) {
    console.log('up pressed');
    direction = -width;
  } else if (e.keyCode === 37 || e.keyCode === 65) {
    console.log('left pressed');
    direction = -1;
  } else if (e.keyCode === 40 || e.keyCode === 83) {
    console.log('down pressed');
    direction = +width;
  }
}
```

## 小結

這是為了練習 JS 邏輯而製作的一款小遊戲。之後會想要增加遊戲難度或是關卡、果實和障礙物出現的位置、蛇移動的靈活度也可以再調整。

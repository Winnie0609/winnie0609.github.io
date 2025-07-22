---
title: '【實作記錄】Pacman Game'
date: '2021-03-26'
slug: 'pacman-game'
description: '這是一款使用 JavaScript 製作的小精靈遊戲。玩家將所有點點吃完便會獲勝、被精靈吃掉遊戲便結束。點點分數為 1 分、大點點 (power pallet) 為 10 分、吃掉害怕狀態的精靈增加 100 分。'
tags: ['javascript', 'game', 'project']
---

[Live Demo](https://winnie0609.github.io/pacman-game/pacman.html)  
[Github](https://github.com/Winnie0609/pacman-game)  
[CodePen](https://codepen.io/huiniong/full/VwpvyVv)

[![Pacman Game](https://i.imgur.com/aUPLfkR.gif)](https://i.imgur.com/aUPLfkR.gif)

## 簡介

這是一款使用 JavaScript 製作的小精靈遊戲。玩家將所有點點吃完便會獲勝、被精靈吃掉遊戲便結束。點點分數為 1 分、大點點 (power pallet) 為 10 分、吃掉害怕狀態的精靈增加 100 分。其中也添加了音效，默認為關閉，可點擊右上的 "volume icon" 打開。

## 功能

- 使用上下左右鍵移動 Pacman
- 吃了 Power Pallet 便可以吃掉顏色為橘色的精靈
- 每個動作都有音效，可以透過右上的 “volume icon” 關閉
- 吃完點點便會宣佈獲勝
- 被精靈吃掉，遊戲便結束

## 小筆記

### Pacman 的移動

Pacman 的上下移動邏輯使用 switch 處理。判斷 pacman 在移動的時候是否碰到墻壁，若沒有碰到墻壁/沒有碰到精靈則可以往按鍵的方向行動。

- 判斷是否碰到墻壁：如果要往下的那個沒有 “wall” 這個 class ，表示沒有
- 判斷是否碰到精靈：如果要往下的那個沒有 “ghost” 這個 class ，表示沒有

| keycode |        |                  移動方式 |                                                                                                判斷方式 |
| :------ | :----: | ------------------------: | ------------------------------------------------------------------------------------------------------: |
| 40      | 往下鍵 | pacman 所在的位置 + width | 判斷是否已經到最底層：如果 pacman 所在 index 加上 width 小於整個 layout 的最大 index， 表示沒有超出邊界 |
| 38      | 往上鍵 | pacman 所在的位置 - width |                   判斷是否已經到最上層：如果 pacman 所在 index 減掉 width 小於整個 0， 表示沒有超出邊界 |
| 37      | 往左鍵 |      pacman 所在的位置 -1 |                 判斷是否已經到最左邊：如果 pacman 所在 index 除 width 的餘數不等於 0， 表示沒有超出邊界 |
| 38      | 往右鍵 |      pacman 所在的位置 +1 |           判斷是否已經到最左邊：如果 pacman 所在 index 除 width 的餘數小於 width - 1， 表示沒有超出邊界 |

```js
switch(e.keyCode) {
  case 40 :
    console.log("pressed down")
    if (
        pacmanCurrentIndex + width < width \* width &&
        !squares\[pacmanCurrentIndex + width\].classList.contains("wall")&&
        !squares\[pacmanCurrentIndex + width\].classList.contains("ghost-liar")
    )
    pacmanCurrentIndex += width

  break
}
```

### 精靈的 class

由於 4 個精靈是一組的，都有 className 、起始位置、移動速度、當下位置、是否為害怕狀態、計時器，因此使用 class 來處理。需要每一隻精靈執行共同的程式碼就使用 for Each.

```js
class Ghost {
  constructor(className, startIndex, speed) {
    this.className = className;
    this.startIndex = startIndex;
    this.speed = speed;
    this.currentIndex = startIndex;
    this.isScared = false;
    this.timerId = NaN;
  }
}

//傳入需要的參數：classname, 起始位置，速度
const ghosts = [
  new Ghost('blinky', 347, 250),
  new Ghost('pinky', 376, 400),
  new Ghost('inky', 352, 300),
  new Ghost('clyde', 379, 500),
];
```

- 把精靈畫進 grid 裡

```js
ghosts.forEach((ghost) => {
  squares[ghost.currentIndex].classList.add(ghost.className);
  squares[ghost.currentIndex].classList.add('ghost');
});
```

### 精靈移動

- 使用 `Math.random()`` 決定精靈移動的方向，因此方向是沒有邏輯的

```js
const directions = [-1, +1, -width, +width];
let direction = directions[Math.floor(Math.random() * directions.length)];
```

- 沒有碰到碰到精靈或墻壁，就可以往隨機選出來的方向前進一格

```js
 if (
     !squares\[ghost.currentIndex + direction\].classList.contains("wall")  &&
     !squares\[ghost.currentIndex + direction\].classList.contains("ghost")
 ){
     squares\[ghost.currentIndex\].classList.remove(ghost.className)
     squares\[ghost.currentIndex\].classList.remove("ghost", "scared-ghost")
     ghost.currentIndex += direction

     squares\[ghost.currentIndex\].classList.add(ghost.className)
     squares\[ghost.currentIndex\].classList.add("ghost")
 }
```

- 在吃了 power pallet 之後，精靈會轉為 scared 狀態，就可以被吃
- this.isScared = true
- 會轉為橘色

```js
if (
    ghost.isScared && squares\[ghost.currentIndex\].classList.contains("pacman")
  ){
    squares\[ghost.currentIndex\].classList.remove(ghost.className,"scared-ghost")
    ghost.currentIndex = ghost.startIndex
    score += 100
    squares\[ghost.currentIndex\].classList.add(ghost.className , "ghost")
    eatGhostSound()
  }
```

- 遊戲結束
- 碰到精靈遊戲便會結束
- 計時器會被清除，按鍵被移除，game over 字樣出現

```js
if (
    !ghost.isScared && squares\[ghost.currentIndex\].classList.contains("pacman")
){
    ghosts.forEach(ghost => clearInterval(ghost.timerId))
    document.removeEventListener("keydown", control)
    gameOver.style.display = "block"
    overlay.style.display="block"
    deathSound()
}
```

### 玩家贏了

- 吃完所有點點就宣佈獲勝

```js
let dot = 305;

function win() {
  if (dot === 0) {
    ghosts.forEach((ghost) => clearInterval(ghost.timerId));
    document.removeEventListener('keydown', control);
    gameWin.style.display = 'block';
    overlay.style.display = 'block';
    winSound();
  }
}
```

## 小結

這個小遊戲中練習了 class 以及 switch. 這裡沒有處理精靈移動的邏輯，原本應該追著 / 包抄 pacman， 但因為是使用隨機方向，因此精靈們看起來很笨（扶額）。這個部分等我找到比較好的方式再來看看怎麼讓他們聰明一些。畫地圖是使用 excel 先畫一遍，再把他們轉為 index，才填上顏色。

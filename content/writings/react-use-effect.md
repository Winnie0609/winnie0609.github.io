---
title: 'React 的 useEffect 使用範例'
date: '2021-04-10'
slug: 'react-use-effect'
description: 'React Hook useEffect 的基本使用方法與實際範例，包含副作用處理和清理函數'
tags: ['react', 'hooks', 'javascript']
---

此篇文章為看過 Scrimba 線上課程（[The Frontend Developer Career Path](https://scrimba.com/learn/frontend)）之教學影片後的筆記整理，內容與例子大多出自該教學影片。

## useEffect 小栗子

- 可運作 side effect（可以影響其他 component 且在 render 期間無法完成的），如 fetch 資料、訂閱、或手動改變 DOM。
- useEffect 包含了 componentDidMount ，componentDidUpdate ，以及 componentWillUnmount 的功能
- **每一次 render 都會執行 useEffect，因此要設定在某個條件下才會觸發這個 function**
- 計數器例子

```js
//引入useEffect
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // 與 componentDidMount 和 componentDidUpdate 類似：
  useEffect(() => {
    // 使用瀏覽器 API 更新文件標題
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default Example;
```

- 計數器+random color 例子

```js
import React, { useState, useEffect } from 'react';
import randomcolor from 'randomcolor';
//引入了別的 library

function App() {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState('');

  function increment() {
    setCount((prevCount) => prevCount + 1);
  }

  function decrement() {
    setCount((prevCount) => prevCount - 1);
  }

  useEffect(() => {
    setColor(randomcolor());
  }, [count]); //執行條件設為當count改變時

  return (
    <div>
      <h1 style={{ color: color }}>{count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}

export default App;
```

### 注意

- 因為每一次重新 render，都會重新呼叫 useEffect 這個 function，所以要設定條件。

```js
//這樣寫會導致這個function一直被呼叫
useEffect(() => {
  setColor(randomcolor());
});
```

#### 非預期效果

[![](https://i.imgur.com/25DwJYu.png)](https://i.imgur.com/25DwJYu.png)  
[![](https://i.imgur.com/WeOqBBY.gif)](https://i.imgur.com/WeOqBBY.gif)

#### 預期效果

[![](https://i.imgur.com/IJGwabu.gif)](https://i.imgur.com/IJGwabu.gif)

## 清除 effect

- 這裡指的 effect 就是我們傳進 useEffect 的 fucntion
- 每個 effect 都可以回傳一個會在它之後執行清除的 function
- 一個在執行之後需要清除的 function，可以在新增 function 後回傳一個需要清除的 function
- 其他不需要清除的就不需要回傳

```js
useEffect(() => {
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
});
```

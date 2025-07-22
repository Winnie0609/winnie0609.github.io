---
title: 'React 的 useState 使用範例'
date: '2021-04-10'
slug: 'react-use-state'
description: 'React Hook useState 的基本使用方法與實際範例'
tags: ['react', 'hooks', 'javascript']
---

此篇文章為看過 Scrimba 線上課程 （[The Frontend Developer Career Path](https://scrimba.com/learn/frontend)） 之教學影片後的筆記整理，內容與例子大多出自該教學影片。

## Function Component

- function component 長這樣

```js
//function component
import React from 'react';

function App() {
  return (
    <div>
      <h1>Is state important to know? Yes</h1>
    </div>
  );
}
```

```js
//例子
import React, { useState } from 'react'; //引入 useState

function App() {
  //這裡的 state 不一定要是 object
  const [answer] = useState('Yes');
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]); //這裡可以宣告多個變數

  return (
    <div>
      <h1>Is state important to know? {answer}</h1>
    </div>
  );
}
```

## 宣告一個 state 變數

```js
const [目前 state 數值, function] = useState(initial value)
```

- useState 回傳一組數值：**目前** state 數值和一個可以讓你更新 state 的 function
- 與 class component 不同，state 不一定要是 object
- 與 class component `this.state({name: value, name: value})` 相似，它可以宣告多個變數
- 計數器例子

```js
import React, { useState } from 'react';

function Example() {
  // 宣告一個新的 state 變數，稱為「count」
  const [count, setCount] = useState(0); //不一定要是 object
}
```

- useState 宣告了一個變數，這個變數會被保存起來
- 傳入 useState 的是這個變數的起始值，這個起始值可以不需要是 object，這裡因為計數器需要所以傳入 num
- 起始值只在第一次 render 的時候會使用到

## 讀取 State

- 與 class component 讀取 state 的方式不同 `<p> {this.state.count} </p>` ，function component 可以直接讀取變數`{count}`

```js
<h1> {count} </h1>
```

## 更新 state

- 可以直接用 setCount 和 count 直接更新

```js
<button onClick={() => setCount(count + 1)}>Click me</button>
```

## 總結

- 第 1 行: 引入 useState
- 第 5 行: 在 App component 裡，呼叫 useState Hook 宣告了一個新的 state 變數，成為 count ( 作計數用 )。將起始值設為 0 並傳入 useState 當作唯一參數。第二個回傳的值是個可以更新 count 的 function，命名為 setCount。
- 第 18 , 19 行：當使用者點擊，就呼叫 increment/ decrement function , setCount 更新 count 的值。

```js
import React, { useState } from 'react';

function App() {
  // 宣告一個新的 state 變數，稱為 count
  const [count, setCount] = useState(0);

  function increment() {
    setCount((prevCount) => prevCount + 1);
  }

  function decrement() {
    setCount((prevCount) => prevCount - 1);
  }

  return (
    <div>
      <h1> {count} </h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}
```

[![](https://i.imgur.com/TLmnAjW.gif)](https://i.imgur.com/TLmnAjW.gif)

## 綜合例子

```js
import React, { useState } from 'react';

function App() {
  const [inputData, setInputData] = useState({ firstName: '', lastName: '' });
  const [contactsData, setContactsData] = useState([]);

  function handleChange(event) {
    const { name, value } = event.target;
    setInputData((prevInputData) => ({ ...prevInputData, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setContactsData((prevContacts) => [...prevContacts, inputData]);
  }

  const contacts = contactsData.map((contact) => (
    <h2 key={contact.firstName + contact.lastName}>
      {contact.firstName} {contact.lastName}
    </h2>
  ));

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="First Name"
          name="firstName"
          value={inputData.firstName}
          onChange={handleChange}
        />
        <input
          placeholder="Last Name"
          name="lastName"
          value={inputData.lastName}
          onChange={handleChange}
        />
        <br />
        <button>Add contact</button>
      </form>
      {contacts}
    </>
  );
}

export default App;
```

[![](https://i.imgur.com/MmUffEY.gif)](https://i.imgur.com/MmUffEY.gif)

## 參考資料

1.  [使用 State Hook](https://zh-hant.reactjs.org/docs/hooks-state.html)
2.  [【React.js 入門 - 20】 useEffect - 在 function component 用生命週期](https://ithelp.ithome.com.tw/articles/10223344)

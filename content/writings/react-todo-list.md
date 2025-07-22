---
title: 'React todo list 實作'
date: '2021-04-13'
slug: 'react-todo-list'
description: '這是一個有基本功能的 todo list 練習，為了練習語法以及邏輯，所以參考了教學影片，文末附上教學影片之連結。這裡練習了各個 Component 之間的傳遞、React Hook 也認識了之前沒有用過的幾個 CSS 小方法。'
tags: ['react', 'javascript', 'tutorial']
---

[Live Demo](https://winnie0609.github.io/todo-app/)  
[Github](https://github.com/Winnie0609/todo-app)
[Todo List App Demo](https://i.imgur.com/eYla12e.gif)

## 簡介

這是一個有基本功能的 todo list 練習，為了練習語法以及邏輯，所以參考了教學影片，文末附上教學影片之連結。這裡練習了各個 Component 之間的傳遞、React Hook 也認識了之前沒有用過的幾個 CSS 小方法。下面詳細記錄了自己的學習步驟。

## 功能

- 增加 task
- 刪除 task
- 完成的 task : 打 √, 劃掉的線
- 可以 filter 完成/未完成/所有的 task

## 前置作業

簡單劃分需要的功能以及元件。除了 index.js 外，主要的操作都在 App.js.其餘的 Component 集中放  
到 components 的 file 中。

- index.js
- App.js
- Form.js
- TodoList.js
- Todo.js

## 步驟

### 基本設置

整個 Todo list 是由兩個部分組成的：form 以及 list。

- form : 設置讓用戶輸入的 form , 包含輸入的框框 (input) & 添加按鈕 (button) & filter (select) 。Filter 裡有三個 option : All/ completed / uncompleted。
- list : 用戶在增加 task 之後，該 task 會出現在 list 裡。只要設置一個 unorder list，增加的部分之後會處理。

```js
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <div className="container">
    <App />
  </div>,
  document.getElementById('root')
);
```

```js
//Form.js
import React from 'react';
import '../index.css'; //引入外部css

const Form = () => {
  return (
    <form>
      <div className="input-option">
        <select dir="rtl">
          <option class="options" value="all">
            All
          </option>
          <option class="options" value="completed">
            Completed
          </option>
          <option class="options" value="uncompleted">
            Uncompleted{' '}
          </option>
        </select>
      </div>

      <div className="input-text">
        <input className="text" type="text" placeholder="Add a task..." />

        <button type="submit">
          <i class="fas fa-times add"></i>
        </button>
      </div>
    </form>
  );
};

export default Form;
```

```js
// Form.js
import React from 'react';
import '../index.css';

const TodoList = () => {
  return (
    <div className="todo-container">
      <ul className="todo-list"></ul>
    </div>
  );
};

export default TodoList;
```

[![](https://i.imgur.com/OlEqffn.png)](https://i.imgur.com/OlEqffn.png)

### 處理用戶輸入的 input

在 App.js 使用 useState 設定 value 的初始值。因為需要處理的 input 在 Form.js 中，因此要把這兩個參數往下傳，之後才能在 Form.js 中引入。

```js
// App.js
const [inputText, setInputText] = useState("") //初始值為空字串
<Form inputText={inputText} setInputText={setInputText}/>
```

接著處理用戶輸入的資訊。在 input 中設定 `onchange` 以及 `value`. input 改變時，`onChange` 會被觸發，因而執行設定好的 function.

創造一個處理更新的 function : handlechange.使用 setTnputText 更新 input 的 `value`.用戶每輸入一個字，就會觸發 `onchange`, 所以會出現下面的結果。

`const Form = ({ setInputText })` 相等於 `const Form = ({props})` 的寫法，前者是直接把 setInput 這個參數傳進來，所以在使用 setInputText 的時候不用加上 props. 後者在使用時要寫 `props.setInputText` ，直接把參數傳進來的寫法會比較簡潔。

```js
//Form.js

const Form = ({ inputText, setInputText }) => {
  //這是App.js中傳進來的參數
  function handlechange(event) {
    setInputText(event.target.value); //更新inputText的值
    console.log(event.target.value); //下面有log出來的效果
  }

  <input
    className="text"
    type="text"
    placeholder="Add a task..."
    value={inputText}
    onChange={handlechange}
  />;
};
```

結果會是這個樣子：  
[![](https://i.imgur.com/LB5JVnU.png)](https://i.imgur.com/LB5JVnU.png)

### 把用戶輸入的東西存進 todo list 裡

運作邏輯：用戶輸入 task > 按 summit button > task 被加到 list 裡

增加 button `onclick` function. 在按下 button 之後，用戶輸入的值加到 todo list 裡，可以創造一個新的 hook 將 todo list 存進 array 裡。因此創造了`const [todos, setTodos] = useState([])`，初始值為空 array.與 input 一樣，這個功能會在 Form.js 裡完成，因此也要將參數往下傳。

```js
const [todos, setTodos] = useState([])

<Form
    inputText={inputText}
    setInputText={setInputText}
    todos={todos}
    setTodos={setTodos}
/>
```

接著處理用戶輸入的資料。在把 todos, setTodos 傳進 Form.js 後，增加 button 的 `onclick`，觸發 function 設為 submitHandleChange function. 這個 function 會更新 todos 這個 state，首先將原本就存在在 task 存進來，再增加用戶新輸入的 task. 用戶輸入的 task 會以 object 的形式傳進去，包括了 tasks 的名字 (text) 、是否完成 (completed:boolean)、id (使用亂數產生)。

```js
//Form.js

function submitHandleChange(e) {
  e.preventDefault(); //移除默認 refresh 頁面
  setTodos([
    ...todos,
    { text: inputText, completed: false, id: Math.floor(Math.random() * 100) },
  ]);
  setInputText(''); //輸入完成後，框框上的字拿掉
}
```

可以使用 react debugger 來看 todos 這個 state 的變化。在輸入 task 後按下 submit button, state 就會立刻更新。  
[![](https://i.imgur.com/krmEfcI.gif)](https://i.imgur.com/krmEfcI.gif)

### 把輸入的 tasks ( 更新後的 state ) 渲染到瀏覽器上把輸入的 tasks ( 更新後的 state ) 渲染到瀏覽器上

用戶輸入的 tasks 要加到 todo list 裡，這個部分要在 TodoList.js 進行。在 App.js 中把 todos 這個參數往下傳。

```js
//App.js
<TodoList todos={todos} />
```

在 TodoList.js 裡，todos state 每一次更新，都要把資料往下傳到 todo.js 裡渲染。因此這裡使用 map() 遍歷 todos 裡的每一個 element ，除了輸入的 task 外，也要加上 key ，才不會報錯。

```js
//TodoList.js

const TodoList = ({ todos }) => {
  console.log(todos);
  return (
    <div className="todo-container">
      <ul className="todo-list">
        {todos.map((todo) => (
          <Todo key={todo.id} text={todo.text} />
        ))}
      </ul>
    </div>
  );
};
```

資料往下傳到 Todo.js 後，就會按照設定好的樣式傳染到瀏覽器上。

```js
//Todo.js

function Todo({text}) {
  return(
    <div className="todo">
      <button className="check-btn"><i className="fas fa-check fa-xs"><i></button>
      <li className="todo-item">{text}</li>
      <button className="trash-btn fa-xs"><i className="fas fa-times"><i></button>
    </div>
  )
}
```

### 增加刪除功能

有關 task 本 task 的處理，都在 Todo.js 裡處理。刪除功能是直接操作 todos state, 因此會調用到 todos 以及 setTodos. 這兩個參數要從要從最頂層的 App.js 往下傳到 TodoList.js ，然後再往下傳到 Todo.js 中.

創造新的 function , 使用 filter()來過濾掉不符合條件的 element. 這裡的條件設定為：todos state 中的 element 與 被點擊的 element 之 id 如果不相同就會被留下，相同就表示那是是用戶要刪掉的 element，因為不符合條件所以就被過濾掉了。

```js
//Todo.js

function deleteHandleChange() {
  setTodos(todos.filter((el) => el.id !== todo.id));
}
```

[![](https://i.imgur.com/oqsvS3Z.gif)](https://i.imgur.com/oqsvS3Z.gif)

### 增加 task completed 功能

創造新的 function , 使用 map() 遍歷 todos state, 如果 element id 等於被點擊的 item 的 id，就將該 element 的 completed 的 boolean 改成相反的。最後再返回該 item.

```js
//Todo.js

function CompleteHandleChange() {
  setTodos(
    todos.map((item) => {
      if (item.id === todo.id) {
        return {
          ...item,
          completed: !item.completed,
        };
      }
      return item;
    })
  );
}
```

接著處理 UI 的部分，完成後會顯示打打勾、一槓、灰色字。可以用 todo.complete 來判斷是否要加入某個 className.

```js
//Todo.js

//打勾勾
//todo.complete 為false時，打勾設定與背景同顏色
//todo.complete 為true時，加入"completed-checkbox"，打勾更改為黑色

< i className={`fas fa-check fa-xs ${todo.completed? "completed-checkbox" : ""}`}></i>

//CSS
//背景為灰色，打勾也是灰色
.check-btn{
    display: block;
    font-weight: 100;
    padding: .1em .25em;
    margin-left: 1em;
    border: none;
    border-radius: 7px;
    background-color: #DFDFDF;
    color: #DFDFDF;
}

//完成後，打勾顏色更改為黑色
.completed-checkbox{
    color:black
}
```

```js
//Todo.js

//一槓、灰色字
<li className={`todo-item ${todo.completed? "completed " : ""}`}>{text}</li>

//CSS
.completed {
  text-decoration: line-through;
  opacity: 0.5;
}
```

[![](https://i.imgur.com/oWvAJBw.gif)](https://i.imgur.com/oWvAJBw.gif)

### 製作 filter 功能 (All / Complete / Uncomplete)" 製作 filter 功能 (All / Complete / Uncomplete)

先創造一個 status state 來儲存點擊 option 後的結果。這個 state 會在 Form 中處理，因此要把參數往下傳。

```js
//App.js

//把setStatus往下傳，會在 form.js 處理
const [status, setStatus] = useState("all") //默認為all

<Form
  todos={todos}
  setTodos={setTodos}
  inputText={inputText}
  setInputText={setInputText}
  setStatus={setStatus}
/>
```

因為選單在 Form.js 裡，因此在 Form.js 處理。設定選單改變時要執行的 function : 更新 setStatus 成點選的選項。選擇 complete 的話，這裡 setStatus 就會更新為 completed.

```js
//Form.js

function statusHandleChange(event) {
  setStatus(event.target.value);
}
```

[![](https://i.imgur.com/UXdkcDu.png)](https://i.imgur.com/UXdkcDu.png)

再創造一個 filtered state 來儲存被加進來的 task。創造一個新的 state 是為了不要影響到原本用來儲存 tasks 的 todos state. 過濾後的 tasks 會被儲存在這個 state.

```js
//App.js
//會在 Todolist.js 中處理

const [filteredTodo, setFilteredTodo] = useState([])

<TodoList
  setTodos={setTodos}
  todos={todos}
  setFilteredTodo={setFilteredTodo}
/>
```

接著設定 filter 的條件，這裡使用 switch() 來處理 All/completed/uncompleted 的情況。

```js
//App.js

function filterHandlerChange() {
  switch (
    status //這個status的值是 : 點擊 option 後更新的值
  ) {
    //在 <option value="completed" 的狀況下>
    case 'completed': //如果是 complete 就過濾出 completed 為 true 的 tasks
      setFilteredTodos(todos.filter((todo) => todo.completed === true));
      break;

    case 'uncompleted':
      setFilteredTodos(todos.filter((todo) => todo.completed === false));
      break;

    default:
      setFilteredTodos(todos);
      break;
  }
}
```

FilteredTodos 會在 tasks 存進 todos state 以及 option 被選擇的時候更新。使用 useEffect 來設定當上述兩種情況發生時，FilteredTodos 執行 function filterHandlerChange。

```js
//App.js

useEffect(() => {
  filterHandlerChange();
}, [todos, status]);
```

## 小結

到這裡，基本的增、刪、過濾功能就已經完成了。當中遇到無法成功渲染的多數原因為，沒有將參數往下傳到各個 Component 中，在這次的練習中深刻體現要了解自己寫的每一行程式碼的意思，出錯了才有辦法找到 bug 在哪裡。經過這次練習，對拆分的 component 間要如何傳遞以及 React 的寫法都比較熟悉了一些。

## 參考資料

1. [Build A Todo App With REACT | React Project For Beginners (FULL).](https://www.youtube.com/watch?v=pCA4qpQDZD8&ab_channel=DevEd)

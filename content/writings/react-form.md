---
title: 'React 表單'
date: '2021-04-09'
slug: 'react-form'
description: 'React 表單處理的基本概念與實際範例，包含受控組件與表單驗證'
tags: ['react', 'forms', 'javascript']
---

此篇文章為看過 Scrimba 線上課程 （[The Frontend Developer Career Path](https://scrimba.com/learn/frontend)）之教學影片後的筆記整理，內容與例子大多出自該教學影片。

## Controlled-Component

React 創建表單的方式有兩種：Controlled Component 以及 Uncontrolled Component。前者的表單的資料是被 React component 所處理；後者表單的資料則由 DOM 本身處理。多數情況下建議使用 controlled component.

### Text

在 React 中，可變的 state 通常是被維持在 component 中的 state property，並只能以 setState() 來更新。State 在用戶每次輸入的時候都會更新，如果將用戶輸入的資訊都印出來，字會隨著用戶輸入的一個一個字出現（結尾有示範影片）。

1.  建立 react component
2.  在 render()中設定需要的 input
3.  在 this.state 中初始化 firstName/lastName 的值

```js
class APP extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
    };
  }
}
```

4. 設定 onChange 的 function(handleChange)  
   為了抓取用戶說輸入的資訊再更新 State，因此要在 input 中加入`onChange`，將其指向更新 function (這裡指向 handleChange function)。每次用戶輸入時，state 都會更新。與此同時綁定 function 以及 state. 在 handleChange function 中為 firstName / lastName 重新賦值。

```js
this.handleChange = this.handleChange.bind(this);
```

為了避免重新賦值時有錯誤，因此要為 `input` 個別設定 `name`（在 input 中加入`name`）。在 `handleChange function` 中就可以直接指向 `input` 的 `name`. 無論是哪一種 input 都應該使用這樣的方式去更新資料。

```js
handleChange(event){
  this.setState({
      //不直接寫firstName : event.target.value
      [event.target.name] : event.target.value
  })
}
```

5.  **為 input 添加 value attribute**  
    讓 this.state 的 value 等於用戶的輸入。

#### 完整程式碼：

```js
import React, { Component } from "react"

class APP extends Component{
    constructor(){
        super()
        this.state = { //初始化
            firstName : "",
            lastName : ""
        }
        this.handleChange = this.handleChange.bind(this) //綁定
    }

    //可以簡化成這樣
    handleChange(event){
        const {name, value} = event.target
        this.setState({
            \[name\] : value
        }
        )
    }

    render(){
        return(
        <form>
            <label>First Name </label>
            <input
                type="text"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
            />

            <br/>

            <label>Last Name </label>
            <input
                type="text"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleChange}
            />

            <p>{this.state.firstName}{this.state.lastName}</p> //印出來
        </form>
        )
    }
}

export default APP
```

[![](https://i.imgur.com/UdXegvs.gif)](https://i.imgur.com/UdXegvs.gif)

### TextArea

跟原 HTML 的寫法有些不同，在 HTML 中，一個 textarea 的 element 是經由它的 children 來定義它的文字。React 中的則是使用 `value` attribute.

### Checkbox

checkbox 中的 `checked` attribute 是 boolean，可在 this.state 中設定它的值。checkbox 可以讓用戶勾選/不勾選，因此需要設定 `onChange` 讓 checked 變成可改變的。

```js
<input
    type="checkbox"
    checked={boolean}
    onChange={function}
/>
```

### Radio

radio 跟 checkbox 的寫法很類似。同一組的 radio button 要設置相同的名字，這樣才會被認為是一組，才能從中擇一。

```js
<label>
  <input
      type="radio"
      name="gender"
      value="male"
      checked={this.state.gender === "male"}
      onChange={}
  /> Male
</label>

<label>
  <input
      type="radio"
      name="gender"
      value="female"
      checked={this.state.gender === "female"}
      onChange={}
  /> Female
</label>
```

[![](https://i.imgur.com/MkiVZyR.png)](https://i.imgur.com/MkiVZyR.png)

### Select

Select 的下拉式選單中，預設被選定的值與 HTML 中寫的不同，React 使用 `value` 這個 attribute 來選定預設的值，範例中預設被選定的是 'blue' 。

```js
<label>Favorite Color: </label>
    <select
        value={"blue"} //預設值
        onChange={this.handleChange}
        name="favColor"
    >
        <option value="blue"\>Blue</option>
        <option value="green"\>Green</option>
        <option value="red"\>Red</option>
        <option value="orange"\>Orange</option>
        <option value="yellow"\>Yellow</option>
    </select>
```

[![](https://i.imgur.com/r0TFSLh.png)](https://i.imgur.com/r0TFSLh.png)

### 範例

[Travel form](https://coursework.vschool.io/travel-form/)

實作一個簡單的 Travel form，使用了`text`, `textarea`, ` checkbox`, `radio` 以及 `select`.

表單內容包括：

- First Name/ Last Name : text
- Age : number
- Gender : radio
- Destination : select
- Dietary restrictions: checkbox

#### 不走

1.  首先建立 react component 以及需要的 input。
2.  創建操縱每個 input 改變的 function + binding
    - 為了讓 input 的值得以改變

```js
function handleChange(event) {
  this.state({
    xxx,
  });
}
```

3.  First Name/ Last Name/ Age : text
    - 為了收到用戶的輸入以及及時改變 state，input 內需要 `onchange` 以及 `value` 兩個 attribute ( 其他 type 亦然 )
    - `onchange`: 當用戶輸入時，就會立刻執行指向的 function，立即更新 state
    - `value`: 會指向 function 更新完後的 value

```js
handleChange(event){
  const {name, value} = event.target
  this.setState({
      \[name\] : value //event.target.name選中的是input裡的'name'
  })
}
```

```js
<input
  type="text"
  name="firstName"
  placeholder="First Name"
  value={this.state.firstName}
  onChange={this.handleChange}
/>
```

4.  Gender : radio
    - input 內加上 `onchange`（ 指向 handleChange function ） & `value`
    - 跟 checkbox 的原理相似，擇一的功能需要依賴 `check`

```js
<input
    type="radio"
    name="gender"
    value="female"
    //當state是female時，就可以選到
    checked={this.state.gender === "female"}
    onChange={this.handleChange}
/>Female
```

5.  Destination : select
    - input 內加上 `onchange`（ 指向 handleChange function ） & `value`
    - 選項默認會是第一個，但這個選項不會被取得，需要切換到第二個選項再切回來才會被選中

```js
<select
  value={this.state.destination}
  name="destination"
  onChange={this.handleChange}
>
  <option value="">---Please choose a planet---</option>
  <option value="🪐Tatooine">🪐Tatooine</option>
  <option value="🌖Alderaan">🌖Alderaan</option>
  <option value="☀️Hoth">☀️Hoth</option>
  <option value="⭐Bespin">⭐Bespin</option>
</select>
```

6.  Dietary restrictions: checkbox
    - 設定每一個初始值為 false
    - 使用`checked`來改變 function
    - funtion 調整
      - 這幾種 input 會分成兩種狀況：適用於 checkbox 的以及 checkbox 以外的。因為只分為兩種狀況，因此可以使用 if type 等於 checkbox 就執行冒號前的，不等於 checkbox 則執行冒號後的
    - 結果顯示 Yes / No

```js
//先設定每一個選項的 boolean

this.state = {
  isFish: false,
  isBread: false,
  isMilk: false,
};
```

```js
//input 的 checked

<input
  type="checkbox"
  name="isFish"
  checked={this.state.isFish}
  onChange={this.handleChange}
/>
```

```js
//function 調整

handleChange(event){
 const {name, value, type, checked} = event.target
 type === "checkbox" ?
  this.setState({
    [name] : checked //checkbox 的情況
  })
 :
  this.setState({ //其他的的情況
    [name] : value,
  })
 }
```

```js
//結果顯示
<p>Colo Claw Fish : {this.state.isFish ? 'Yes' : 'No'}</p>
```

[![React Form Demo](https://i.imgur.com/V880vEP.gif)](https://i.imgur.com/V880vEP.gif)

## 小結

直接刻表單程式碼會落落長的，所以可以分好 Component 讓程式碼比較好維護. 另外也有 [Formik](https://formik.org/) 這個工具，主打無痛創造 React 表單，但這個還沒仔細研究過。

## 參考資料

1.  [React Forms](https://zh-hant.reactjs.org/docs/forms.html/)
2.  [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)

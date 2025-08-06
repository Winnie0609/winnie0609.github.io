---
title: 'JavaScript 的 this'
date: '2021-06-20'
slug: 'js-this'
description: '深入解析 JavaScript 中 this 關鍵字在不同情境下的指向規則'
tags: ['javascript']
---

## 本篇大綱：

1.  this 在 4 種情境下指向什麼
2.  快速判斷 this 的小方法
3.  箭頭函式的 this

## this 用法

解析器（瀏覽器）在呼叫函式的時候都會傳隱形的參數，就是 `this` . `this` 指向一個物件，這個物件是上下文物件。根據函式呼叫的方法不同， `this` 會指向不同的東西。

---

### 純粹函式呼叫（直接呼叫）

這是函式最通常用法，屬於全局性呼叫， this 代表全局物件 (window)。`this` 在脫離物件導向之後，沒有什麼太大的意義。

```js
//直接呼叫

var name = 'Luke';
function test() {
  console.log(this.name);
}

test(); //Luke
```

```js
//脫離物件導向的 this

function hello() {
  console.log(this);
}

hello(); //window
```

this 上述例子的情況下，不是指向 `hello` 這個 function。瀏覽器、node.js 會有預設綁定的值：

- 嚴格模式，都是 `undefined`
- 非嚴格模式，瀏覽器下是 `window`
- 非嚴格模式，node.js 下是 `global`

---

### 作為物件的方法呼叫（物件呼叫）

使用函式的方法呼叫， this 是呼叫方法的那個 Object.

```js
// 物件呼叫

function fun(){
  console.log(this)
}

var obj ={
  name : "Winnie",
  sayName:fun
};

var obj2 ={
  name : "huini",
  sayName:fun
};


console.log(obj.sayName === fun)
obj.sayName() //這是 obj 呼叫的函式，所以 this 會指向這個 object
obj2.sayName() //這是 obj2 呼叫的函式


>>> true
>>> { name: 'Winnie', sayName: [Function: fun] } //回傳的是 obj,this 變成了 obj
>>> { name: 'huini', sayName: [Function: fun] }
```

---

### 作為構造函式呼叫

通過函式產生的新物件（實例），這時的 this 會指向這個新物件。

使用 new 關鍵字創造了 person 這個實例後，`Fun` function 中的 this 就指向了 person. 呼叫 `person.name` 會印出 Luke. 印 `name` 時仍然會印出開始就宣告的 Leia，表明了這裡的 this 並不是全局物件。（與上面直接呼叫的情況不同）

```js
// 作為構造函式呼叫

var name = 'Leia';

function Fun() {
  this.name = 'Luke';
}

var person = new Fun();

console.log(person.name); //Luke
console.log(person); //Fun { name: 'Luke' }
console.log(name); //Leia
```

---

### 各種強行呼叫：apply、call、bind（強行呼叫）

在 this 有原本預設的值的情況下，如果想要更改它，一共有三個方法：apply、call、bind.

call 的使用方式與 apply 差不多，call 的呼叫方式跟一般的 function 一樣，apply 在傳入參數時使用 array 的方式。

```js
'use strict'; //嚴格模式下
function hello(a, b) {
  console.log(this, a, b);
}

hello(1, 2); //undefined 1 2
hello.call(undefined, 1, 2); //undefined 1 2
hello.apply(undefined, [1, 2]); //undefined 1 2
```

---

### apply() 與 call()

apply() 和 call() 的效果幾乎一樣，它們在這裡的作用是改變函式的呼叫物件。第一個參數代表的是「改變後的呼叫這個函式的物件」，這時的 `this` 指的就是這個參數。

從第一個例子中可看到，如果第一個參數是空的，默認呼叫全局物件，this 指向的是全局物件，因此會印出 Luke。另一種情況是第一個參數填入了其他物件，this 就會轉而指向這個被填入的物件，所以會印出 Rey.

apply 和 call 產生的結果是一樣的。

```js
var name = 'Luke';
function test() {
  console.log(this.name);
}

var obj = {};
obj.name = 'Rey';
obj.m = test;

test(); //Luke
obj.m.apply(); //Luke
obj.m.apply(obj); //Rey
obj.m.call(); //Luke
obj.m.call(obj); //Rey
```

再來看一個例子。在嚴格模式下，如果第一個參數是 undefined， 印出的也會是 undefined. 當第一個參數傳入 Luke 和 Leia 之後，印出的就是這兩個字串，可以證明 this 指向的是這個參數。

```js
'use strict'; //嚴格模式下

function hello(a, b) {
  console.log(this, a, b);
}

hello(1, 2); //undefined 1 2
hello.call(undefined, 1, 2); //undefined 1 2
hello.apply(undefined, [3, 4]); //undefined 3 4

hello.call('Luke', 1, 2); //Luke 1 2
hello.apply('Leia', [3, 4]); //Leia 3 4
```

儘管 this 指向的是別的東西，在使用這兩個方法之後也會被覆蓋掉。原本的 this 應該是 myPerson 這個實例，但經過 call 和 apply 傳進去的參數後，this 就被改變了。

```js
class Person {
  hello() {
    console.log(this);
  }
}

const myPerson = new Person();
myPerson.hello(); // myPerson instance
myPerson.hello.call('Luke'); // Luke
myPerson.hello.apply('Leia'); // Leia
```

---

### bind()

```js
'use strict';
function hello() {
  console.log(this);
}

const myPerson = hello.bind('Luke');
myPerson(); // Luke
myPerson.call('Rey'); // Luke ( 前面已經被綁定過了，因此不會改變 )
myPerson.apply('Leia'); // Luke ( 前面已經被綁定過了，因此不會改變 )
```

bind 會回傳一個新的 function. 將 hello 這個 function 使用 Luke 來綁定，在呼叫 myPerson() 的時候會輸出 Luke.

已經被 bind 過回傳的 function，不能再使用 call / apply 去改變 this 指向的物件。即使使用了，還是會回傳已經被綁定的值。

---

### 另一種判斷 this 方式

可以將所有 function 都轉成用 call 呼叫。這樣一來就能夠快速的看出 this 會指向什麼。方法是這樣的，以下面的程式碼為例：

轉換的規則是：call 的第一個參數會是 method 前的東西。`obj.hello()` 會轉換成 `obj.hello.call(obj)`，根據前面所說的第一個參數就是 this 會指向的物件，這裡的 this 就是 obj ; `hey()` 轉換成 `hey.call()` , this 是 undefined.

```js
const obj = {
  value: 1,
  hello: function () {
    console.log(this.value);
  },
};

obj.hello(); // 1
const hey = obj.hello;
hey(); // undefined
```

```js
const obj = {
  value: 1,
  hello: function () {
    console.log(this.value);
  },
  inner: {
    value: 2,
    hello: function () {
      console.log(this.value);
    },
  },
};

const obj2 = obj.inner;
const hello = obj.inner.hello;

obj.inner.hello(); //轉換成 obj.inner.hello.call(obj.inner) => 2
obj2.hello(); //轉換成 obj2.hello.call(obj.2) => 2
hello(); //hello.call => undefined
```

再來看一個例子，程式碼執行後的結果會是 2。

`obj.hello()` 會被轉為 `obj.hello.call(obj)`，這裡的 this 會指向 obj. 而 `obj.hello()` 中的 hello2 其實與 obj 的 value 無關，`hello2()` 被轉為 `hello2.call()`，這裡的 this 會指向 window，window 的 value 為 2，hello2 的 this.value 也會是 2.

```js
var value = 2;
var obj = {
  value: 10,
  hello: function () {
    var hello2 = function () {
      console.log(this.value);
    };
    hello2();
  },
};

obj.hello(); //2
```

在遇到函數陣列的時候，也可以用這樣的方式去找 this. 可以將 `arr[0]()` 想象成 `arr.0()` ( 語法不對哦，只是假想 )，這個格式就能夠套上前面說說的方法了：`arr.0.call(arr)`，this 就是 arr.

```js
function fn() {
  console.log(this);
}
var arr = [fn, fn2];
arr[0](); //this 為 arr
```

## 箭頭函式

箭頭函式是 ES6 新增的，它本身並沒有 this， 因此「在宣告他的地方的 this 是什麼，他的 this 就是什麼」。以下面這例子來說，hello 的 this 是什麼， test 的 this 就是什麼。

在呼叫 obj.hello() 的時候，這裡的 this 會是 obj ( obj.hello(obj) )，因此 test 的 this 也會是 obj.

```js
const obj = {
  x: 1,
  hello: function () {
    console.log(this);
    const test = () => {
      console.log(this.x);
    };
    test();
  },
};

obj.hello(); // 1
const hello = obj.hello;
hello(); // undefined
```

## 小結

這裡簡單整理了 this 的 4 種使用方式，沒有涉獵較為複雜的使用情景。如果要快速知道 this 指向的物件可以使用 call() 來判斷，就可以輕鬆取得 this 的值。最後做個使用方式的小總結：

1.  【直接呼叫】呼叫函式的話，this 永遠都是 window → `fun()`
2.  【物件呼叫】使用函式的方法的話，this 是呼叫方法的那個物件 → `obj.name()`
3.  【作為以構造式函式呼叫】this 指向的是新創造的物件 → `new func()`
4.  【強行呼叫】會指向呼叫的物件 → `call、apply、bind(obj)`

## 參考資料

1. [淺談 JavaScript 頭號難題 this：絕對不完整，但保證好懂](https://blog.techbridge.cc/2019/02/23/javascript-this/)
2. [Javascript 的 this 用法](https://www.ruanyifeng.com/blog/2010/04/using_this_keyword_in_javascript.html)
3. [this 的值到底是什么？一次说清楚](https://zhuanlan.zhihu.com/p/23804247)
4. [你怎么还没搞懂 this？](https://zhuanlan.zhihu.com/p/25991271)

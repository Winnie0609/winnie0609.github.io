---
title: 'JavaScript 的原型鏈'
date: '2021-06-20'
slug: 'js-prototype-chain'
description: 'JavaScript 的物件通過原型 (Prototype) 機制來達到相互繼承功能。當使用 Constructor Function 創造 object 時，所創造出來的物件不共享 constructor 的屬性和方法。'
tags: ['javascript', 'prototype', 'inheritance']
---

## 本篇大綱

1.  原型是什麼
2.  原型鏈是什麼
3.  檢查屬性以及實例的方法

JavaScript 的物件通過原型 (Prototype) 機制來達到相互繼承功能。當使用 Constructor Function 創造 object 時，所創造出來的物件不共享 constructor 的屬性和方法。所創造出來的物件稱為實例 ( instance ).

```js
// prototype 例子
// 不共享屬性

function Person(first, last, gender) {
  this.first = first;
  this.last = last;
  this.gender = 'male';
}

var person_one = new Person();
var person_two = new Person();

person_two.gender = 'female';

console.log(person_one.gender); //male
console.log(person_two.gender); //female
```

person_one 和 person_two 的 gender 屬性是獨立的，因此在修改 person_two 的 gender 時，不會影響到 person_one，兩個函式之間不共享屬性。

## 原型 Prototype

如果要讓所有實例都共享同一個屬性，可以運用實例的特性：當函式以構建函式的形式創建的時候，所創建的物件都有一個隱含的屬性( \_\_proto\_\_ )，指向該構建函式的原型物件。

因此如果將屬性設置到 prototype，所有函式都能夠存取到該屬性。設置的方式為：`FunctionName.prototype.variable` .

[![](https://i.imgur.com/9RlOSt6.jpg)](https://i.imgur.com/9RlOSt6.jpg)

Person 這個函式物件以及他的實例的 \_\_proto\_\_ 指向的是同一個 prototype。這裡將 gender 這個屬性設置到 prototype，因此所有實例都可以取得這個屬性。

person_one 這個實例另外設置了 gender 屬性。當呼叫物件的屬性時，首先會查找自身物件是否有該屬性，有的話就會回傳本身的，沒有的話則會往上一層 prototype 找，直到找到該屬性為止，如果到頂層都沒有找到就會回傳 undefined。因此，`person_one.gender` 會回傳 `female` , 而 `person_two.gender` 回傳 `male` .

```js
// prototype 例子

function Person() {}

//向 Person 的 prototype 中添加屬性 gender
Person.prototype.gender = 'male';
Person.prototype.sayHello = function () {
  return 'Hellooo';
};

var person_one = new Person();
var person_two = new Person();

//設置 person_one 的 gender
person_one.gender = 'female';

console.log(person_one.gender); //會先找自身有沒有該屬性，有的話會直接使用; person_中有 gender 屬性，所以會使用自身的 gender
console.log(person_two.gender); //因為 person_ two 中沒有屬性 gender, 所以會去原型物件中找
console.log(person_one.sayHello()); //可以呼叫 prototype 裡的 function
console.log(person_one.age) > //這個屬性不存在
  female >
  male >
  Hellooo >
  undefined;
```

小結：

- 原型物件就像是一個公共區域，同一個構造函式的實例都可以取得這個原型物件。
- 當呼叫物件的屬性時，如果物件有該屬性，就會使用自身的；沒有的話就會往 prototype 找。
- prototype 裡也可以設置 function
- 如果普通函式呼叫 prototype method，並不會起任何作用。

## 關於原型鏈

實例的 \_\_proto\_\_ 會指向 constructor 的 prototype。 如果呼叫某個物件的屬性，如 `person_two.gender`, 如果在自身 object 裡找不到，就會往上一層 `Person.prototype` 找，如果還是沒有，就找 `Person.prototype.__ proto __` ，直到找到某個東西的 \_\_proto\_\_ 是 null 為止。

眾多 \_\_ptoto\_\_ 串起來的鏈就稱為原型鏈。通過原型鏈，可以達成類似繼承的功能，得以呼叫自己 parent 的 method.

PS: `Person.__ proto __` 是 `Function.prototype` , Person 是 Function 的 instance.

```js
function Person(first, last) {
  this.first = first;
  this.last = last;
}

Person.prototype.gender = 'male';
var person_one = new Person('Sky', 'Walker');

//person_one.__proto__ 指向 Person.prototype
console.log(person_one.__proto__ === Person.prototype);
//Person.prototype.__proto__ 指向 object.prototype
console.log(Person.prototype.__proto__ === Object.prototype);
//object.prototype 是 null 為原型鏈的頂端
console.log(Object.prototype.__proto__);
```

## 其他

### 檢查屬性

- `in`: 使用 `in` 檢查物件中是否含有某個屬性，如果物件中沒有，但 prototype 有會返回`true`
- `object.hasOwnProperty()`: 檢查物件自身有沒有這個屬性

```js
//檢查屬性

function Person(first,last) {
    this.first = first
    this.last = last
}

Person.prototype.gender = "male"

var person\_one = new Person("Sky","Walker")
person\_one.age = 42

console.log("gender" in person\_one) //true
console.log("age" in person\_one) //true
console.log(person\_one.hasOwnProperty("gender")) //false
console.log(person\_one.hasOwnProperty("last")) //true
console.log(person\_one.hasOwnProperty("age")) //true
```

### 檢查實例

- `instanceOf`: 檢查函式是不是某個 constructor 的 instance , 會往上搜查原型鏈。

```js
//檢查實例

function Person(first,last) {
    this.first = first
    this.last = last
}

var person\_one = new Person("Sky","Walker")

console.log(person\_one instanceof Person) //true
console.log(person\_one instanceof Object) //true
```

## 參考資料

1. [該來理解 JavaScript 的原型鍊了](<%5Bhttps://%5D(https://github.com/aszx87410/blog/issues/18)>)
2. [你不可不知的原型鏈 Prototype | JavaScript 鍛鍊日記](<%5Bhttps://%5D(https://medium.com/%E7%8B%97%E5%A5%B4%E5%B7%A5%E7%A8%8B%E5%B8%AB/%E4%BD%A0%E4%B8%8D%E5%8F%AF%E4%B8%8D%E7%9F%A5%E7%9A%84%E5%8E%9F%E5%9E%8B%E9%8F%88-prototype-b2473b301a11)>)

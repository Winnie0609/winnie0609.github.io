---
title: 'Vue 3 實作多國語言'
date: '2021-08-29'
slug: 'vue-i18n'
description: 'Vue3 搭配 Vue CLI 使用 i18n 實作網站多國語言'
tags: ['vue', 'i18n', 'web development']
---

## 本篇大綱：

1. 環境設置
2. 準備多語言檔案
3. 檔案設定
4. 在 component 中使用
5. 其他資料格式

## 簡介

這是一篇 Vue3 搭配 Vue CLI 使用 i18n 來切換網站語言的栗子。

![](https://i.imgur.com/j8mVnCb.gif)

## 環境設置

- node : v14.17.1
- vue : “^3.0.0”
- vue-cli : “~4.5.0”
- vue-i18n : “^9.1.7”

### 安裝 i18n

[Vue I18n](https://vue-i18n.intlify.dev/installation.html#global-import)

```javascript
npm install vue-i18n@next
```

### 檔案架構

```
src
├- i18n.js //設定 i18n 檔案
├- i18n
    ├-- tw.json //中文翻譯
    ├-- en.json //英文翻譯
├- components
    ├-- HelloWorld.vue
├- App.vue
├- main.js
```

### 準備多語言檔案

```javascript
//tw.json

{
  "name": "姓名",
  "gender": "性別",
  "email" : "電郵",
  "address": "地址"
}
```

```javascript
//en.json
{
  "name": "Name",
  "gender": "Gender",
  "email" : "Email",
  "address": "Address"
}
```

### 檔案設定

需要使用 `createI18n` 來設定，其中需要 3 個參數 ： `locale` (設定語言)、 `fallbacakLocale` (如果翻譯失敗使用的語言)、`messages` (各個語言翻譯的檔案)。

這裡為了方便起見所以使用 json 檔案來儲存各語言的翻譯，再引入到 messages 裡。

因為沒有另外建立 store 來儲存語言這個變數，因此語言設定從 local storage 中的 `language` 中取得，也可以將預設語言設定為電腦本身的語言 : `let lang = navigator.language || 'tw'` .

```javascript
//i18n.js

import { createI18n } from 'vue-i18n'; //引入 createI18n

//引入需要的 json 檔案
const messages = {
  'en-US': require('./i18n/en.json'),
  'zh-TW': require('./i18n/tw.json'),
};

//設定語言，從 local storage 取得
const lang = localStorage.getItem('language') || 'zh-TW';

const i18n = createI18n({
  locale: lang, // set locale
  fallbackLocale: 'en-US', // set fallback locale
  messages,
});

export default i18n;
```

### 在 main.js 中引入套件

Vue 3 和 Vue 2 的使用插件有些不一樣，在開始找資料的時候多找到 Vue2 的寫法，然後弄了很久才發現 Vue 2 和 Vue 3 寫法不一樣啊啊啊（Vue 小白的煩惱 QAQ）。

```javascript
//main.js

import { createApp } from 'vue';
import App from './App.vue';
import i18n from './i18n';

const app = createApp(App);
app.use(i18n);
app.mount('#app');
```

## 在 component 中使用

> 這部分參考 [在 Vue-cli 中使用 i18n 實作多國語系 | Eason Lin](https://medium.com/easons-murmuring/%E5%9C%A8-vue-cli-%E4%B8%AD%E4%BD%BF%E7%94%A8-i18n-%E5%AF%A6%E4%BD%9C%E5%A4%9A%E5%9C%8B%E8%AA%9E%E7%B3%BB-720ec360783e)

在設定好上面兩個檔案之後，就可以在任何 component 中使用這個套件。只要使用 `$t` 符號，就可以插入需要的文字，且只需要撰寫一次 template 就可以通過轉換語言 `lang` 變數來達到翻譯的效果。

```javascript
<p>{{ $t("pageTitleText") }}</p>
```

設定了兩個按鈕來更換語言，點擊 `tw` 按鈕時會觸發 `setLang` function, 把變數 `lang` 的傳到 `setActiveLanguage` 這個 function. 而 `setActiveLanguage` 則會更新 local storage `language` 中的值，從而達到更新語言的目的。

```js
//HelloWorld.vue

<template>
  <div class="hello">
    <div>hellllo</div>
    <p>{{ $t("pageTitleText") }}</p>
    <button data-lang="zh-TW @click="setLang">tw</button>
    <button data-lang="en-US" @click="setLang">en</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  methods: {
    setActiveLanguage(lang) {
      localStorage.setItem('language', lang)
    },
    setLang(event) {
      const lang = event.target.dataset.lang
      this.setActiveLanguage(lang)
      return history.go(0)
    }
  }
}
</script>
```

這是基本的使用方式，i18n 也接受不同的資料撰寫格式，在使用上提供了更大的彈性。

## 其他資料格式

### Interpolations

#### Interpolations : Named interpolation

可以在資料裡使用花括號 `{}`, 插入到 component 內時，可以自己定義 `msg` 的值。

```json
{
  "first": "{msg} world"
}
```

```js
<p>{{ $t("first", { msg: 'hello' }) }}</p>
//輸出 : hello world
```

#### Interpolations : List interpolation

花括號裡的數字是 array 的 index. 在 component 中傳入一個 array 就可以指定要輸出哪一個 item.

```json
{
  "first": "{1} world"
}
```

```js
//html
<p>{{ $t("first", ['hello', 'bye']) }}</p>
//輸出 : bye world
```

#### Interpolations : Literal Interpolation

設定好需要的區塊，再把資料傳進去。在花括號裡加上單引號就會被認為是字串。

```json
{
  "email": "{account}{'@'}{domain}"
}
```

```js
<p>{{ $t("email", {account: 'hello', domain: 'mail.com'}) }}</p>
//輸出 : hello@mail.com
```

### Linked messages

在資料裡串接資料，使用方式是加上`@`, 然後接上所需要的資料。

```json
{
  "msg": {
    "the_world": "the world",
    "dio": "DIO",
    "linked": "@:msg.dio @:msg.the_world !!!"
  }
}
```

```js
<p>{{ $t("msg.linked") }}</p>
//輸出 : DIO the world !!!
```

## 小結

因為實習的專案中遇到了多國語言轉換的問題，因此看了一些資料實作看看。當然專案中不只是這基礎的操作，還有一些較為複雜的部分，之後可能會再回來更新一些遇到的坑。

## 參考資料

1. [Vue I18n](https://vue-i18n.intlify.dev/introduction.html)
2. [在 Vue-cli 中使用 i18n 實作多國語系(Vue2) medium](https://medium.com/easons-murmuring/%E5%9C%A8-vue-cli-%E4%B8%AD%E4%BD%BF%E7%94%A8-i18n-%E5%AF%A6%E4%BD%9C%E5%A4%9A%E5%9C%8B%E8%AA%9E%E7%B3%BB-720ec360783e)

---
title: 'Nuxt.js 搭配 Vuex 實作 CRUD'
date: '2021-07-21'
slug: 'nuxt-crud'
description: 'Nuxt.js 搭配 Vuex 實作 CRUD 操作的完整教學'
tags: ['nuxt', 'vue', 'vuex', 'crud']
---

## 本篇大綱

1.  簡介
2.  前置作業
3.  Vuex 設定
4.  CRUD 功能
5.  其他小筆記

## 簡介

這是一個 Nuxt 搭配 Vuex 的 CRUD 栗子。
[Source code](https://github.com/Winnie0609/crud-vue) | [Live Demo](https://winnie0609.github.io/crud-vue/)

## 前置作業

### 新增 Nuxt 專案

```js
npx create-nuxt-app crud-app
```

在輸入指令後會提供幾個項目的選擇，包括服務器端框架、UI 框架、測試框架、Nuxt 模式等。這裡的 UI 框架選擇的是 Vuetify.js.

### 準備資料

這裡使用了 [JSONPlaceholder](https://jsonplaceholder.typicode.com/guide/) 提供的 API. 裡面提供的例子使用 `fetch`， 所以在這個例子裡，就可以直接 ~抄起來~ 使用. 要注意的是：這個 API 在發送新增 / 更新 / 刪除的 request 時並不會真的更改原本的資料。

### 設定 UI

這裡需要的 UI 只有 form, card, button, 直接套用 Vuetify 裡的模板。

## Vuex 設定

Vuex 是類似 Redux 的 state 集中管理器。這裡的 state 比較單純，只有我們設定的 `posts` 一項，用來儲存每筆的資料。

這裡會用到 Vuex 的功能包含了： state, mutation, action. 因為 Nuxt 已經幫忙處理 Vuex 後面的東西，所以只要按照 [文件](https://nuxtjs.org/docs/2.x/directory-structure/store) 上的方式使用就可以了。

Vuex 的檔案會放在 `store` 底下。

### State

這裡創造了一個 `posts` 為空 array, 用來儲存資料。

```js
//index.js

export const state = () => ({
  posts: [],
});
```

### Action

要執行的動作會在 action 裡處理. Action 並不會直接改變 state， 而是會提交 mutation，由 mutation 來改變 state.

Action 會通過 `store.dispatch` 被觸發，會在
Nuxt 的 methods 中 dispatch。

```js
//example

methods: {
    async createPost () {
      await this.$store.dispatch('createPost', { title: this.title, body: this.body })
      this.title = ''
      this.body = ''
    },
}
```

dispatch 的第二個參數是我們想要傳到 action 的參數。如果要傳多個參數就要將他們包成一個 object 往下傳，因為 action 只能接受 1 個參數。

action 在接收參數時候，要注意參數位置。第一個參數：內建的參數，如 commit / state；第二個參數：自己要往下傳的參數。

```js
//錯誤例子

export const actions = {
  async createPost({ commit, title, body }) {
    // 這裡會是兩個參數不是一個：
    // async createPost ({commit}, {title, body})
    //rest of the code
  },
};
```

### Mutation

Mutation 是最為底層的操作，比如說，「把某個變數改成 true」、「把這筆資料塞到 array 裡」的操作。因此在命名上也要以改 function 做了什麼為標準，才能做到最大程度的重複使用和避免混淆。

## CRUD 功能

CRUD 的功能包括新增 (Create), 讀取 (Read), 更新 (Update) 和 刪除 (Delete). JSONplaceholder 提供了這四個方法但因為發送的請求不會改變原本的資料，所以其實都是在操作自己的 array.

### Read 讀取

在執行其他 function 前，會先將資料抓取下來，所以這個步驟會放在 Nuxt `mounted()` 裡。

```js
//index.vue

async mounted () {
  await this.$store.dispatch('initPost')
},
```

Action 中的 init post 會發送請求，data 會是 100 筆的資料。

```js
//index.js
export const actions = {
  //commit 是 action 自帶的參數
  async initPost({ commit }) {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await res.json();
    data.forEach((item) => {
      //每筆資料都需要 show 這個變數，用來控制是一般狀態 / 可編輯狀態
      item.show = true;
    });

    commit('setPosts', data);
  },
  //rest of the code
};
```

```js
//index.js
//把 posts 設成 action 抓下來的 data

export const mutations = {
  setPosts(state, data) {
    state.posts = data;
  },
  //rest of the code
};
```

### Create 增加

提供用戶輸入 title 和 body 兩個部分。需要把用戶輸入的 title 和 body 都往下傳。

```js
//index.vue

methods: {
  async createPost () {
    await this.$store.dispatch('createPost', { title: this.title, body: this.body })
    this.title = ''
    this.body = ''
  },
  //rest of the code
}
```

每則 comment 的 id 使用亂數產生。這裡發送的 request 並不會直接更新到原本的資料，只會把這筆資料加到 `posts` 裡。 與前面的相同，這裡需要為新增的資料加上 `show` 變數。

```js
//index.js

export const actions = {
  //rest of the code

  async createPost({ commit }, { title, body }) {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title,
        body,
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    const post = await res.json();
    post.show = true;
    post.id = Math.floor(Math.random() * 10000);
    commit('pushPost', post);
  },
};
```

這裡的動作就是將新增加的這筆資料加到 posts 裡。這裡的 `post` 存在 `state` 裡，所以要使用 `state.posts` 才能讀取。

```js
//index.js
export const mutations = {
  //rest of the code

  pushPost(state, post) {
    state.posts.unshift(post);
  },

  //rest of the code
};
```

### Update 更新

更新資料一樣使用 JSONplaceholder 提供的 API. 更新資料的邏輯是設定兩個區塊( 一般顯示/ 顯示 form 欄位 )，使用 `show` 當做變數來操控：當 `show` 為 true 時，就顯示正常的狀況、反之則顯示 form 讓用戶更新資料。

```js
//index.vue

methods: {
  async updatePost (post, editedTitle, editedBody) {
    await this.$store.dispatch('updatePost', {
      post,
      editedTitle: this.editedTitle,
      editedBody: this.editedBody
    })
  },

  editBtn (post) {
    this.$store.dispatch('editBtn', post)
    this.editedTitle = post.title
    this.editedBody = post.body
  },
}
```

因為這裡不會改變原本的資料，因此這裡的 URL 後面的 id 可以不用改。再者，因為在創造新資料的時候，創造新的 id 是使用亂數產生，這些亂數並不存在在原本的資料中，因此用新 id 去發送請求會出現 error.

在 form 出現的時候，`submit` 和 `cancel` button 會一同出現，`edit` 和 `delete` 就會隱藏起來。（會在 template 裡處理）.

`edit` button 和 `cancel` button 都是使用 for loop 的方式去找導被點擊的卡片。

```js
//index.js

export const actions = {
  async updatePost({ commit }, { post, editedTitle, editedBody }) {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'PUT',
      body: JSON.stringify({
        id: 1,
        title: post.title,
        body: post.body,
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    await res.json();
    commit('setPost', {
      id: post.id,
      title: editedTitle,
      body: editedBody,
    });
    commit('setShow', {
      id: post.id,
      show: true,
    });
  },

  editBtn({ commit, state }, post) {
    state.posts.forEach((item) => {
      if (item.id !== post.id) {
        commit('setShow', {
          id: item.id,
          show: true,
        });
      }
    });

    commit('setShow', {
      id: post.id,
      show: !post.show,
    });
  },

  cancelBtn({ commit, state }, post) {
    const postIndex = state.posts.findIndex((item) => item.id === post.id);

    state.posts.forEach((item) => {
      if (item.id === postIndex) {
        commit('setShow', {
          id: item.id,
          show: true,
        });
      }
    });

    commit('setShow', {
      id: post.id,
      show: true,
    });
  },
};
```

```js
//index.js

export const mutations = {
  setPost(state, { id, title, body }) {
    const postIndex = state.posts.findIndex((item) => item.id === id);

    this._vm.$set(state.posts, postIndex, {
      title,
      body,
      id,
      show: true,
    });
  },

  setShow(state, { id, show }) {
    const postIndex = state.posts.findIndex((item) => item.id === id);
    state.posts[postIndex].show = show;
  },
};
```

### Delete 刪除

如前面所說的，發出去的 request 並不會真的改變原本的資料。因此這裡刪除的處理方式就是將被點到 comment 從 posts array 中移除。

```js
// index.vue
methods: {
  deletePost (post) {
    this.$store.dispatch('deletePost', post)
  }
}
```

```js
//index.js

export const actions = {
  deletePost({ commit }, post) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
      method: 'DELETE',
    });

    commit('removePost', post.id);
  },
};
```

```js
//index.js

export const mutations = {
  removePost(state, id) {
    const removeItem = state.posts.findIndex((item) => item.id === id);
    state.posts.splice(removeItem, 1);
  },
};
```

## 其他小筆記

### 全局引入 CSS

這個例子其實沒有用到很多的樣式，但還是有一個 CSS 檔案需要引入。這裡選擇了最方便的方式：在 `nuxt.config.js` 中全局引入。

因為還沒有深入研究全局引入和其他方式引入有什麼優劣，因此這裡就是用我認為最方便的方法。

[![](https://i.imgur.com/xtfsD3p.png)](https://i.imgur.com/xtfsD3p.png)

### methods 裡的 function

methods 是一個 dictionary, 內容看起來不是常見的 key: value pair, 他其實是簡寫。原本長得是這個樣子，但如果後面接的是匿名函式就可以簡寫成 `createPost() {...}` .

```js
//原本長這樣
methods: {
  createPost: () => {};
}
```

### 部署到 github page

這裡參考了這篇文章：[28\. Nuxt 靜態頁部署](https://ithelp.ithome.com.tw/articles/10209553) ，就沒有在另外寫筆記啦。

## 小結

這次機緣巧合下需要接觸 Vue 和 Nuxt 所做出來的小栗子。當中有遇到一些參數傳遞的問題，以及一些元件沒有及時更新的問題，後者的問題在使用 Vuex 之後就解決了。其他遇到的坑或是需要留意的部分都記錄下來了。

心得就是不會就要問，卡太久就要問，問了就會記下來這樣。因為這是第一次接觸 Nuxt, 以前也沒有寫過 Vue, 弄起來還是有些吃力，背後的原理還是概念會再慢慢補起來，這裡就當做一個簡單記錄。

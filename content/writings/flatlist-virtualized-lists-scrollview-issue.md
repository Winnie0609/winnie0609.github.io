---
title: 'Flatlist 出現 VirtualizedLists should never be nested inside plain ScrollViews'
date: '2023-02-15'
slug: 'flatlist-virtualized-lists-scrollview-issue'
description: 'React Native 中 Flatlist 出現 VirtualizedLists should never be nested inside plain ScrollViews 警告的解決方案'
tags: ['react-native', 'flatlist', 'troubleshooting']
---

需求：畫面中有兩個 Flatlist, 第一個是 Trending (橫向 horizontal 的 **Flatlist A**), 第二個是 For you (縱向 vertical 的 Flatlist B). 兩個 Flatlist 的滑動方向不同，上下滑動頁面時，Flatlist B 需要一起往上移動，不固定在畫面上方。

原本的想法是用一個 scroll view 把兩個 Flatlist 包起來，這樣就可以一起移動，但 Flatlist 不允許用 scroll view 包起來，會出現 `VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.` 這個錯誤。Flatlist 會做效能的控制，像是 lazy loading，包在 scrollview 裡就會失去這個功能。

解決方法是使用 [Flatlist](https://reactnative.dev/docs/flatlist#listheadercomponent) 中的 `ListHeaderComponent`，把 **Flatlist A** 放在 **Flatlist B** 的 `ListHeaderComponent` 裡。最後的效果就會跟需求一樣。

```js
<FlatList
  data={trendingAlbum}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item }) => (<PopularAlbum)})
  ListHeaderComponent={() => (
    <FlatListA
      data={suggestedSong}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <Song {...item} />}
      horizontal
    />
  )}
/>
```

![Nested List Example](/images/nested-list.png)

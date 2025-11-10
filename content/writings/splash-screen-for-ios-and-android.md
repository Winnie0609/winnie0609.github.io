---
title: '在 React Native 設定 Splash Screen 和 App Icon 的方法 (iOS & Android)'
date: '2023-03-27'
slug: 'splash-screen-for-ios-and-android'
description: '詳細介紹如何在 React Native 專案中設定 Splash Screen 和 App Icon 的完整步驟'
tags: ['react-native', 'ios', 'android', ]
---

## Splash Screen

這個設定方法適用情境為使用 Expo bare flow 的專案，主要會直接使用 `expo-splash-screen` 提供的方法進行設定。如果 Splash screen 的設計比較複雜，想要省去設定和調整的時間，可以直接使用圖片。

---

1. 準備 Splash Screen 的圖，尺寸就根據支援的裝置大小來設定。解析度太低的圖，可能會看起來糊糊的。
2. 安裝 [expo-splash-screen](https://docs.expo.dev/versions/latest/sdk/splash-screen/)`套件。使用`@expo/configure-splash-screen` 的 command 進行設定。 [@expo/configure-splash-screen](https://www.npmjs.com/package/@expo/configure-splash-screen) 是 [expo-splash-screen](https://docs.expo.dev/versions/latest/sdk/splash-screen/) 的相依套件，在安裝後者的時候前者也已經一併安裝。其他的設定可以看文件。

   - `-b` : 設定背景顏色
   - `-i` : 設定背景圖片
   - `-r` : 設定 resize mode (預設 `contain`)

   ```bash
   yarn run configure-splash-screen -b "#FFFFFF" -i "PATH/TO/IMAGE.png"
   ```

3. 【iOS】設定完之後可以到 xcode 檢查畫面。位置在：APPNAME → SplashScreen → 點圖，旁邊會出現調整 Panel。如果想要調整畫面，可以直接在上面操作。比如說，預設是 contain 的圖想要調整成 `cover` 的效果，可以把 View 的 Content mode 設定成 Aspect Fill.
4. 【iOS】調整完之後，可以點擊畫面下的裝置，切換裝置檢查畫面是否如預期。
5. 【Android】Android 的關於 Splash screen 相關的設定檔案會在 `android/app/src/main/res/values/`. 有需要的調整背景顏色或是 resize mode 都可以在這裡找到相關的 Code. 比如說，要把 contain 的圖想要調整成 `cover` 的效果，可以在 `strings.xml` 這個檔案裡更換。

```bash
<string name="expo_splash_screen_resize_mode" translatable="false">cover</string>
```

![xcode splash screen](/images/splash.png)

## App icon

App icon 可以直接在 xcode 裡設定，但覺得比較麻煩因此使用直接更換檔案的方式。這裡使用 Easy app icon 一鍵輸出所有需要的圖，上傳一張圖，會自動生成各種尺寸的圖，就不用一張張輸出不同大小的圖。

1. 準備 icon 的圖，我一般會輸出一張 1024 x 1024 的圖檔。
2. 到 [Easy app icon](https://easyappicon.com/) 產出所有尺寸的圖。上傳圖片後會產出 iOS 和 android 需要的各個尺寸以及樣式的 icon，另外也提供簡單調整 icon 大小的工具，輸出前可以通過調整 padding 讓 icon 看起來大一點或是小一些。看好預覽圖後就可以直接下載圖片，可以同時下載 iOS 以及 android 的。
3. 手動更換原本的檔案。下載之圖檔的檔案結構和檔名都已經設定成專案的一樣，所以可以直接替換對應的檔案。
   - android:`android/app/src/main/res`
   - iOS: `ios/MobileGPT/Images.xcassets`
4. 重裝 app 就可以看到 app icon 已經設定成功。

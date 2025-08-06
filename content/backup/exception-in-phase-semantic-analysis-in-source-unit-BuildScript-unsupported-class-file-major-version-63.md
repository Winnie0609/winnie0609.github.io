---
title: React Native 報錯 - exception in phase ‘semantic analysis’ in source unit ‘BuildScript’ Unsupported class file major version 63
slug: 'exception-in-phase-semantic-analysis-in-source-unit-BuildScript-unsupported-class-file-major-version-63'
description: 'React Native 報錯 - exception in phase ‘semantic analysis’ in source unit ‘BuildScript’ Unsupported class file major version 63'
date: '2023-04-10'
tags: ['react-native']
---

## 遇到的問題與原因

當執行 `yarn android` 準備 build app 時，遇到下面這個錯誤：

```jsx
exception in phase 'semantic analysis' in source unit '*BuildScript*' Unsupported class file major version 63
```

![](https://i.imgur.com/5ABicTP.png)

這個錯誤訊息表示在 Gradle 執行 ‘BuildScript’ 的時候出現異常，造成原因是找到了一個不支援類文件主要版本 63.

造成這個問題的原因是 Gradle 版本不支援目前使用的 Java 版本，在升級 Java 後偶爾會遇到這個問題。可以在 **[Compatibility Matrix Gradle | Java](https://docs.gradle.org/current/userguide/compatibility.html)** 查看兩者相對應的版本，然後把 Gradle 更新為相容的版本。

### 解決這個問題的步驟

1. 檢查目前使用的 Java 版本：在終端機輸入 `java -version`，檢查使用的版本是哪一個
2. 檢查專案正在使用的版本：查看 `gradle-wrapper.properties` 文件中的 `distributionUrl`，確認目前使用的 Gradle 版本
3. 將 Gradle 的版本更新為相容的版本：將 `distributionUrl` 裡的 `gradle-7.5.1-all.zip` 改為 `gradle-7.6-all.zip`（或其他相容的版本）
4. 執行 `./gradlew clean` 命令：下載並使用新的 Gradle 版本

![Java Compatibility Chart](/images/java-compatability.png)

## 參考資料

1. [BUG! exception in phase 'semantic analysis' in source unit 'BuildScript' Unsupported class file major version 63](https://stackoverflow.com/questions/74695402/bug-exception-in-phase-semantic-analysis-in-source-unit-buildscript-unsup)

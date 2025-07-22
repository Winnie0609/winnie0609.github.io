---
title: 'React Native 報錯 - exception in phase semantic analysis in source unit BuildScript'
date: '2023-04-10'
slug: 'issue-react-native-version-63'
description: 'React Native 開發中遇到的 class file major version 63 錯誤解決方案'
tags: ['react-native', 'troubleshooting', 'error']
---

### 遇到的問題與原因

當執行 `yarn android` 準備 build app 時，遇到下面這個錯誤：

```
FAILURE: Build failed with an exception.

* Where:
Build file '/Users/xxx/Desktop/xxx/node_modules/react-native-vector-icons/android/build.gradle' line: 3

* What went wrong:
Plugin [id: 'com.android.library', version: '7.4.1', apply: false] was not found in any of the following sources:

- Gradle Core Plugins (plugin is not in 'org.gradle' namespace)
- Plugin Repositories (could not resolve plugin artifact 'com.android.library:com.android.library.gradle.plugin:7.4.1')
  Searched in the following repositories:
    Gradle Central Plugin Repository
    Google
    MavenRepo

* Try:
> Run with --stacktrace option to get the stack trace.
> Run with --info or --debug option to get more log output.
> Run with --scan to get full insights.

* Get more help at https://help.gradle.org

BUILD FAILED in 1s
```

### 解決方法

此問題是由於 Java 版本不符所致。檢查目前的 Java 版本，並重新安裝合適版本的 Java。

```bash
# 檢查 Java 版本
java -version

# 如果需要更換版本，可以使用 brew 安裝
brew install openjdk@11
```

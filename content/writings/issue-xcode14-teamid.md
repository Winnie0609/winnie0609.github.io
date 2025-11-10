---
title: 'Xcode 14 build 報錯：套件沒有 teamID'
date: '2023-03-01'
slug: 'issue-xcode14-teamid'
description: 'Xcode 14 build 過程中遇到套件沒有 teamID 錯誤的解決方案'
tags: ['xcode', 'react-native']
---

Xcode 14 在 build app 時會遇到「套件沒有 teamID」這個錯誤而導致 build 失敗。在 XCode 裡可以在介面點擊錯誤，手動新增 teamID，但這樣效率低。可以在 `Podfile` 裡新增一段 script，暫時解決這個問題。

```jsx
post_install do |installer|
    installer.generated_projects.each do |project|
      project.targets.each do |target|
          target.build_configurations.each do |config|
              config.build_settings["DEVELOPMENT_TEAM"] = "YOUR_TEAM_ID"
           end
      end
    end
  end
```

[這個 issue 官方已經解決了。](https://github.com/CocoaPods/CocoaPods/pull/11723)

## 參考資料

1. [Xcode 14 needs selected Development Team for Pod Bundles](https://stackoverflow.com/questions/72561696/xcode-14-needs-selected-development-team-for-pod-bundles)
2. [Xcode 14 build failed with manual code sign and app resource bundles](https://github.com/CocoaPods/CocoaPods/issues/11402)

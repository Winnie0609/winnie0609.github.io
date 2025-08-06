---
title: '從前端直接發送訊息到 Slack 的方法：Incoming Webhooks'
date: '2023-02-28'
slug: 'slack-incoming-webhook'
description: '從前端直接發送訊息到 Slack 的方法，使用 Incoming Webhooks 的完整教學'
tags: ['slack', 'react']
---

要從外部發送訊息到 Slack 的頻道時，有兩種方式可以選擇：使用 Slack Web API 或是使用 Incoming Webhooks。根據不同的需求可以使用不同的方式。由於需求只要簡單地發送訊息，因此選擇了比較方便、可以直接在前端處理的 Incoming Webhooks.

Slack API 的特點：

- 功能較多：提供許多功能，除了發送訊息外，還可以進行用戶管理、頻道管理、檔案上傳等其他操作。
- 需要 Slack OAuth Access Token：需要驗證並獲取 Slack OAuth Access Token，需要透過使用者授權和驗證。
- 需要後端伺服器：由於需要處理 Access Token、保護憑證和處理其他後端邏輯，使用 Slack API 需要有後端伺服器來安全地存儲和處理這些敏感資訊和功能。

Incoming Webhooks 的特點：

- 僅限發送訊息：功能較簡單，主要用於將訊息發送到 Slack 頻道。
- 設置簡單：不需要額外的驗證或存取權限，只需要簡單的設定和使用 Webhook URL.
- 前端直接呼叫：可以直接從前端發送 request 到 Slack Webhook UR

## 步驟

1. 在 Slack 上登入，並前往 **[Slack API](https://api.slack.com/apps)** 頁面，選擇現有的 App 或創建新的 App。
2. 選擇 "Incoming Webhooks" 功能，並啟用 "Incoming Webhooks"。
3. 創建一個新的 Webhook (點擊 `Add New Webhook to Workspace`)，選擇要發送消息的頻道。

   ![slack.png](/images/slack.png)

4. 系統會生成一個 Webhook URL，類似於：

   ```bash
   https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX
   ```

5. 最後就可以使用這個 URL 來發送信息。這裡使用 axios 作為範例。

   ```jsx
   import axios from 'axios';

   const slackWebhookURL =
     'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX';
   axios.defaults.headers.common['Content-Type'] =
     'application/x-www-form-urlencoded';

   export const sendToSlack = async () => {
     try {
       const url = slackWebhookURL;
       const payload = { text: 'Hello, Slack!' };
       const params = new URLSearchParams();
       params.append('payload', JSON.stringify(payload));

       await axios.post(url, params);
     } catch (error) {
       console.error('Failed to send message to Slack:', error);
     }
   };
   ```

## 小結

這篇文章介紹了在前端使用 Slack Incoming Webhooks 的方式來發送信息。需要注意的是：Webhook URL 不需要進行驗證或存取權限控制，所以所有擁有這個 URL 的人都可以使用它發信息到這個頻道。

## 參考資料

[Sending messages using Incoming Webhooks](https://api.slack.com/messaging/webhooks)

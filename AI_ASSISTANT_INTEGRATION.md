# AI 助手功能整合說明

## 功能概述

本項目已成功將 `mainAgent.py` 的 AI 代理功能整合到前端 AI 助手頁面中，實現了以下核心功能：

### ✅ 已實現的功能

1. **智能對話系統**
   - 自然語言處理和回應
   - 上下文理解和對話歷史記錄
   - 友善的台灣本地化語言風格

2. **商品搜尋與推薦**
   - 關鍵詞提取和商品匹配
   - 多平台比價功能
   - 性價比分析和排序

3. **用戶交互體驗**
   - 即時對話界面
   - 商品卡片展示
   - 建議問題快速選擇

### 🔧 技術架構

#### 前端 (React + TypeScript)
- `components/ai-assistant.tsx`: 主要的 AI 助手界面組件
- 支援即時對話、商品展示、錯誤處理

#### 後端 API (Next.js API Routes)
- `app/api/ai-assistant/route.ts`: AI 助手 API 端點
- 模擬了原始 mainAgent.py 的核心邏輯：
  - 關鍵詞提取 (`extractKeywords`)
  - 商品搜尋 (`searchProducts`)
  - 智能回應生成 (`generateResponse`)

### 📊 支援的商品類別

目前系統支援以下商品類別的搜尋和比價：
- iPhone 系列手機
- 筆記型電腦 (MacBook, ASUS, Lenovo, Dell 等)
- 滑鼠 (Logitech, Razer, Apple, SteelSeries)
- 耳機 (AirPods, Sony, Bose)
- 鍵盤 (機械鍵盤、無線鍵盤)
- Nintendo Switch 遊戲機

### 🚀 使用方法

1. **啟動開發伺服器**
   ```bash
   npm run dev
   # 或
   pnpm dev
   ```

2. **訪問 AI 助手頁面**
   ```
   http://localhost:3000/ai-assistant
   ```

3. **開始對話**
   - 輸入商品需求 (例如："推薦筆電")
   - 點擊建議問題
   - 查看比價結果和推薦

### 🔄 與原始 mainAgent.py 的對應關係

| 原始功能 | 前端實現 | API 實現 |
|---------|---------|---------|
| `CustomerServiceAgent` | `AIAssistant` 組件 | API route 主邏輯 |
| `extractKeywords` | - | `extractKeywords` 函數 |
| `searchProducts` | - | `searchProducts` 函數 |
| `generateResponse` | - | `generateResponse` 函數 |
| 對話歷史 | `chatHistory` state | 請求參數傳遞 |
| 商品展示 | 商品卡片組件 | 結構化回應 |

### 🎯 功能特色

1. **智能化回應**
   - 根據用戶輸入自動識別意圖
   - 提供個性化的商品推薦理由
   - 支援閒聊和商品查詢混合對話

2. **豐富的商品信息**
   - 商品名稱、價格、商店
   - 折扣資訊和推薦理由
   - 直接連結到商品頁面

3. **優化的用戶體驗**
   - 即時打字動畫
   - 響應式設計
   - 錯誤處理和重試機制

### 🔮 未來擴展

如要整合真實的 AI 能力和爬蟲功能：

1. **連接真實 AI 模型**
   - 設置 `GEMINI_API_KEY`
   - 整合 Google Gemini API

2. **實現爬蟲工具**
   - 創建 `tools/scraper.py`
   - 連接各大電商 API

3. **資料庫整合**
   - 儲存商品資訊
   - 歷史價格追蹤

### 📝 注意事項

- 目前使用模擬數據，實際部署時需要連接真實的商品資料源
- 商品連結目前為示例連結，需要更新為實際的電商連結
- 建議添加快取機制以提升性能

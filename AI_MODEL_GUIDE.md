# 🤖 AI 語言模型整合指南

## 目前狀態

您的 AI 助手目前使用的是 **規則式回應系統**，並不是真正的語言模型。這是為了確保系統能夠正常運行，即使沒有 AI API 金鑰。

## 原始設計

根據您的 `mainAgent.py`，原始設計使用的是：
- **Google Gemini 2.0 Flash** 模型
- 透過 LangChain 框架
- 需要 `GEMINI_API_KEY` 環境變數

## 如何啟用真正的 AI 模型

### 方法 1: Google Gemini API (推薦)

1. **安裝必要套件**
   ```bash
   npm install @google/generative-ai
   ```

2. **取得 API 金鑰**
   - 前往 [Google AI Studio](https://aistudio.google.com/app/apikey)
   - 建立新的 API 金鑰
   - 複製金鑰

3. **設置環境變數**
   ```bash
   # 在 .env.local 檔案中添加
   GEMINI_API_KEY=your_api_key_here
   ```

4. **啟用 AI 代碼**
   - 在 `app/api/ai-assistant/route.ts` 中取消註解 AI 相關代碼
   - 將 `/*` 和 `*/` 移除即可啟用真正的 AI

### 方法 2: OpenAI API

1. **安裝 OpenAI SDK**
   ```bash
   npm install openai
   ```

2. **設置 API 金鑰**
   ```bash
   # 在 .env.local 檔案中添加
   OPENAI_API_KEY=your_openai_api_key
   ```

3. **修改代碼使用 OpenAI**
   ```typescript
   import OpenAI from 'openai'
   
   const openai = process.env.OPENAI_API_KEY ? new OpenAI({
     apiKey: process.env.OPENAI_API_KEY
   }) : null
   
   // 在 generateResponse 函數中使用
   const completion = await openai.chat.completions.create({
     model: "gpt-3.5-turbo",
     messages: [
       {role: "system", content: systemPrompt},
       {role: "user", content: userInput}
     ],
   })
   ```

### 方法 3: 其他 AI 服務

- **Anthropic Claude**: 使用 `@anthropic-ai/sdk`
- **Azure OpenAI**: 使用 Azure 的 OpenAI 服務
- **本地 AI**: 使用 Ollama 或其他本地模型

## 比較不同方案

| 模型 | 費用 | 性能 | 中文支援 | 整合難度 |
|------|------|------|----------|----------|
| Gemini 2.0 Flash | 免費額度 | 極佳 | 優秀 | 簡單 |
| GPT-3.5 Turbo | 付費 | 優秀 | 良好 | 簡單 |
| GPT-4 | 較貴 | 最佳 | 優秀 | 簡單 |
| Claude 3 | 付費 | 優秀 | 良好 | 中等 |

## 推薦方案

對於您的電商比價助手，我推薦使用 **Google Gemini 2.0 Flash**：

✅ **優點**：
- 有慷慨的免費額度
- 對繁體中文支援優秀
- 回應速度快
- 適合電商場景

✅ **為什麼適合您的項目**：
- 您的 `mainAgent.py` 已經設計用於 Gemini
- 免費額度足夠測試和小規模使用
- 回應品質高，適合客服場景

## 快速啟用步驟

1. 取得 Gemini API 金鑰
2. 在專案根目錄創建 `.env.local`：
   ```
   GEMINI_API_KEY=your_api_key_here
   ```
3. 安裝套件：
   ```bash
   npm install @google/generative-ai
   ```
4. 取消註解 `app/api/ai-assistant/route.ts` 中的 AI 代碼
5. 重啟開發伺服器

## 測試 AI 功能

啟用 AI 後，您可以測試：
- 複雜的商品查詢
- 多輪對話
- 個性化推薦
- 自然語言理解

## 費用考量

- **Gemini**: 每月 15 次/分鐘，100萬 token/天 免費
- **GPT-3.5**: $0.001/1K tokens (輸入) + $0.002/1K tokens (輸出)
- **GPT-4**: $0.03/1K tokens (輸入) + $0.06/1K tokens (輸出)

對於測試和初期使用，Gemini 的免費額度應該足夠。

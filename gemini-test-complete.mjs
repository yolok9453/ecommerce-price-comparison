/**
 * Google Gemini AI 官方程式碼測試結果
 * 測試日期: 2025-08-29
 */

// ===== 原始官方程式碼 =====
/*
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
}

await main();
*/

// ===== 修正後的可執行版本 =====
import 'dotenv/config';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY,
});

async function testOfficialCode() {
    console.log("🧪 測試 Google Gemini AI 官方程式碼");
    console.log("=" .repeat(50));
    
    try {
        console.log("📡 正在連接 Gemini API...");
        
        const response = await ai.models.generateContent({
            model: "gemini-1.5-flash", // 修正: gemini-2.5-flash -> gemini-1.5-flash
            contents: "Explain how AI works in a few words",
        });
        
        console.log("✅ API 調用成功!");
        console.log("📋 回應內容:");
        console.log("-".repeat(30));
        console.log(response.text);
        console.log("-".repeat(30));
        
    } catch (error) {
        console.log("❌ API 調用失敗:");
        
        if (error.status === 429) {
            console.log("📊 配額限制錯誤 - API 每分鐘請求次數已達上限");
            console.log("💡 建議解決方案:");
            console.log("   1. 等待一分鐘後重新嘗試");
            console.log("   2. 檢查 Google Cloud 配額設定");
            console.log("   3. 升級到付費方案以獲得更高配額");
        } else if (error.status === 401) {
            console.log("🔑 認證錯誤 - API Key 無效或未設定");
        } else {
            console.log("🔍 其他錯誤:", error.message || error);
        }
    }
}

async function testCodeStructure() {
    console.log("\n🔍 程式碼結構分析");
    console.log("=" .repeat(50));
    
    // 檢查 API Key
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY;
    console.log("🔑 API Key 狀態:", apiKey ? "✅ 已設定" : "❌ 未設定");
    
    // 檢查模組載入
    try {
        console.log("📦 @google/genai 模組:", "✅ 載入成功");
    } catch (error) {
        console.log("📦 @google/genai 模組:", "❌ 載入失敗");
    }
    
    // 檢查 AI 實例
    console.log("🤖 GoogleGenAI 實例:", ai ? "✅ 建立成功" : "❌ 建立失敗");
    
    console.log("\n📝 原始程式碼問題:");
    console.log("1. GoogleGenAI({}) - 缺少 API Key 設定");
    console.log("2. gemini-2.5-flash - 可能不是有效的模型名稱");
    console.log("3. 缺少錯誤處理機制");
}

// 執行測試
await testCodeStructure();
await testOfficialCode();

console.log("\n✨ 測試完成！");

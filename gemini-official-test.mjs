import 'dotenv/config';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY,
});

async function main() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Explain how AI works in a few words",
    });
    console.log(response.text);
  } catch (error) {
    console.error("Error calling Gemini API:", error.message || error);
  }
}

await main();

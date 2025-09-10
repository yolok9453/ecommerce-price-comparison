import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'

// 初始化 Google AI
const ai = new GoogleGenAI({});

// 模擬商品數據結構
interface Product {
  name: string
  price: number
  store: string
  url?: string
  discount?: number
  description?: string
}

interface AIResponse {
  response: string
  products: Product[]
}

// 伺服器端快取
const responseCache = new Map<string, AIResponse>()

// 模擬關鍵詞提取功能
function extractKeywords(userInput: string, chatHistory: Array<{user: string, assistant: string}>): string {
  // 簡化的關鍵詞提取邏輯
  const productKeywords = ['手機', 'iPhone', '筆電', '筆記型電腦', '滑鼠', '鍵盤', '耳機', 'AirPods', 'Switch', '遊戲機']
  const searchKeywords = ['找', '買', '推薦', '比價', '便宜', '划算', '優惠']
  
  let keywords = ''
  
  // 檢查是否包含商品關鍵詞
  for (const keyword of productKeywords) {
    if (userInput.includes(keyword)) {
      keywords += keyword + ' '
    }
  }
  
  // 檢查是否包含搜尋意圖
  const hasSearchIntent = searchKeywords.some(keyword => userInput.includes(keyword))
  
  return keywords.trim()
}

// 模擬商品搜尋功能
async function searchProducts(query: string): Promise<Product[]> {
  // 這裡應該連接到實際的爬蟲工具或資料庫
  // 現在使用模擬資料
  const mockProducts: Record<string, Product[]> = {
    'iPhone': [
      {
        name: 'iPhone 15 128GB',
        price: 26900,
        store: 'PChome 24h',
        url: 'https://example.com/iphone15',
        discount: 10,
        description: '最新款 iPhone 15，A17 Pro 晶片，價格優惠'
      },
      {
        name: 'iPhone 15 128GB',
        price: 27200,
        store: 'momo購物',
        url: 'https://example.com/iphone15-momo',
        discount: 9,
        description: '快速到貨，提供完整保固服務'
      },
      {
        name: 'iPhone 14 128GB',
        price: 23900,
        store: 'Yahoo購物中心',
        url: 'https://example.com/iphone14',
        discount: 15,
        description: '經典款式，性價比極高，適合預算有限的用戶'
      },
      {
        name: 'iPhone 15 Plus 128GB',
        price: 29900,
        store: 'Apple Store',
        url: 'https://example.com/iphone15plus',
        discount: 5,
        description: '大螢幕版本，電池續航更持久'
      }
    ],
    '筆電': [
      {
        name: 'MacBook Air M3 13吋 8GB/256GB',
        price: 35900,
        store: 'Apple Store',
        url: 'https://example.com/macbook',
        discount: 8,
        description: '輕薄高效，M3晶片強勁性能，適合辦公和創作'
      },
      {
        name: 'ASUS VivoBook 15 i5/8GB/512GB',
        price: 18900,
        store: 'ASUS官網',
        url: 'https://example.com/asus',
        discount: 15,
        description: '價格親民，功能齊全，學生和上班族首選'
      },
      {
        name: 'Lenovo ThinkPad E14 i7/16GB/512GB',
        price: 32900,
        store: 'Lenovo官網',
        url: 'https://example.com/lenovo',
        discount: 12,
        description: '商務首選，鍵盤手感佳，穩定可靠'
      },
      {
        name: 'ASUS ROG Strix G15 RTX4060/16GB',
        price: 45900,
        store: '原價屋',
        url: 'https://example.com/rog',
        discount: 18,
        description: '電競專用，高效能顯卡，遊戲體驗絕佳'
      },
      {
        name: 'Dell Inspiron 15 i5/8GB/512GB',
        price: 21900,
        store: 'Dell官網',
        url: 'https://example.com/dell',
        discount: 10,
        description: '穩定可靠，適合日常辦公和娛樂'
      }
    ],
    '滑鼠': [
      {
        name: 'Logitech MX Master 3',
        price: 2890,
        store: '羅技官網',
        url: 'https://example.com/mx-master',
        discount: 5,
        description: '頂級商務滑鼠，多設備切換，精準操控'
      },
      {
        name: 'Razer DeathAdder V3',
        price: 1990,
        store: 'Razer Store',
        url: 'https://example.com/razer',
        discount: 10,
        description: '電競專用，30000 DPI感應器，反應迅速'
      },
      {
        name: 'Apple Magic Mouse',
        price: 2590,
        store: 'Apple Store',
        url: 'https://example.com/magic-mouse',
        discount: 0,
        description: 'Mac專用，觸控手勢支援，設計簡約'
      },
      {
        name: 'SteelSeries Rival 3',
        price: 1290,
        store: 'PChome 24h',
        url: 'https://example.com/rival3',
        discount: 20,
        description: '高CP值電競滑鼠，RGB燈效，輕量化設計'
      }
    ],
    '耳機': [
      {
        name: 'Apple AirPods Pro 2',
        price: 7990,
        store: 'Apple Store',
        url: 'https://example.com/airpods-pro',
        discount: 5,
        description: '主動降噪，空間音訊，iPhone完美搭配'
      },
      {
        name: 'Sony WH-1000XM5',
        price: 9990,
        store: 'Sony Store',
        url: 'https://example.com/sony-wh1000xm5',
        discount: 12,
        description: '業界頂級降噪，30小時續航，音質卓越'
      },
      {
        name: 'Bose QuietComfort 45',
        price: 8990,
        store: 'Bose官網',
        url: 'https://example.com/bose-qc45',
        discount: 8,
        description: '舒適配戴，優秀降噪，商務旅行首選'
      }
    ],
    '鍵盤': [
      {
        name: 'Logitech MX Keys',
        price: 3290,
        store: '羅技官網',
        url: 'https://example.com/mx-keys',
        discount: 10,
        description: '無線商務鍵盤，背光設計，多設備切換'
      },
      {
        name: 'Cherry MX Board 3.0S',
        price: 2990,
        store: 'Cherry官網',
        url: 'https://example.com/cherry-mx',
        discount: 15,
        description: '德國原廠軸體，機械手感，耐用可靠'
      },
      {
        name: 'Razer BlackWidow V4',
        price: 4590,
        store: 'Razer Store',
        url: 'https://example.com/blackwidow',
        discount: 20,
        description: '電競機械鍵盤，RGB燈效，綠軸清脆手感'
      }
    ],
    'Switch': [
      {
        name: 'Nintendo Switch OLED 主機',
        price: 10780,
        store: '任天堂官網',
        url: 'https://example.com/switch-oled',
        discount: 0,
        description: 'OLED螢幕升級版，色彩更鮮艷，攜帶更方便'
      },
      {
        name: 'Nintendo Switch 主機 電光藍/紅',
        price: 9780,
        store: 'momo購物',
        url: 'https://example.com/switch-neon',
        discount: 5,
        description: '經典款式，雙人同樂，豐富遊戲陣容'
      }
    ]
  }
  
  // 根據關鍵詞搜尋商品，支援模糊搜尋
  let results: Product[] = []
  const searchQuery = query.toLowerCase()
  
  for (const [key, products] of Object.entries(mockProducts)) {
    if (searchQuery.includes(key.toLowerCase()) || 
        key.toLowerCase().includes(searchQuery) ||
        products.some(p => p.name.toLowerCase().includes(searchQuery))) {
      results = [...results, ...products]
    }
  }
  
  // 如果沒有找到直接匹配的，嘗試部分匹配
  if (results.length === 0) {
    for (const [key, products] of Object.entries(mockProducts)) {
      if (products.some(p => 
          p.name.toLowerCase().includes(searchQuery) ||
          p.description?.toLowerCase().includes(searchQuery)
        )) {
        results = [...results, ...products]
      }
    }
  }
  
  // 按照性價比排序（考慮價格和折扣）
  return results.sort((a, b) => {
    const scoreA = a.discount || 0
    const scoreB = b.discount || 0
    return scoreB - scoreA
  }).slice(0, 6) // 最多返回6個商品
}

// 生成 AI 回應 - 使用 Google Gemini
async function generateResponse(userInput: string, products: Product[], chatHistory: Array<{user: string, assistant: string}>): Promise<string> {
  
  // 🤖 使用真正的 AI 模型
  if (ai) {
    try {
      const systemPrompt = `你是一個親切、積極主動的台灣電商客服助手，專為台灣用戶服務。你的任務是：

1. 以友善、像跟朋友聊天一樣的語氣回應用戶，無論是閒聊、回答問題還是提供商品推薦。
2. 根據用戶請求和對話歷史，提供連貫且貼心的回應，使用台灣慣用的表達方式。
3. 如果用戶提到想找商品、買東西或比價，主動分析需求並推薦適合的商品。
4. 如果用戶需求模糊，主動詢問具體規格（如品牌、數量、價格範圍、平台偏好）以便提供更精準推薦。
5. 如果沒有商品資料，主動建議用戶提供更多細節並推薦常見規格。
6. 在推薦時，詳細說明每個商品的推薦理由，為什麼推薦這些商品（價格、優點、可靠性等）。
7. 並且在推薦時，考慮各平台的優缺點（如價格、運費、評價等），並在推薦理由中提及。
8. 在推薦後，主動問用戶是否滿意或需要其他規格的商品。

商品資料：${JSON.stringify(products, null, 2)}

對話歷史：${JSON.stringify(chatHistory.slice(-3), null, 2)}

請用繁體中文回應，並提供實用的購物建議。如果有商品資料，請以友善的方式介紹商品特色和比價結果。`

      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: `${systemPrompt}\n\n用戶問題：${userInput}`
      })
      
      const aiText = result.text
      
      return aiText || "抱歉，我現在無法處理您的請求。"
      
    } catch (error: any) {
      console.error('AI 模型錯誤:', error)
      
      // 如果是配額或權限問題，提供友善的錯誤訊息
      if (error?.status === 429) {
        console.warn('Gemini API 配額已用完，切換到規則式回應')
        // 繼續使用規則式系統
      } else if (error?.status === 401 || error?.status === 403) {
        console.warn('Gemini API 認證失敗，切換到規則式回應')
        // 繼續使用規則式系統
      } else {
        console.error('未知的 AI 錯誤:', error?.message || error)
        // 繼續使用規則式系統
      }
    }
  }

  // 規則式回應系統 (備援)
  return generateRuleBasedResponse(userInput, products, chatHistory)
}

// 規則式回應生成器
function generateRuleBasedResponse(userInput: string, products: Product[], chatHistory: Array<{user: string, assistant: string}>): string {
  // 檢查是否是閒聊或非商品相關的問題
  const casualGreetings = ['你好', '嗨', '哈囉', '安安', '早安', '午安', '晚安', '謝謝', '再見']
  const aboutQuestions = ['你是誰', '你是什麼', '介紹自己', '功能']
  
  if (casualGreetings.some(greeting => userInput.includes(greeting))) {
    return "您好！很高興為您服務！😊 我是專業的比價助手，可以幫您找到最優惠的商品價格。有什麼想買的東西嗎？"
  }
  
  if (aboutQuestions.some(question => userInput.includes(question))) {
    return "我是比價王AI助手！🤖 我的專長是幫您：\n\n• 🔍 搜尋各大電商平台的商品\n• 💰 找出最優惠的價格\n• 📊 比較不同商家的報價\n• 🎯 根據您的需求推薦合適商品\n\n想找什麼好東西嗎？告訴我吧！"
  }
  
  if (products.length === 0) {
    const suggestions = [
      "iPhone 15", "MacBook Air", "iPad", "筆記型電腦", 
      "無線滑鼠", "機械鍵盤", "藍牙耳機", "智慧手錶"
    ]
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)]
    
    return `很抱歉，目前沒有找到關於「${userInput}」的商品資料。\n\n💡 **建議**：\n• 試試更具體的關鍵詞（例如：${randomSuggestion}）\n• 包含品牌名稱會更精準\n• 或者告訴我您的預算和需求\n\n我會持續為您搜尋最新的優惠資訊！有其他想找的商品嗎？😊`
  }
  
  const cheapest = products.reduce((min, product) => product.price < min.price ? product : min)
  const mostExpensive = products.reduce((max, product) => product.price > max.price ? product : max)
  const avgPrice = Math.round(products.reduce((sum, product) => sum + product.price, 0) / products.length)
  
  let response = `🎉 **搜尋完成！** 我為您找到了 ${products.length} 個優質選擇\n\n`
  response += `💰 **價格範圍**：NT$ ${cheapest.price.toLocaleString()} - NT$ ${mostExpensive.price.toLocaleString()}\n`
  response += `📊 **平均價格**：NT$ ${avgPrice.toLocaleString()}\n`
  response += `🏆 **最優惠**：${cheapest.name} (${cheapest.store})\n\n`
  
  // 根據價格差異給出建議
  const priceDiff = mostExpensive.price - cheapest.price
  if (priceDiff > 5000) {
    response += `� **省錢提醒**：最貴和最便宜的差了 NT$ ${priceDiff.toLocaleString()}！建議仔細比較規格和服務。\n\n`
  }
  
  response += `以下是詳細推薦（已按性價比排序）：`
  
  return response
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, chatHistory = [] } = body
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: '請提供有效的訊息' },
        { status: 400 }
      )
    }

    // 檢查快取
    if (responseCache.has(message)) {
      console.log('從快取提供回應')
      return NextResponse.json(responseCache.get(message))
    }
    
    // 提取關鍵詞
    const keywords = extractKeywords(message, chatHistory)
    
    // 如果沒有商品相關關鍵詞，直接回應
    if (!keywords) {
      const response: AIResponse = {
        response: "您好！我是比價王AI助手 😊 我可以幫您找到最優惠的商品價格和推薦。請告訴我您想要什麼商品？比如「iPhone 15」、「筆記型電腦」或「遊戲滑鼠」等等！",
        products: []
      }
      return NextResponse.json(response)
    }
    
    // 搜尋商品
    const products = await searchProducts(keywords)
    
    // 生成回應
    const responseText = await generateResponse(message, products, chatHistory)
    
    const response: AIResponse = {
      response: responseText,
      products: products.slice(0, 5) // 限制最多返回5個商品
    }
    
    // 儲存到快取
    responseCache.set(message, response)

    return NextResponse.json(response)
    
  } catch (error) {
    console.error('AI Assistant API Error:', error)
    return NextResponse.json(
      { error: '伺服器錯誤，請稍後再試' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ message: 'AI Assistant API is running' })
}

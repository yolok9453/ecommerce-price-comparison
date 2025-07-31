"use client"

import { useState } from "react"
import { Send, Bot, User, Sparkles, TrendingUp, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

const suggestedQuestions = [
  "幫我找最便宜的iPhone 15",
  "推薦性價比高的筆電",
  "哪裡買Switch最划算？",
  "比較AirPods和Sony耳機",
  "預算3萬的手機推薦",
  "最新優惠有哪些？",
]

const mockResponses = {
  "幫我找最便宜的iPhone 15": {
    text: "根據最新比價資料，iPhone 15 128GB目前最低價格是NT$ 26,900，在PChome 24h購物。相比原價NT$ 29,900，可以省下NT$ 3,000！",
    products: [
      { name: "iPhone 15 128GB", price: 26900, store: "PChome 24h", discount: 10 },
      { name: "iPhone 15 128GB", price: 27200, store: "momo購物", discount: 9 },
    ],
  },
  推薦性價比高的筆電: {
    text: "為您推薦幾款高性價比筆電：MacBook Air M3性能優異，ASUS VivoBook價格親民，Lenovo ThinkPad商務首選。",
    products: [
      { name: "MacBook Air M3", price: 35900, store: "多家商店", discount: 8 },
      { name: "ASUS VivoBook 15", price: 18900, store: "多家商店", discount: 15 },
    ],
  },
}

interface Message {
  id: number
  type: "user" | "ai"
  content: string
  products?: Array<{
    name: string
    price: number
    store: string
    discount: number
  }>
  timestamp: Date
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "ai",
      content:
        "您好！我是比價王AI助手 🤖 我可以幫您：\n\n• 找到最優惠的商品價格\n• 推薦性價比高的產品\n• 比較不同商品的優缺點\n• 提供購物建議和優惠資訊\n\n請告訴我您想要什麼商品，或點擊下方的建議問題！",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      content: message,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const response = mockResponses[message as keyof typeof mockResponses] || {
        text: `我正在為您搜尋「${message}」的相關資訊，請稍候...`,
        products: [],
      }

      const aiMessage: Message = {
        id: Date.now() + 1,
        type: "ai",
        content: response.text,
        products: response.products,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Bot className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-primary">AI購物助手</h1>
              <p className="text-sm text-gray-600">智能比價，精準推薦</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <Search className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">智能搜尋</h3>
                <p className="text-sm text-gray-600">描述需求，AI幫您找到最適合的商品</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">價格分析</h3>
                <p className="text-sm text-gray-600">即時比價，找出最優惠的購買時機</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Sparkles className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">個人推薦</h3>
                <p className="text-sm text-gray-600">根據預算和需求，提供客製化建議</p>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bot className="w-5 h-5 mr-2" />
                對話助手
                <Badge variant="secondary" className="ml-2">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI驅動
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex items-start space-x-2 max-w-[80%] ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === "user" ? "bg-primary" : "bg-gray-100"}`}
                        >
                          {message.type === "user" ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <Bot className="w-4 h-4 text-gray-600" />
                          )}
                        </div>
                        <div
                          className={`rounded-lg p-3 ${message.type === "user" ? "bg-primary text-white" : "bg-gray-100"}`}
                        >
                          <p className="whitespace-pre-line">{message.content}</p>
                          {message.products && message.products.length > 0 && (
                            <div className="mt-3 space-y-2">
                              {message.products.map((product, index) => (
                                <div key={index} className="bg-white rounded p-2 text-gray-900">
                                  <div className="flex justify-between items-center">
                                    <span className="font-medium">{product.name}</span>
                                    <Badge variant="destructive">-{product.discount}%</Badge>
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    NT$ {product.price.toLocaleString()} - {product.store}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-start space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <Bot className="w-4 h-4 text-gray-600" />
                        </div>
                        <div className="bg-gray-100 rounded-lg p-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Suggested Questions */}
              {messages.length === 1 && (
                <div className="p-4 border-t bg-gray-50">
                  <p className="text-sm text-gray-600 mb-3">💡 試試這些問題：</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestedQuestion(question)}
                        className="text-xs"
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="請輸入您想要的商品或問題..."
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                    disabled={isTyping}
                  />
                  <Button onClick={() => handleSendMessage(inputValue)} disabled={isTyping || !inputValue.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

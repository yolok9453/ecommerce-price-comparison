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
  "哪裡買Nintendo Switch最划算？",
  "比較MacBook和Windows筆電",
  "預算2萬的遊戲筆電推薦",
  "最新手機優惠有哪些？",
  "推薦好用的無線滑鼠",
  "電競鍵盤推薦",
]

interface Product {
  name: string
  price: number
  store: string
  url?: string
  discount?: number
  description?: string
}

interface Message {
  id: number
  type: "user" | "ai"
  content: string
  products?: Product[]
  timestamp: Date
}

interface ChatHistory {
  user: string
  assistant: string
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
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([])

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

    try {
      // Call AI Assistant API
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          chatHistory,
        }),
      })

      if (!response.ok) {
        throw new Error('API request failed')
      }

      const data = await response.json()

      const aiMessage: Message = {
        id: Date.now() + 1,
        type: "ai",
        content: data.response,
        products: data.products || [],
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      
      // Update chat history for context
      setChatHistory((prev) => [
        ...prev,
        { user: message, assistant: data.response }
      ])

    } catch (error) {
      console.error('Error calling AI assistant:', error)
      
      const errorMessage: Message = {
        id: Date.now() + 1,
        type: "ai",
        content: "抱歉，目前服務暫時無法使用，請稍後再試。如果問題持續，請聯繫客服人員。",
        timestamp: new Date(),
      }
      
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
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
                            <div className="mt-3 space-y-3">
                              {message.products.map((product, index) => (
                                <div key={index} className="bg-white rounded-lg p-3 text-gray-900 border border-gray-200">
                                  <div className="flex justify-between items-start mb-2">
                                    <div className="flex-1">
                                      <h4 className="font-medium text-sm">{product.name}</h4>
                                      <p className="text-xs text-gray-500 mt-1">{product.store}</p>
                                      {product.description && (
                                        <p className="text-xs text-gray-600 mt-1">{product.description}</p>
                                      )}
                                    </div>
                                    {product.discount && (
                                      <Badge variant="destructive" className="text-xs">
                                        -{product.discount}%
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-primary">
                                      NT$ {product.price.toLocaleString()}
                                    </span>
                                    {product.url && (
                                      <Button 
                                        variant="outline" 
                                        size="sm" 
                                        className="text-xs"
                                        onClick={() => window.open(product.url, '_blank')}
                                      >
                                        查看商品
                                      </Button>
                                    )}
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

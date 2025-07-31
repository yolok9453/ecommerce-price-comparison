import { Search, TrendingUp, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

const dailyDeals = [
  {
    id: 1,
    name: "iPhone 15 Pro 128GB",
    image: "/placeholder.svg?height=200&width=200",
    category: "手機",
    originalPrice: 35900,
    dealPrice: 32900,
    discount: 8,
    stores: 8,
    rating: 4.8,
    timeLeft: "23:45:30",
    dealType: "限時特價",
  },
  {
    id: 2,
    name: "MacBook Air M3 13吋",
    image: "/placeholder.svg?height=200&width=200",
    category: "筆電",
    originalPrice: 39900,
    dealPrice: 35900,
    discount: 10,
    stores: 12,
    rating: 4.9,
    timeLeft: "15:22:45",
    dealType: "今日最低價",
  },
  {
    id: 3,
    name: "Sony WH-1000XM5 無線耳機",
    image: "/placeholder.svg?height=200&width=200",
    category: "耳機",
    originalPrice: 11900,
    dealPrice: 8990,
    discount: 24,
    stores: 15,
    rating: 4.7,
    timeLeft: "08:15:20",
    dealType: "閃購優惠",
  },
  {
    id: 4,
    name: "Nintendo Switch OLED",
    image: "/placeholder.svg?height=200&width=200",
    category: "遊戲機",
    originalPrice: 12800,
    dealPrice: 10780,
    discount: 16,
    stores: 6,
    rating: 4.6,
    timeLeft: "12:30:15",
    dealType: "每日精選",
  },
  {
    id: 5,
    name: "AirPods Pro 第3代",
    image: "/placeholder.svg?height=200&width=200",
    category: "耳機",
    originalPrice: 7490,
    dealPrice: 6290,
    discount: 16,
    stores: 10,
    rating: 4.5,
    timeLeft: "19:45:30",
    dealType: "限量特價",
  },
  {
    id: 6,
    name: "Samsung Galaxy S24 Ultra",
    image: "/placeholder.svg?height=200&width=200",
    category: "手機",
    originalPrice: 42900,
    dealPrice: 38900,
    discount: 9,
    stores: 7,
    rating: 4.7,
    timeLeft: "06:20:45",
    dealType: "今日最低價",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary">比價王</h1>
              <Badge variant="secondary" className="hidden md:inline-flex">
                <TrendingUp className="w-3 h-3 mr-1" />
                即時比價
              </Badge>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="#" className="text-sm font-medium hover:text-primary">
                熱門商品
              </Link>
              <Link href="#" className="text-sm font-medium hover:text-primary">
                AI助手
              </Link>
              <Link href="/deals" className="text-sm font-medium hover:text-primary">
                優惠情報
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">找到最優惠的價格</h2>
            <p className="text-xl text-gray-600 mb-8">比較數百家商店，為您找到最划算的商品價格</p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input type="text" placeholder="搜尋商品名稱或型號..." className="pl-10 pr-4 py-3 text-lg" />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2">搜尋</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Deals */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">🔥 每日優惠</h3>
            <p className="text-lg text-gray-600">限時特價，錯過不再！</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dailyDeals.map((deal) => (
              <Card key={deal.id} className="hover:shadow-lg transition-shadow relative overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative">
                    <img src={deal.image || "/placeholder.svg"} alt={deal.name} className="w-full h-48 object-cover" />
                    <Badge className="absolute top-2 left-2 bg-red-500">{deal.dealType}</Badge>
                    <Badge className="absolute top-2 right-2 bg-orange-500">-{deal.discount}%</Badge>
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      ⏰ {deal.timeLeft}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <Badge variant="secondary" className="mb-2">
                    {deal.category}
                  </Badge>
                  <CardTitle className="text-lg mb-2 line-clamp-2">{deal.name}</CardTitle>
                  <div className="flex items-center mb-3">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600 ml-1">
                      {deal.rating} ({deal.stores} 家商店)
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">原價</span>
                      <span className="text-sm text-gray-400 line-through">
                        NT$ {deal.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">特價</span>
                      <span className="text-xl font-bold text-red-600">NT$ {deal.dealPrice.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="text-center">
                      <span className="text-sm text-red-600 font-medium">
                        立省 NT$ {(deal.originalPrice - deal.dealPrice).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-red-600 hover:bg-red-700" asChild>
                    <Link href={`/product/${deal.id}`}>立即搶購</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              查看更多優惠
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-gray-600">合作商店</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100萬+</div>
              <div className="text-gray-600">商品數量</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50萬+</div>
              <div className="text-gray-600">用戶數量</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24小時</div>
              <div className="text-gray-600">即時更新</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">比價王</h4>
              <p className="text-gray-400">台灣最大的電商比價平台，幫您找到最優惠的商品價格。</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">商品分類</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    手機
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    筆電
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    家電
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    遊戲
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">服務</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    價格追蹤
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    優惠通知
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    商店評價
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    購物指南
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">聯絡我們</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    客服中心
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    合作提案
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    意見回饋
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    關於我們
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-gray-700" />
          <div className="text-center text-gray-400">
            <p>&copy; 2024 比價王. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

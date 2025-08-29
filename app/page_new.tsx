import { Search, TrendingUp, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { getDailyDeals, getPopularProducts } from "@/lib/api"
import { DailyDeal, Product } from "@/lib/supabase"

// 將數據庫資料轉換為顯示格式的輔助函數
function transformDailyDeal(deal: DailyDeal) {
  // 計算假設的原價 (增加 20-30% 作為原價)
  const discountRate = Math.floor(Math.random() * 11) + 20; // 20-30% 折扣
  const originalPrice = deal.price ? Math.floor(deal.price * (100 + discountRate) / 100) : 0;
  
  return {
    id: deal.id,
    name: deal.title,
    image: deal.image_url || "/placeholder.svg?height=200&width=200",
    category: getCategoryFromTitle(deal.title),
    originalPrice: originalPrice,
    dealPrice: deal.price || 0,
    discount: discountRate,
    stores: Math.floor(Math.random() * 10) + 5, // 隨機商店數量
    rating: (Math.random() * 1 + 4).toFixed(1), // 4.0-5.0 評分
    timeLeft: generateRandomTimeLeft(),
    dealType: getPlatformDealType(deal.platform),
    url: deal.url
  };
}

function getCategoryFromTitle(title: string): string {
  if (title.includes('iPhone') || title.includes('手機')) return '手機';
  if (title.includes('筆電') || title.includes('MacBook') || title.includes('LG')) return '筆電';
  if (title.includes('耳機') || title.includes('SONY WI') || title.includes('AirPods')) return '耳機';
  if (title.includes('電視') || title.includes('顯示器')) return '家電';
  if (title.includes('掃地機器人') || title.includes('冷氣') || title.includes('立扇')) return '家電';
  if (title.includes('保健') || title.includes('益生菌') || title.includes('魚油')) return '保健';
  if (title.includes('洗髮精') || title.includes('護膚')) return '美妝保養';
  return '其他';
}

function getPlatformDealType(platform: string): string {
  switch (platform) {
    case 'pchome_onsale': return '限時特價';
    case 'yahoo_rushbuy': return '搶購優惠';
    default: return '今日最低價';
  }
}

function generateRandomTimeLeft(): string {
  const hours = Math.floor(Math.random() * 24);
  const minutes = Math.floor(Math.random() * 60);
  const seconds = Math.floor(Math.random() * 60);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export default async function HomePage() {
  // 從 Supabase 獲取數據
  const dailyDealsData = await getDailyDeals();
  const popularProductsData = await getPopularProducts(6);
  
  // 轉換數據格式
  const dailyDeals = dailyDealsData.slice(0, 6).map(transformDailyDeal);
  
  const trendingSearches = [
    "iPhone 15 Pro", "MacBook Air M3", "AirPods Pro", "iPad Pro", 
    "Nintendo Switch", "Sony耳機", "筆電", "手機殼"
  ];

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
                    <Link href={deal.url || "#"} target="_blank">立即搶購</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild>
              <Link href="/deals">查看更多優惠</Link>
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
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; 2025 比價王. 版權所有.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

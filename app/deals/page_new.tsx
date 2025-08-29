import { Clock, Star, ExternalLink, Filter, Grid, List, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { getDailyDeals, getDailyDealsByPlatform } from "@/lib/api"
import { DailyDeal } from "@/lib/supabase"

// 平台配置
const platformConfig = {
  pchome_onsale: {
    name: "PChome 24h購物",
    logo: "/placeholder.svg?height=40&width=120&text=PChome",
    color: "bg-orange-500",
    displayName: "PChome特價"
  },
  yahoo_rushbuy: {
    name: "Yahoo購物中心",
    logo: "/placeholder.svg?height=40&width=120&text=Yahoo",
    color: "bg-purple-500",
    displayName: "Yahoo搶購"
  }
};

// 轉換數據格式的函數
function transformDeal(deal: DailyDeal) {
  const discountRate = Math.floor(Math.random() * 26) + 10; // 10-35% 折扣
  const originalPrice = deal.price ? Math.floor(deal.price * (100 + discountRate) / 100) : 0;
  
  return {
    id: deal.id,
    name: deal.title,
    image: deal.image_url || "/placeholder.svg?height=200&width=200",
    originalPrice: originalPrice,
    salePrice: deal.price || 0,
    discount: discountRate,
    category: getCategoryFromTitle(deal.title),
    rating: (Math.random() * 1 + 4).toFixed(1),
    timeLeft: generateRandomTimeLeft(),
    dealType: getDealType(deal.platform),
    shipping: getShippingInfo(deal.platform),
    url: deal.url,
    platform: deal.platform
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
  if (title.includes('服飾') || title.includes('內衣')) return '服飾';
  if (title.includes('食品') || title.includes('油')) return '食品';
  return '其他';
}

function getDealType(platform: string): string {
  switch (platform) {
    case 'pchome_onsale': return '24h限時';
    case 'yahoo_rushbuy': return '搶購優惠';
    default: return '限時特價';
  }
}

function getShippingInfo(platform: string): string {
  switch (platform) {
    case 'pchome_onsale': return '24小時到貨';
    case 'yahoo_rushbuy': return '免運費';
    default: return '標準運費';
  }
}

function generateRandomTimeLeft(): string {
  const hours = Math.floor(Math.random() * 24);
  const minutes = Math.floor(Math.random() * 60);
  const seconds = Math.floor(Math.random() * 60);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export default async function DealsPage() {
  // 從 Supabase 獲取各平台數據
  const allDeals = await getDailyDeals();
  const pchomeDeals = await getDailyDealsByPlatform('pchome_onsale');
  const yahooDeals = await getDailyDealsByPlatform('yahoo_rushbuy');

  // 轉換數據格式
  const transformedAllDeals = allDeals.map(transformDeal);
  const transformedPchomeDeals = pchomeDeals.map(transformDeal);
  const transformedYahooDeals = yahooDeals.map(transformDeal);

  const platformDeals = {
    pchome_onsale: {
      ...platformConfig.pchome_onsale,
      totalDeals: transformedPchomeDeals.length,
      deals: transformedPchomeDeals.slice(0, 6)
    },
    yahoo_rushbuy: {
      ...platformConfig.yahoo_rushbuy,
      totalDeals: transformedYahooDeals.length,
      deals: transformedYahooDeals.slice(0, 6)
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-primary">比價王</Link>
              <Badge variant="secondary" className="hidden md:inline-flex">
                <TrendingDown className="w-3 h-3 mr-1" />
                優惠情報
              </Badge>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-sm font-medium hover:text-primary">
                首頁
              </Link>
              <Link href="#" className="text-sm font-medium hover:text-primary">
                熱門商品
              </Link>
              <Link href="#" className="text-sm font-medium hover:text-primary">
                AI助手
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">🎯 限時優惠情報</h1>
          <p className="text-lg text-gray-600">精選各大平台最優惠商品，錯過不再！</p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-4 mb-8 justify-between items-center">
          <div className="flex gap-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="選擇分類" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部分類</SelectItem>
                <SelectItem value="手機">手機</SelectItem>
                <SelectItem value="筆電">筆電</SelectItem>
                <SelectItem value="家電">家電</SelectItem>
                <SelectItem value="耳機">耳機</SelectItem>
                <SelectItem value="保健">保健</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="discount">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="排序方式" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="discount">折扣由高到低</SelectItem>
                <SelectItem value="price-low">價格由低到高</SelectItem>
                <SelectItem value="price-high">價格由高到低</SelectItem>
                <SelectItem value="time">剩餘時間</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Grid className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Platform Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">全部優惠 ({transformedAllDeals.length})</TabsTrigger>
            <TabsTrigger value="pchome_onsale">PChome ({transformedPchomeDeals.length})</TabsTrigger>
            <TabsTrigger value="yahoo_rushbuy">Yahoo ({transformedYahooDeals.length})</TabsTrigger>
          </TabsList>

          {/* All Deals Tab */}
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {transformedAllDeals.slice(0, 12).map((deal) => (
                <Card key={deal.id} className="hover:shadow-lg transition-shadow relative overflow-hidden">
                  <CardHeader className="p-0">
                    <div className="relative">
                      <img src={deal.image} alt={deal.name} className="w-full h-48 object-cover" />
                      <Badge className="absolute top-2 left-2 bg-red-500">{deal.dealType}</Badge>
                      <Badge className="absolute top-2 right-2 bg-orange-500">-{deal.discount}%</Badge>
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                        <Clock className="w-3 h-3 inline mr-1" />
                        {deal.timeLeft}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{deal.category}</Badge>
                      <Badge variant="outline" className={platformConfig[deal.platform as keyof typeof platformConfig]?.color || "bg-gray-500"}>
                        {platformConfig[deal.platform as keyof typeof platformConfig]?.displayName || deal.platform}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mb-2 line-clamp-2">{deal.name}</CardTitle>
                    <div className="flex items-center mb-3">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600 ml-1">{deal.rating}</span>
                      <span className="text-sm text-gray-400 ml-2">{deal.shipping}</span>
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
                        <span className="text-xl font-bold text-red-600">NT$ {deal.salePrice.toLocaleString()}</span>
                      </div>
                      <Separator />
                      <div className="text-center">
                        <span className="text-sm text-red-600 font-medium">
                          立省 NT$ {(deal.originalPrice - deal.salePrice).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-red-600 hover:bg-red-700" asChild>
                      <Link href={deal.url || "#"} target="_blank" rel="noopener noreferrer">
                        立即搶購 <ExternalLink className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Platform-specific tabs */}
          {Object.entries(platformDeals).map(([platformKey, platform]) => (
            <TabsContent key={platformKey} value={platformKey}>
              <div className="mb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-12 h-12 rounded-lg ${platform.color} flex items-center justify-center text-white font-bold`}>
                    {platform.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{platform.name}</h2>
                    <p className="text-gray-600">{platform.totalDeals} 個優惠商品</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {platform.deals.map((deal) => (
                  <Card key={deal.id} className="hover:shadow-lg transition-shadow relative overflow-hidden">
                    <CardHeader className="p-0">
                      <div className="relative">
                        <img src={deal.image} alt={deal.name} className="w-full h-48 object-cover" />
                        <Badge className="absolute top-2 left-2 bg-red-500">{deal.dealType}</Badge>
                        <Badge className="absolute top-2 right-2 bg-orange-500">-{deal.discount}%</Badge>
                        <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                          <Clock className="w-3 h-3 inline mr-1" />
                          {deal.timeLeft}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <Badge variant="secondary" className="mb-2">{deal.category}</Badge>
                      <CardTitle className="text-lg mb-2 line-clamp-2">{deal.name}</CardTitle>
                      <div className="flex items-center mb-3">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600 ml-1">{deal.rating}</span>
                        <span className="text-sm text-gray-400 ml-2">{deal.shipping}</span>
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
                          <span className="text-xl font-bold text-red-600">NT$ {deal.salePrice.toLocaleString()}</span>
                        </div>
                        <Separator />
                        <div className="text-center">
                          <span className="text-sm text-red-600 font-medium">
                            立省 NT$ {(deal.originalPrice - deal.salePrice).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <Button className="w-full mt-4 bg-red-600 hover:bg-red-700" asChild>
                        <Link href={deal.url || "#"} target="_blank" rel="noopener noreferrer">
                          立即搶購 <ExternalLink className="w-4 h-4 ml-1" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            載入更多優惠
          </Button>
        </div>
      </div>
    </div>
  )
}

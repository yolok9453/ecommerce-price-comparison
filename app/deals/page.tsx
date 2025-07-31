import { Clock, Star, ExternalLink, Filter, Grid, List, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

const platformDeals = {
  pchome: {
    name: "PChome 24h購物",
    logo: "/placeholder.svg?height=40&width=120&text=PChome",
    color: "bg-orange-500",
    totalDeals: 156,
    deals: [
      {
        id: 1,
        name: "iPhone 15 Pro 128GB",
        image: "/placeholder.svg?height=200&width=200",
        originalPrice: 35900,
        salePrice: 32900,
        discount: 8,
        category: "手機",
        rating: 4.8,
        timeLeft: "23:45:30",
        dealType: "24h限時",
        shipping: "24小時到貨",
      },
      {
        id: 2,
        name: "Dyson V15 無線吸塵器",
        image: "/placeholder.svg?height=200&width=200",
        originalPrice: 24900,
        salePrice: 19900,
        discount: 20,
        category: "家電",
        rating: 4.6,
        timeLeft: "15:22:45",
        dealType: "週年慶",
        shipping: "免運費",
      },
      {
        id: 3,
        name: "MacBook Air M3 13吋",
        image: "/placeholder.svg?height=200&width=200",
        originalPrice: 39900,
        salePrice: 35900,
        discount: 10,
        category: "筆電",
        rating: 4.9,
        timeLeft: "08:15:20",
        dealType: "開學季",
        shipping: "24小時到貨",
      },
    ],
  },
  momo: {
    name: "momo購物網",
    logo: "/placeholder.svg?height=40&width=120&text=momo",
    color: "bg-pink-500",
    totalDeals: 203,
    deals: [
      {
        id: 4,
        name: "Sony WH-1000XM5 耳機",
        image: "/placeholder.svg?height=200&width=200",
        originalPrice: 11900,
        salePrice: 8990,
        discount: 24,
        category: "耳機",
        rating: 4.7,
        timeLeft: "12:30:15",
        dealType: "超級星期五",
        shipping: "隔日到貨",
      },
      {
        id: 5,
        name: "Nintendo Switch OLED",
        image: "/placeholder.svg?height=200&width=200",
        originalPrice: 12800,
        salePrice: 10780,
        discount: 16,
        category: "遊戲機",
        rating: 4.6,
        timeLeft: "19:45:30",
        dealType: "限量搶購",
        shipping: "免運費",
      },
      {
        id: 6,
        name: "LG 55吋 4K電視",
        image: "/placeholder.svg?height=200&width=200",
        originalPrice: 32900,
        salePrice: 25900,
        discount: 21,
        category: "家電",
        rating: 4.4,
        timeLeft: "06:20:45",
        dealType: "品牌日",
        shipping: "免運安裝",
      },
    ],
  },
  shopee: {
    name: "蝦皮購物",
    logo: "/placeholder.svg?height=40&width=120&text=Shopee",
    color: "bg-orange-600",
    totalDeals: 189,
    deals: [
      {
        id: 7,
        name: "AirPods Pro 第3代",
        image: "/placeholder.svg?height=200&width=200",
        originalPrice: 7490,
        salePrice: 6290,
        discount: 16,
        category: "耳機",
        rating: 4.5,
        timeLeft: "14:10:25",
        dealType: "9.9購物節",
        shipping: "蝦皮店到店",
      },
      {
        id: 8,
        name: "Samsung Galaxy S24",
        image: "/placeholder.svg?height=200&width=200",
        originalPrice: 28900,
        salePrice: 24900,
        discount: 14,
        category: "手機",
        rating: 4.3,
        timeLeft: "21:35:50",
        dealType: "限時特賣",
        shipping: "免運費",
      },
      {
        id: 9,
        name: "小米空氣清淨機",
        image: "/placeholder.svg?height=200&width=200",
        originalPrice: 4995,
        salePrice: 3495,
        discount: 30,
        category: "家電",
        rating: 4.2,
        timeLeft: "03:45:15",
        dealType: "品牌特賣",
        shipping: "7-11取貨",
      },
    ],
  },
  yahoo: {
    name: "Yahoo購物中心",
    logo: "/placeholder.svg?height=40&width=120&text=Yahoo",
    color: "bg-purple-600",
    totalDeals: 134,
    deals: [
      {
        id: 10,
        name: "ASUS ROG 電競筆電",
        image: "/placeholder.svg?height=200&width=200",
        originalPrice: 45900,
        salePrice: 39900,
        discount: 13,
        category: "筆電",
        rating: 4.6,
        timeLeft: "16:25:40",
        dealType: "電競節",
        shipping: "免運費",
      },
      {
        id: 11,
        name: "Philips 飛利浦氣炸鍋",
        image: "/placeholder.svg?height=200&width=200",
        originalPrice: 6990,
        salePrice: 4990,
        discount: 29,
        category: "家電",
        rating: 4.4,
        timeLeft: "09:50:30",
        dealType: "廚房節",
        shipping: "宅配到府",
      },
      {
        id: 12,
        name: "Canon EOS R50 相機",
        image: "/placeholder.svg?height=200&width=200",
        originalPrice: 22900,
        salePrice: 19900,
        discount: 13,
        category: "相機",
        rating: 4.7,
        timeLeft: "11:15:20",
        dealType: "攝影節",
        shipping: "免運費",
      },
    ],
  },
}

const allDeals = Object.values(platformDeals).flatMap((platform) =>
  platform.deals.map((deal) => ({
    ...deal,
    platformName: platform.name,
    platformLogo: platform.logo,
    platformColor: platform.color,
  })),
)

export default function DealsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">← 返回首頁</Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-primary">優惠情報</h1>
                <p className="text-sm text-gray-600">各大平台限時優惠，搶好康趁現在！</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有分類</SelectItem>
                  <SelectItem value="phone">手機</SelectItem>
                  <SelectItem value="laptop">筆電</SelectItem>
                  <SelectItem value="headphone">耳機</SelectItem>
                  <SelectItem value="appliance">家電</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                篩選
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary mb-1">682</div>
              <div className="text-sm text-gray-600">總優惠數</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-600 mb-1">4</div>
              <div className="text-sm text-gray-600">合作平台</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-600 mb-1">24小時</div>
              <div className="text-sm text-gray-600">更新頻率</div>
            </CardContent>
          </Card>
        </div>

        {/* Platform Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">全部優惠</TabsTrigger>
            <TabsTrigger value="pchome">PChome</TabsTrigger>
            <TabsTrigger value="momo">momo</TabsTrigger>
            <TabsTrigger value="shopee">蝦皮</TabsTrigger>
            <TabsTrigger value="yahoo">Yahoo</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold">所有平台優惠 ({allDeals.length} 項)</h3>
              <div className="flex items-center space-x-2">
                <Select defaultValue="discount">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discount">折扣最高</SelectItem>
                    <SelectItem value="price">價格最低</SelectItem>
                    <SelectItem value="time">時間最短</SelectItem>
                    <SelectItem value="rating">評分最高</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex border rounded">
                  <Button variant="ghost" size="sm">
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allDeals.map((deal) => (
                <Card key={deal.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="p-0">
                    <div className="relative">
                      <img
                        src={deal.image || "/placeholder.svg"}
                        alt={deal.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-2 left-2 bg-red-500">{deal.dealType}</Badge>
                      <Badge className="absolute top-2 right-2 bg-orange-500">-{deal.discount}%</Badge>
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {deal.timeLeft}
                      </div>
                      <div
                        className={`absolute bottom-2 right-2 ${deal.platformColor} text-white px-2 py-1 rounded text-xs`}
                      >
                        {deal.platformName}
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
                      <span className="text-sm text-gray-600 ml-1">{deal.rating}</span>
                      <span className="text-sm text-gray-400 mx-2">•</span>
                      <span className="text-sm text-gray-600">{deal.shipping}</span>
                    </div>
                    <div className="space-y-2">
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
                      <Link href="#" className="flex items-center justify-center">
                        前往 {deal.platformName}
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {Object.entries(platformDeals).map(([key, platform]) => (
            <TabsContent key={key} value={key}>
              <div className="mb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <img src={platform.logo || "/placeholder.svg"} alt={platform.name} className="h-12 w-auto" />
                  <div>
                    <h3 className="text-xl font-semibold">{platform.name}</h3>
                    <p className="text-gray-600">共 {platform.totalDeals} 項優惠商品</p>
                  </div>
                  <Badge className={`${platform.color} text-white`}>
                    <TrendingDown className="w-3 h-3 mr-1" />
                    熱門平台
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {platform.deals.map((deal) => (
                  <Card key={deal.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="p-0">
                      <div className="relative">
                        <img
                          src={deal.image || "/placeholder.svg"}
                          alt={deal.name}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <Badge className="absolute top-2 left-2 bg-red-500">{deal.dealType}</Badge>
                        <Badge className="absolute top-2 right-2 bg-orange-500">-{deal.discount}%</Badge>
                        <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {deal.timeLeft}
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
                        <span className="text-sm text-gray-600 ml-1">{deal.rating}</span>
                        <span className="text-sm text-gray-400 mx-2">•</span>
                        <span className="text-sm text-gray-600">{deal.shipping}</span>
                      </div>
                      <div className="space-y-2">
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
                      <Button className={`w-full mt-4 ${platform.color} hover:opacity-90`} asChild>
                        <Link href="#" className="flex items-center justify-center">
                          前往購買
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Hot Deals Banner */}
        <Card className="bg-gradient-to-r from-red-500 to-pink-500 text-white mb-8">
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold mb-2">🔥 限時搶購中</h3>
            <p className="mb-4">錯過這次，再等一年！各大平台聯合優惠進行中</p>
            <Button variant="secondary" size="lg">
              立即搶購
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

import { ArrowLeft, Star, Heart, Share2, TrendingDown, TrendingUp, ExternalLink, Shield, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

const productData = {
  id: 1,
  name: "iPhone 15 Pro 128GB",
  brand: "Apple",
  model: "A3102",
  images: [
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
  ],
  category: "手機",
  rating: 4.8,
  reviewCount: 2847,
  minPrice: 32900,
  maxPrice: 35900,
  avgPrice: 34200,
  priceHistory: [
    { date: "2024-01", price: 36900 },
    { date: "2024-02", price: 35900 },
    { date: "2024-03", price: 34900 },
    { date: "2024-04", price: 33900 },
    { date: "2024-05", price: 32900 },
  ],
  stores: [
    {
      name: "PChome 24h購物",
      price: 32900,
      originalPrice: 35900,
      discount: 8,
      shipping: "免運費",
      rating: 4.5,
      logo: "/placeholder.svg?height=40&width=120",
      inStock: true,
      deliveryTime: "24小時到貨",
    },
    {
      name: "momo購物網",
      price: 33200,
      originalPrice: 35900,
      discount: 8,
      shipping: "免運費",
      rating: 4.3,
      logo: "/placeholder.svg?height=40&width=120",
      inStock: true,
      deliveryTime: "隔日到貨",
    },
    {
      name: "蝦皮購物",
      price: 33500,
      originalPrice: 35900,
      discount: 7,
      shipping: "運費 60元",
      rating: 4.2,
      logo: "/placeholder.svg?height=40&width=120",
      inStock: true,
      deliveryTime: "2-3天到貨",
    },
    {
      name: "Yahoo購物中心",
      price: 34900,
      originalPrice: 35900,
      discount: 3,
      shipping: "免運費",
      rating: 4.4,
      logo: "/placeholder.svg?height=40&width=120",
      inStock: false,
      deliveryTime: "缺貨中",
    },
    {
      name: "東森購物",
      price: 35900,
      originalPrice: 35900,
      discount: 0,
      shipping: "免運費",
      rating: 4.1,
      logo: "/placeholder.svg?height=40&width=120",
      inStock: true,
      deliveryTime: "3-5天到貨",
    },
  ],
  specifications: {
    螢幕尺寸: "6.1 吋",
    處理器: "A17 Pro 晶片",
    儲存容量: "128GB",
    相機: "48MP 主相機",
    電池: "最長 23 小時影片播放",
    作業系統: "iOS 17",
    顏色: "原色鈦金屬、藍色鈦金屬、白色鈦金屬、黑色鈦金屬",
  },
}

export default function ProductPage() {
  const priceDiff = productData.maxPrice - productData.minPrice
  const savingsPercent = Math.round((priceDiff / productData.maxPrice) * 100)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  返回
                </Link>
              </Button>
              <h1 className="text-xl font-bold text-primary">比價王</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4 mr-2" />
                收藏
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                分享
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Images */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <CardContent className="p-6">
                  <img
                    src={productData.images[0] || "/placeholder.svg"}
                    alt={productData.name}
                    className="w-full h-80 object-cover rounded-lg mb-4"
                  />
                  <div className="flex space-x-2">
                    {productData.images.map((image, index) => (
                      <img
                        key={index}
                        src={image || "/placeholder.svg"}
                        alt={`${productData.name} ${index + 1}`}
                        className="w-16 h-16 object-cover rounded border cursor-pointer hover:border-primary"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Badge variant="secondary" className="mb-2">
                {productData.category}
              </Badge>
              <h1 className="text-3xl font-bold mb-2">{productData.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 font-medium">{productData.rating}</span>
                  <span className="ml-1 text-gray-500">({productData.reviewCount.toLocaleString()} 評價)</span>
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-gray-600">型號: {productData.model}</span>
              </div>
            </div>

            {/* Price Summary */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingDown className="w-5 h-5 text-green-500 mr-2" />
                  價格比較
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">NT$ {productData.minPrice.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">最低價</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-600">NT$ {productData.avgPrice.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">平均價</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">NT$ {productData.maxPrice.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">最高價</div>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-lg font-semibold text-green-700">
                    選擇最低價可省 NT$ {priceDiff.toLocaleString()} ({savingsPercent}%)
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Store Comparison */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>商店比價 ({productData.stores.length} 家商店)</CardTitle>
                <CardDescription>價格即時更新，點擊前往購買</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {productData.stores.map((store, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <img src={store.logo || "/placeholder.svg"} alt={store.name} className="h-8 w-auto" />
                          <div>
                            <div className="font-semibold">{store.name}</div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                              {store.rating}
                              <span className="mx-2">•</span>
                              <Truck className="w-3 h-3 mr-1" />
                              {store.deliveryTime}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2">
                            <div className="text-2xl font-bold text-primary">NT$ {store.price.toLocaleString()}</div>
                            {store.discount > 0 && <Badge variant="destructive">-{store.discount}%</Badge>}
                          </div>
                          {store.originalPrice > store.price && (
                            <div className="text-sm text-gray-400 line-through">
                              NT$ {store.originalPrice.toLocaleString()}
                            </div>
                          )}
                          <div className="text-sm text-gray-500">{store.shipping}</div>
                        </div>
                        <div className="ml-4">
                          {store.inStock ? (
                            <Button asChild>
                              <Link href="#" className="flex items-center">
                                前往購買
                                <ExternalLink className="w-4 h-4 ml-2" />
                              </Link>
                            </Button>
                          ) : (
                            <Button variant="secondary" disabled>
                              缺貨中
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Product Details */}
            <Tabs defaultValue="specs" className="mb-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="specs">規格</TabsTrigger>
                <TabsTrigger value="reviews">評價</TabsTrigger>
                <TabsTrigger value="history">價格走勢</TabsTrigger>
              </TabsList>

              <TabsContent value="specs">
                <Card>
                  <CardHeader>
                    <CardTitle>產品規格</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(productData.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b">
                          <span className="font-medium text-gray-600">{key}</span>
                          <span>{value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>用戶評價</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-gray-500">評價功能開發中...</div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle>價格走勢</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-gray-500">價格走勢圖開發中...</div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Trust Indicators */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-green-500" />
                    價格保證
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2 text-blue-500" />
                    即時更新
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-2 text-yellow-500" />
                    商店認證
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

import { Search, Star, ExternalLink, Filter, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { getProducts, searchProducts } from "@/lib/api"
import { Product } from "@/lib/supabase"

// 產品轉換函數
function transformProduct(product: Product) {
  return {
    id: product.id,
    name: product.title,
    price: product.price || 0,
    image: product.image_url || "/placeholder.svg?height=200&width=200",
    platform: product.platform,
    url: product.url,
    category: getCategoryFromTitle(product.title),
    rating: (Math.random() * 1 + 4).toFixed(1),
    stores: Math.floor(Math.random() * 15) + 5,
    originalPrice: product.price ? Math.floor(product.price * 1.2) : 0
  };
}

function getCategoryFromTitle(title: string): string {
  if (title.includes('iPhone') || title.includes('手機')) return '手機';
  if (title.includes('筆電') || title.includes('MacBook') || title.includes('LG')) return '筆電';
  if (title.includes('耳機') || title.includes('SONY') || title.includes('AirPods') || title.includes('鐵三角')) return '耳機';
  if (title.includes('電視') || title.includes('顯示器')) return '家電';
  if (title.includes('掃地機器人') || title.includes('冷氣') || title.includes('立扇')) return '家電';
  return '其他';
}

function getPlatformColor(platform: string): string {
  switch (platform) {
    case 'yahoo': return 'bg-purple-500';
    case 'pchome': return 'bg-orange-500';
    case 'momo': return 'bg-pink-500';
    default: return 'bg-gray-500';
  }
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const query = searchParams.q || '';
  
  // 根據查詢參數獲取產品數據
  const productsData = query 
    ? await searchProducts(query)
    : await getProducts();
    
  const products = productsData.map(transformProduct);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-primary">比價王</Link>
              <Badge variant="secondary" className="hidden md:inline-flex">
                <Search className="w-3 h-3 mr-1" />
                商品搜尋
              </Badge>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-sm font-medium hover:text-primary">
                首頁
              </Link>
              <Link href="/deals" className="text-sm font-medium hover:text-primary">
                優惠情報
              </Link>
              <Link href="#" className="text-sm font-medium hover:text-primary">
                AI助手
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input 
                type="text" 
                placeholder="搜尋商品名稱或型號..." 
                className="pl-10 pr-4 py-3 text-lg"
                defaultValue={query}
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2">搜尋</Button>
            </div>
          </div>

          {query && (
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold mb-2">搜尋結果："{query}"</h1>
              <p className="text-gray-600">找到 {products.length} 個相關商品</p>
            </div>
          )}

          {!query && (
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold mb-2">熱門商品</h1>
              <p className="text-gray-600">精選 {products.length} 個熱門商品</p>
            </div>
          )}
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
              </SelectContent>
            </Select>

            <Select defaultValue="price-low">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="排序方式" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-low">價格由低到高</SelectItem>
                <SelectItem value="price-high">價格由高到低</SelectItem>
                <SelectItem value="rating">評分最高</SelectItem>
                <SelectItem value="popular">最受歡迎</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all-platforms">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="選擇平台" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-platforms">全部平台</SelectItem>
                <SelectItem value="yahoo">Yahoo購物</SelectItem>
                <SelectItem value="pchome">PChome</SelectItem>
                <SelectItem value="momo">momo購物</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" size="sm">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            進階篩選
          </Button>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow relative overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                    <Badge className={`absolute top-2 right-2 text-white ${getPlatformColor(product.platform)}`}>
                      {product.platform.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <Badge variant="secondary" className="mb-2">{product.category}</Badge>
                  <CardTitle className="text-lg mb-2 line-clamp-2">{product.name}</CardTitle>
                  <div className="flex items-center mb-3">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600 ml-1">
                      {product.rating} ({product.stores} 家商店)
                    </span>
                  </div>
                  <div className="space-y-2">
                    {product.originalPrice > product.price && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">原價</span>
                        <span className="text-sm text-gray-400 line-through">
                          NT$ {product.originalPrice.toLocaleString()}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">價格</span>
                      <span className="text-xl font-bold text-primary">
                        NT$ {product.price.toLocaleString()}
                      </span>
                    </div>
                    {product.originalPrice > product.price && (
                      <>
                        <Separator />
                        <div className="text-center">
                          <span className="text-sm text-green-600 font-medium">
                            省下 NT$ {(product.originalPrice - product.price).toLocaleString()}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button className="flex-1" variant="outline" size="sm" asChild>
                      <Link href={`/product/${product.id}`}>
                        比價詳情
                      </Link>
                    </Button>
                    <Button className="flex-1" size="sm" asChild>
                      <Link href={product.url || "#"} target="_blank" rel="noopener noreferrer">
                        前往購買 <ExternalLink className="w-3 h-3 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold mb-2">找不到相關商品</h2>
            <p className="text-gray-600 mb-4">請嘗試使用其他關鍵字搜尋</p>
            <Button variant="outline" asChild>
              <Link href="/">返回首頁</Link>
            </Button>
          </div>
        )}

        {/* Pagination */}
        {products.length > 0 && (
          <div className="flex justify-center mt-8">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>上一頁</Button>
              <Button variant="outline" size="sm" className="bg-primary text-white">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">下一頁</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

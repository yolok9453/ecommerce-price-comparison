import { Search, Filter, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

const searchResults = [
  {
    id: 1,
    name: "iPhone 15 Pro 128GB 原色鈦金屬",
    image: "/placeholder.svg?height=150&width=150",
    category: "手機",
    minPrice: 32900,
    maxPrice: 35900,
    stores: 8,
    rating: 4.8,
    discount: 15,
  },
  {
    id: 2,
    name: "iPhone 15 Pro 256GB 藍色鈦金屬",
    image: "/placeholder.svg?height=150&width=150",
    category: "手機",
    minPrice: 36900,
    maxPrice: 39900,
    stores: 6,
    rating: 4.8,
    discount: 12,
  },
  {
    id: 3,
    name: "iPhone 15 128GB 粉紅色",
    image: "/placeholder.svg?height=150&width=150",
    category: "手機",
    minPrice: 26900,
    maxPrice: 29900,
    stores: 12,
    rating: 4.6,
    discount: 18,
  },
]

export default function SearchResults() {
  return (
    <div className="min-h-screen bg-background">
      {/* Search Header */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input type="text" placeholder="iPhone 15 Pro" className="pl-10" defaultValue="iPhone 15 Pro" />
            </div>
            <Button>搜尋</Button>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">找到 {searchResults.length} 個商品</span>
              <Badge variant="secondary">iPhone 15 Pro</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Select defaultValue="relevance">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">相關性</SelectItem>
                  <SelectItem value="price-low">價格：低到高</SelectItem>
                  <SelectItem value="price-high">價格：高到低</SelectItem>
                  <SelectItem value="rating">評分</SelectItem>
                  <SelectItem value="discount">折扣</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                篩選
              </Button>
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
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {product.discount > 0 && (
                    <Badge className="absolute top-2 right-2 bg-red-500">-{product.discount}%</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <Badge variant="secondary" className="mb-2">
                  {product.category}
                </Badge>
                <CardTitle className="text-lg mb-2 line-clamp-2">{product.name}</CardTitle>
                <div className="flex items-center mb-3">
                  <span className="text-sm text-gray-600">
                    ⭐ {product.rating} ({product.stores} 家商店)
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">最低價</span>
                    <span className="text-lg font-bold text-green-600">NT$ {product.minPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">最高價</span>
                    <span className="text-sm text-gray-400 line-through">NT$ {product.maxPrice.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="text-center">
                    <span className="text-sm text-green-600 font-medium">
                      最多省 NT$ {(product.maxPrice - product.minPrice).toLocaleString()}
                    </span>
                  </div>
                </div>
                <Button className="w-full mt-4" asChild>
                  <Link href={`/product/${product.id}`}>查看比價</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

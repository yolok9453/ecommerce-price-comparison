import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// TypeScript 類型定義
export interface CrawlSession {
  id: number
  keyword: string
  crawl_time: string
  total_products: number
  status: string
  platforms: string
}

export interface Product {
  id: number
  session_id: number | null
  platform: string
  title: string
  price: number | null
  url: string | null
  image_url: string | null
  is_filtered_out: boolean | null
}

export interface DailyDeal {
  id: number
  platform: string
  title: string
  price: number | null
  url: string | null
  image_url: string | null
  crawl_time: string
}

export interface ProductComparisonCache {
  id: number
  target_product_id: number
  similar_product_id: number
  similarity: number
  reason: string | null
  confidence: string | null
  category: string | null
  cache_time: string
}

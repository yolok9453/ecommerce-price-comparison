import { supabase, DailyDeal, Product, CrawlSession } from './supabase'

// 獲取每日優惠
export async function getDailyDeals() {
  try {
    const { data, error } = await supabase
      .from('daily_deals')
      .select('*')
      .order('crawl_time', { ascending: false })
    
    if (error) {
      console.error('Error fetching daily deals:', error)
      return []
    }
    
    return data as DailyDeal[]
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

// 根據平台獲取每日優惠
export async function getDailyDealsByPlatform(platform: string) {
  try {
    const { data, error } = await supabase
      .from('daily_deals')
      .select('*')
      .eq('platform', platform)
      .order('crawl_time', { ascending: false })
    
    if (error) {
      console.error('Error fetching daily deals by platform:', error)
      return []
    }
    
    return data as DailyDeal[]
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

// 獲取產品資料
export async function getProducts(sessionId?: number) {
  try {
    let query = supabase
      .from('products')
      .select('*')
    
    if (sessionId) {
      query = query.eq('session_id', sessionId)
    }
    
    const { data, error } = await query.order('id', { ascending: true })
    
    if (error) {
      console.error('Error fetching products:', error)
      return []
    }
    
    return data as Product[]
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

// 獲取爬蟲會話
export async function getCrawlSessions() {
  try {
    const { data, error } = await supabase
      .from('crawl_sessions')
      .select('*')
      .order('crawl_time', { ascending: false })
    
    if (error) {
      console.error('Error fetching crawl sessions:', error)
      return []
    }
    
    return data as CrawlSession[]
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

// 搜尋產品
export async function searchProducts(keyword: string) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .ilike('title', `%${keyword}%`)
      .eq('is_filtered_out', false)
      .order('price', { ascending: true })
    
    if (error) {
      console.error('Error searching products:', error)
      return []
    }
    
    return data as Product[]
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

// 根據價格範圍獲取每日優惠
export async function getDailyDealsByPriceRange(minPrice: number, maxPrice: number) {
  try {
    const { data, error } = await supabase
      .from('daily_deals')
      .select('*')
      .gte('price', minPrice)
      .lte('price', maxPrice)
      .order('price', { ascending: true })
    
    if (error) {
      console.error('Error fetching daily deals by price range:', error)
      return []
    }
    
    return data as DailyDeal[]
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

// 獲取熱門產品 (根據價格排序)
export async function getPopularProducts(limit: number = 10) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_filtered_out', false)
      .not('price', 'is', null)
      .order('price', { ascending: true })
      .limit(limit)
    
    if (error) {
      console.error('Error fetching popular products:', error)
      return []
    }
    
    return data as Product[]
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

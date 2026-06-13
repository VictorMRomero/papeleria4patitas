export interface SearchProductsDto {
  limit?: number
  offset?: number
  categorySlug?: string
  subcategoryId?: string
  categoryIds?: string[]
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  isActive?: boolean
  search?: string
  tags?: string[]
  hasDiscount?: boolean
  minDiscount?: number
  newProductsDays?: number
  minViews?: number
  onlineOnly?: boolean
  minStock?: number
  sortBy?: 'title' | 'price' | 'createdAt' | 'views' | 'discount'
  sortOrder?: 'ASC' | 'DESC'
}

export interface SearchProductsResponse {
  products: any[]
  total: number
  totalPages: number
  currentPage: number
  filters: SearchProductsDto
  highestPrice?: number
}

export interface SearchFilters {
  minPrice: number
  maxPrice: number
  inStock: boolean
  hasDiscount: boolean
  minDiscount: number
  newProductsDays: number
  minViews: number
  onlineOnly: boolean
  minStock: number
  sortBy: string
  sortOrder: 'ASC' | 'DESC'
  tags: string[]
}

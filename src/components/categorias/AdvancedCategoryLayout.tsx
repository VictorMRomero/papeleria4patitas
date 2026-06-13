'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Category } from '@/interfaces'
import { SearchFilters } from '@/interfaces/search-products.interface'
import { AdvancedCategorySidebar } from './AdvancedCategorySidebar'
import { CategoryImageCarousel } from './CategoryImageCarousel'

interface AdvancedCategoryLayoutProps {
  children: React.ReactNode
  categories: Category[]
  currentCategory?: Category
  images?: string[]
  onFiltersChange?: (filters: SearchFilters) => void
  className?: string
  highestPrice?: number
}

export const AdvancedCategoryLayout = ({ 
  children, 
  categories, 
  currentCategory, 
  images = [],
  onFiltersChange,
  className = "",
  highestPrice = 100000
}: AdvancedCategoryLayoutProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [filters, setFilters] = useState<SearchFilters>({
    minPrice: 0,
    maxPrice: 0,
    inStock: false,
    hasDiscount: false,
    minDiscount: 0,
    newProductsDays: 0,
    minViews: 0,
    onlineOnly: false,
    minStock: 0,
    sortBy: 'title',
    sortOrder: 'ASC',
    tags: []
  })

  const handleFiltersChange = useCallback((newFilters: SearchFilters) => {
    setFilters(newFilters)
    
    // Actualizar URL con parámetros de filtro
    const params = new URLSearchParams(searchParams.toString())
    
    // Limpiar parámetros existentes
    const filterKeys = [
      'minPrice', 'maxPrice', 'inStock', 'hasDiscount', 'minDiscount',
      'newProductsDays', 'minViews', 'onlineOnly', 'minStock', 'sortBy', 'sortOrder'
    ]
    
    filterKeys.forEach(key => params.delete(key))
    
    // Agregar nuevos parámetros
    if (newFilters.minPrice > 0) params.set('minPrice', newFilters.minPrice.toString())
    if (newFilters.maxPrice > 0) params.set('maxPrice', newFilters.maxPrice.toString())
    if (newFilters.inStock) params.set('inStock', 'true')
    if (newFilters.hasDiscount) params.set('hasDiscount', 'true')
    if (newFilters.minDiscount > 0) params.set('minDiscount', newFilters.minDiscount.toString())
    if (newFilters.newProductsDays > 0) params.set('newProductsDays', newFilters.newProductsDays.toString())
    if (newFilters.minViews > 0) params.set('minViews', newFilters.minViews.toString())
    if (newFilters.onlineOnly) params.set('onlineOnly', 'true')
    if (newFilters.minStock > 0) params.set('minStock', newFilters.minStock.toString())
    if (newFilters.sortBy !== 'title') params.set('sortBy', newFilters.sortBy)
    if (newFilters.sortOrder !== 'ASC') params.set('sortOrder', newFilters.sortOrder)
    
    // Mantener la página actual
    const currentPage = params.get('page') || '1'
    params.set('page', '1') // Resetear a página 1 cuando cambian los filtros
    
    router.push(`?${params.toString()}`)
    
    // Notificar al componente padre si existe el callback
    if (onFiltersChange) {
      onFiltersChange(newFilters)
    }
  }, [searchParams, router, onFiltersChange])

  const handleCategoryChange = (categorySlug: string) => {
    // Navegar a la nueva categoría
    router.push(`/category/${categorySlug}`)
  }

  // Sincronizar filtros con URL params al cargar
  useEffect(() => {
    const newFilters: Partial<SearchFilters> = {}
    
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const inStock = searchParams.get('inStock')
    const hasDiscount = searchParams.get('hasDiscount')
    const minDiscount = searchParams.get('minDiscount')
    const newProductsDays = searchParams.get('newProductsDays')
    const minViews = searchParams.get('minViews')
    const onlineOnly = searchParams.get('onlineOnly')
    const minStock = searchParams.get('minStock')
    const sortBy = searchParams.get('sortBy')
    const sortOrder = searchParams.get('sortOrder')
    
    if (minPrice) newFilters.minPrice = parseInt(minPrice)
    if (maxPrice) newFilters.maxPrice = parseInt(maxPrice)
    if (inStock) newFilters.inStock = inStock === 'true'
    if (hasDiscount) newFilters.hasDiscount = hasDiscount === 'true'
    if (minDiscount) newFilters.minDiscount = parseInt(minDiscount)
    if (newProductsDays) newFilters.newProductsDays = parseInt(newProductsDays)
    if (minViews) newFilters.minViews = parseInt(minViews)
    if (onlineOnly) newFilters.onlineOnly = onlineOnly === 'true'
    if (minStock) newFilters.minStock = parseInt(minStock)
    if (sortBy) newFilters.sortBy = sortBy
    if (sortOrder) newFilters.sortOrder = sortOrder as 'ASC' | 'DESC'
    
    if (Object.keys(newFilters).length > 0) {
      setFilters(prev => ({ ...prev, ...newFilters }))
    }
  }, [searchParams])

  return (
    <div className={`mt-10 ${className}`}>
      {/* Carrusel de imágenes */}
      <CategoryImageCarousel 
        images={images} 
        className="mb-6"
      />
      
      {/* Layout principal */}
      <div className="flex gap-6">
        {/* Sidebar de filtros avanzados */}
        <AdvancedCategorySidebar
          categories={categories}
          currentCategory={currentCategory}
          onFiltersChange={handleFiltersChange}
          onCategoryChange={handleCategoryChange}
          initialFilters={filters}
          highestPrice={highestPrice}
        />
        
        {/* Contenido principal */}
        <div className="flex-1 min-w-0">
          {children}
        </div>
      </div>
    </div>
  )
}

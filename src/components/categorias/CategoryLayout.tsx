'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Category } from '@/interfaces'
import { CategorySidebar } from './CategorySidebar'
import { CategoryImageCarousel } from './CategoryImageCarousel'

interface CategoryLayoutProps {
  children: React.ReactNode
  categories: Category[]
  currentCategory?: Category
  images?: string[]
  className?: string
}

export const CategoryLayout = ({ 
  children, 
  categories, 
  currentCategory, 
  images = [],
  className = ""
}: CategoryLayoutProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 0,
    sortBy: searchParams.get('sort') || 'name-asc'
  })

  const handlePriceRangeChange = (min: number, max: number) => {
    setFilters(prev => ({ ...prev, minPrice: min, maxPrice: max }))
    
    // Actualizar URL con parámetros de filtro
    const params = new URLSearchParams(searchParams.toString())
    if (min > 0) params.set('minPrice', min.toString())
    else params.delete('minPrice')
    
    if (max > 0) params.set('maxPrice', max.toString())
    else params.delete('maxPrice')
    
    router.push(`?${params.toString()}`)
  }

  const handleSortChange = (sort: string) => {
    setFilters(prev => ({ ...prev, sortBy: sort }))
    
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', sort)
    router.push(`?${params.toString()}`)
  }

  const handleCategoryChange = (categorySlug: string) => {
    // Navegar a la nueva categoría
    router.push(`/category/${categorySlug}`)
  }

  // Sincronizar filtros con URL params
  useEffect(() => {
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const sort = searchParams.get('sort')
    
    setFilters(prev => ({
      ...prev,
      minPrice: minPrice ? parseInt(minPrice) : 0,
      maxPrice: maxPrice ? parseInt(maxPrice) : 0,
      sortBy: sort || 'name-asc'
    }))
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
        {/* Sidebar de filtros */}
        <CategorySidebar
          categories={categories}
          currentCategory={currentCategory}
          onPriceRangeChange={handlePriceRangeChange}
          onSortChange={handleSortChange}
          onCategoryChange={handleCategoryChange}
          filters={filters}
        />
        
        {/* Contenido principal */}
        <div className="flex-1 min-w-0">
          {children}
        </div>
      </div>
    </div>
  )
}

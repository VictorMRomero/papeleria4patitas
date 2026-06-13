'use client'

import { useState, useEffect, useCallback } from 'react'
import { Category } from '@/interfaces'
import { SearchFilters } from '@/interfaces/search-products.interface'
import { IoChevronBack, IoChevronForward, IoClose } from 'react-icons/io5'
import { PriceRangeSlider } from './PriceRangeSlider'

interface AdvancedCategorySidebarProps {
  categories: Category[]
  currentCategory?: Category
  onFiltersChange: (filters: SearchFilters) => void
  onCategoryChange: (categorySlug: string) => void
  initialFilters?: Partial<SearchFilters>
  highestPrice?: number
}

interface FilterSection {
  id: string
  title: string
  isOpen: boolean
}

const SORT_OPTIONS = [
  { value: 'title-ASC', label: 'Nombre A-Z' },
  { value: 'title-DESC', label: 'Nombre Z-A' },
  { value: 'price-ASC', label: 'Precio: Menor a Mayor' },
  { value: 'price-DESC', label: 'Precio: Mayor a Menor' },
  { value: 'createdAt-DESC', label: 'Más Recientes' },
  { value: 'createdAt-ASC', label: 'Más Antiguos' },
  { value: 'views-DESC', label: 'Más Populares' },
  { value: 'discount-DESC', label: 'Mayor Descuento' }
]

const STOCK_OPTIONS = [
  { value: 'any', label: 'Cualquier stock' },
  { value: 'inStock', label: 'Solo en stock' },
  { value: 'lowStock', label: 'Stock bajo (< 10)' },
  { value: 'outOfStock', label: 'Sin stock' }
]

const DISCOUNT_OPTIONS = [
  { value: 'any', label: 'Cualquier descuento' },
  { value: 'hasDiscount', label: 'Solo con descuento' },
  { value: 'minDiscount', label: 'Mínimo descuento' }
]

export const AdvancedCategorySidebar = ({ 
  categories, 
  currentCategory, 
  onFiltersChange,
  onCategoryChange,
  initialFilters = {},
  highestPrice = 1000
}: AdvancedCategorySidebarProps) => {
  const [sections, setSections] = useState<FilterSection[]>([
    { id: 'categories', title: 'Categorías', isOpen: true },
    { id: 'price', title: 'Precio', isOpen: true },
    { id: 'stock', title: 'Stock y Disponibilidad', isOpen: false },
    { id: 'discount', title: 'Descuentos', isOpen: false },
    { id: 'features', title: 'Características', isOpen: false },
    { id: 'sort', title: 'Ordenar por', isOpen: false }
  ])
  
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  
  // Estado para todos los filtros aplicados
  const [filters, setFilters] = useState<SearchFilters>({
    minPrice: initialFilters.minPrice || 0,
    maxPrice: initialFilters.maxPrice || 0,
    inStock: initialFilters.inStock || false,
    hasDiscount: initialFilters.hasDiscount || false,
    minDiscount: initialFilters.minDiscount || 0,
    newProductsDays: initialFilters.newProductsDays || 0,
    minViews: initialFilters.minViews || 0,
    onlineOnly: initialFilters.onlineOnly || false,
    minStock: initialFilters.minStock || 0,
    sortBy: initialFilters.sortBy || 'title',
    sortOrder: initialFilters.sortOrder || 'ASC',
    tags: initialFilters.tags || [],
  })

  // Estado local SOLO para el slider de precios, antes de aplicar.
  const [priceRange, setPriceRange] = useState<[number, number]>([
    initialFilters.minPrice || 0, 
    initialFilters.maxPrice || (highestPrice > 0 ? highestPrice : 1000)
  ])

  // Sincroniza el slider si los filtros externos cambian (ej. al limpiar)
  useEffect(() => {
    setPriceRange([
      filters.minPrice || 0, 
      filters.maxPrice || (highestPrice > 0 ? highestPrice : 1000)
    ])
  }, [filters.minPrice, filters.maxPrice, highestPrice])

  // --- Lógica Simplificada Mejorada ---
  const sliderMax = highestPrice > 1 ? highestPrice : 1000
  
  // Calcular step basado en el rango real
  let sliderStep = 1
  if (sliderMax > 100) sliderStep = 10
  if (sliderMax > 1000) sliderStep = 100
  if (sliderMax > 10000) sliderStep = 500
  if (sliderMax > 50000) sliderStep = 1000

  const handleApplyPriceFilter = () => {
    onFiltersChange({ 
      ...filters, 
      minPrice: priceRange[0], 
      maxPrice: priceRange[1] === sliderMax ? 0 : priceRange[1]
    })
  }
  // --- Fin Lógica Simplificada ---

  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    const updated = { ...filters, ...newFilters }
    setFilters(updated)
    onFiltersChange(updated)
  }

  const handleStockChange = useCallback((value: string) => {
    if (value === 'any') {
      updateFilters({ inStock: false, minStock: 0 })
    } else if (value === 'inStock') {
      updateFilters({ inStock: true, minStock: 0 })
    } else if (value === 'lowStock') {
      updateFilters({ inStock: false, minStock: 10 })
    } else if (value === 'outOfStock') {
      updateFilters({ inStock: false, minStock: 0 })
    }
  }, [updateFilters])

  const handleDiscountChange = useCallback((value: string) => {
    if (value === 'any') {
      updateFilters({ hasDiscount: false, minDiscount: 0 })
    } else if (value === 'hasDiscount') {
      updateFilters({ hasDiscount: true, minDiscount: 0 })
    }
  }, [updateFilters])

  const handleSortChange = useCallback((value: string) => {
    const [sortBy, sortOrder] = value.split('-') as [string, 'ASC' | 'DESC']
    updateFilters({ sortBy, sortOrder })
  }, [updateFilters])


  const clearFilters = () => {
    const defaultFilters: SearchFilters = {
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
    }
    setFilters(defaultFilters)
    onFiltersChange(defaultFilters)
  }

  // Obtener categorías relevantes (hermanas o hijas)
  const getRelevantCategories = () => {
    if (!currentCategory) {
      return categories.filter(cat => !cat.parentId)
    }

    if (currentCategory.parentId) {
      return categories.filter(cat => cat.parentId === currentCategory.parentId)
    } else {
      return categories.filter(cat => cat.parentId === currentCategory.id)
    }
  }

  const relevantCategories = getRelevantCategories()
  const hasActiveFilters = Object.values(filters).some(value => 
    value !== 0 && value !== false && value !== 'title' && value !== 'ASC' && 
    (!Array.isArray(value) || value.length > 0)
  )

  const toggleSection = (sectionId: string) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? { ...section, isOpen: !section.isOpen }
        : section
    ))
  }


  return (
    <>
      {/* Botón para mostrar sidebar en móvil */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-20 right-4 z-40 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="Mostrar filtros"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
        </svg>
      </button>

      {/* Overlay para móvil */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        fixed lg:relative inset-y-0 left-0 z-50
        w-80 bg-white border-r border-gray-200 
        h-fit lg:sticky lg:top-4
        transform transition-transform duration-300 ease-in-out
        lg:transform-none
        ${isMobileOpen ? 'block' : 'hidden lg:block'}
      `}>
        <div className="p-6 h-full overflow-y-auto">
          {/* Botón para cerrar en móvil */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
            <div className="flex items-center gap-2">
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <IoClose className="w-4 h-4" />
                  Limpiar
                </button>
              )}
              <button
                onClick={() => setIsMobileOpen(false)}
                className="lg:hidden p-2 text-gray-500 hover:text-gray-700"
                aria-label="Cerrar filtros"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Sección de Categorías */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('categories')}
              className="flex items-center justify-between w-full py-2 text-left"
            >
              <span className="font-medium text-gray-900">
                {sections.find(s => s.id === 'categories')?.title}
              </span>
              {sections.find(s => s.id === 'categories')?.isOpen ? (
                <IoChevronBack className="w-4 h-4" />
              ) : (
                <IoChevronForward className="w-4 h-4" />
              )}
            </button>
            
            {sections.find(s => s.id === 'categories')?.isOpen && (
              <div className="mt-3 space-y-2">
                <button
                  onClick={() => onCategoryChange('all')}
                  className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                    !currentCategory ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Todos los productos
                </button>
                
                <button
                  onClick={() => onCategoryChange('ofertas')}
                  className="block w-full text-left px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-50"
                >
                  🏷️ Ofertas
                </button>

                <button
                  onClick={() => onCategoryChange('newest')}
                  className="block w-full text-left px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-50"
                >
                  🆕 Más Nuevos
                </button>

                {getRelevantCategories().map(category => (
                  <button
                    key={category.id}
                    onClick={() => onCategoryChange(category.slug)}
                    className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                      currentCategory?.id === category.id 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {category.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sección de Precio */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('price')}
              className="flex items-center justify-between w-full py-2 text-left"
            >
              <span className="font-medium text-gray-900">Precio</span>
              {sections.find(s => s.id === 'price')?.isOpen ? (
                <IoChevronBack className="w-4 h-4" />
              ) : (
                <IoChevronForward className="w-4 h-4" />
              )}
            </button>
            
            {sections.find(s => s.id === 'price')?.isOpen && (
              <div className="mt-3 space-y-4">
                {/* Debug temporal */}
                <div className="p-2 bg-blue-100 border border-blue-300 rounded text-xs">
                  <strong>DEBUG:</strong><br/>
                  highestPrice: {highestPrice}<br/>
                  sliderMax: {sliderMax}<br/>
                  sliderStep: {sliderStep}<br/>
                  priceRange: [{priceRange[0]}, {priceRange[1]}]
                </div>
                
                <PriceRangeSlider
                  min={0}
                  max={sliderMax}
                  value={priceRange}
                  onChange={setPriceRange} // Directamente actualiza el estado local
                  step={sliderStep}
                />
                
                <button
                  onClick={handleApplyPriceFilter}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Aplicar filtro de precio
                </button>
              </div>
            )}
          </div>

          {/* Sección de Stock */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('stock')}
              className="flex items-center justify-between w-full py-2 text-left"
            >
              <span className="font-medium text-gray-900">
                {sections.find(s => s.id === 'stock')?.title}
              </span>
              {sections.find(s => s.id === 'stock')?.isOpen ? (
                <IoChevronBack className="w-4 h-4" />
              ) : (
                <IoChevronForward className="w-4 h-4" />
              )}
            </button>
            
            {sections.find(s => s.id === 'stock')?.isOpen && (
              <div className="mt-3 space-y-2">
                {STOCK_OPTIONS.map(option => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="stock"
                      value={option.value}
                      checked={
                        (option.value === 'any' && !filters.inStock && filters.minStock === 0) ||
                        (option.value === 'inStock' && filters.inStock === true) ||
                        (option.value === 'lowStock' && filters.minStock === 10) ||
                        (option.value === 'outOfStock' && filters.inStock === false && filters.minStock === 0)
                      }
                      onChange={(e) => handleStockChange(e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
                
                <div className="mt-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.onlineOnly}
                      onChange={(e) => updateFilters({ onlineOnly: e.target.checked })}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Solo productos online</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Sección de Descuentos */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('discount')}
              className="flex items-center justify-between w-full py-2 text-left"
            >
              <span className="font-medium text-gray-900">
                {sections.find(s => s.id === 'discount')?.title}
              </span>
              {sections.find(s => s.id === 'discount')?.isOpen ? (
                <IoChevronBack className="w-4 h-4" />
              ) : (
                <IoChevronForward className="w-4 h-4" />
              )}
            </button>
            
            {sections.find(s => s.id === 'discount')?.isOpen && (
              <div className="mt-3 space-y-3">
                {DISCOUNT_OPTIONS.map(option => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="discount"
                      value={option.value}
                      checked={
                        (option.value === 'any' && !filters.hasDiscount && filters.minDiscount === 0) ||
                        (option.value === 'hasDiscount' && filters.hasDiscount === true) ||
                        (option.value === 'minDiscount' && filters.minDiscount > 0)
                      }
                      onChange={(e) => handleDiscountChange(e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
                
                {filters.hasDiscount && (
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Descuento mínimo (%)</label>
                    <input
                      type="number"
                      value={filters.minDiscount || ''}
                      onChange={(e) => updateFilters({ minDiscount: Number(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="10"
                      min="0"
                      max="100"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sección de Características */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('features')}
              className="flex items-center justify-between w-full py-2 text-left"
            >
              <span className="font-medium text-gray-900">
                {sections.find(s => s.id === 'features')?.title}
              </span>
              {sections.find(s => s.id === 'features')?.isOpen ? (
                <IoChevronBack className="w-4 h-4" />
              ) : (
                <IoChevronForward className="w-4 h-4" />
              )}
            </button>
            
            {sections.find(s => s.id === 'features')?.isOpen && (
              <div className="mt-3 space-y-3">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Productos nuevos (días)</label>
                  <input
                    type="number"
                    value={filters.newProductsDays || ''}
                    onChange={(e) => updateFilters({ newProductsDays: Number(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="30"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Vistas mínimas</label>
                  <input
                    type="number"
                    value={filters.minViews || ''}
                    onChange={(e) => updateFilters({ minViews: Number(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="100"
                    min="0"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Sección de Ordenamiento */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('sort')}
              className="flex items-center justify-between w-full py-2 text-left"
            >
              <span className="font-medium text-gray-900">
                {sections.find(s => s.id === 'sort')?.title}
              </span>
              {sections.find(s => s.id === 'sort')?.isOpen ? (
                <IoChevronBack className="w-4 h-4" />
              ) : (
                <IoChevronForward className="w-4 h-4" />
              )}
            </button>
            
            {sections.find(s => s.id === 'sort')?.isOpen && (
              <div className="mt-3 space-y-2">
                {SORT_OPTIONS.map(option => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="sort"
                      value={option.value}
                      checked={`${filters.sortBy}-${filters.sortOrder}` === option.value}
                      onChange={(e) => handleSortChange(e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

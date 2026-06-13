'use client'

import { useState, useEffect } from 'react'
import { Category } from '@/interfaces'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'
import { PriceRangeSlider } from './PriceRangeSlider'
import styles from './CategorySidebar.module.css'

interface CategorySidebarProps {
  categories: Category[]
  currentCategory?: Category
  onPriceRangeChange: (min: number, max: number) => void
  onSortChange: (sort: string) => void
  onCategoryChange: (categorySlug: string) => void
  filters: {
    minPrice: number
    maxPrice: number
    sortBy: string
  }
}

interface FilterSection {
  id: string
  title: string
  isOpen: boolean
}

export const CategorySidebar = ({ 
  categories, 
  currentCategory, 
  onPriceRangeChange, 
  onSortChange, 
  onCategoryChange,
  filters 
}: CategorySidebarProps) => {
  const [sections, setSections] = useState<FilterSection[]>([
    { id: 'categories', title: 'Categorías', isOpen: true },
    { id: 'price', title: 'Rango de Precio', isOpen: true },
    { id: 'sort', title: 'Ordenar por', isOpen: true }
  ])
  
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [priceRange, setPriceRange] = useState({
    min: filters.minPrice,
    max: filters.maxPrice
  })

  const sortOptions = [
    { value: 'name-asc', label: 'Nombre A-Z' },
    { value: 'name-desc', label: 'Nombre Z-A' },
    { value: 'price-asc', label: 'Precio: Menor a Mayor' },
    { value: 'price-desc', label: 'Precio: Mayor a Menor' },
    { value: 'date-desc', label: 'Más Recientes' },
    { value: 'date-asc', label: 'Más Antiguos' }
  ]

  const toggleSection = (sectionId: string) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? { ...section, isOpen: !section.isOpen }
        : section
    ))
  }

  const handlePriceChange = () => {
    onPriceRangeChange(priceRange.min, priceRange.max)
  }

  // Obtener categorías relevantes (hermanas o hijas)
  const getRelevantCategories = () => {
    if (!currentCategory) {
      // Si no hay categoría actual, mostrar categorías principales
      return categories.filter(cat => !cat.parentId)
    }

    if (currentCategory.parentId) {
      // Si es una subcategoría, mostrar categorías hermanas
      return categories.filter(cat => cat.parentId === currentCategory.parentId)
    } else {
      // Si es categoría principal, mostrar subcategorías
      return categories.filter(cat => cat.parentId === currentCategory.id)
    }
  }

  const relevantCategories = getRelevantCategories()

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
                {/* Opción para ver todas las categorías */}
                <button
                  onClick={() => onCategoryChange('all')}
                  className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                    !currentCategory ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Todos los productos
                </button>
                
                {/* Opción para ofertas */}
                <button
                  onClick={() => onCategoryChange('ofertas')}
                  className="block w-full text-left px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-50"
                >
                  🏷️ Ofertas
                </button>

                {/* Opción para productos nuevos */}
                <button
                  onClick={() => onCategoryChange('newest')}
                  className="block w-full text-left px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-50"
                >
                  🆕 Más Nuevos
                </button>

                {/* Categorías relevantes */}
                {relevantCategories.map(category => (
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
              <span className="font-medium text-gray-900">
                {sections.find(s => s.id === 'price')?.title}
              </span>
              {sections.find(s => s.id === 'price')?.isOpen ? (
                <IoChevronBack className="w-4 h-4" />
              ) : (
                <IoChevronForward className="w-4 h-4" />
              )}
            </button>
            
            {sections.find(s => s.id === 'price')?.isOpen && (
              <div className="mt-3 space-y-4">
                <PriceRangeSlider
                  min={0}
                  max={500}
                  value={[50, 300]}
                  onChange={([min, max]) => setPriceRange({ 
                    min, 
                    max: max === 100000 ? 0 : max 
                  })}
                  step={1}
                />

                <button
                  onClick={handlePriceChange}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Aplicar filtro
                </button>
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
                {sortOptions.map(option => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="sort"
                      value={option.value}
                      checked={filters.sortBy === option.value}
                      onChange={(e) => onSortChange(e.target.value)}
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

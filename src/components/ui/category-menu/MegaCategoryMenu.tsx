'use client'

import { Category } from "@/interfaces"
import Link from "next/link"
import { useState } from "react"
import { 
  IoGridOutline, 
  IoChevronForwardOutline,
  IoSparklesOutline,
  IoTrendingUpOutline,
  IoFlashOutline
} from "react-icons/io5"

interface Props {
  categories: Category[]
  onClose: () => void
}

export const MegaCategoryMenu = ({ categories, onClose }: Props) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  // Filtrar categorías principales (sin parent)
  const mainCategories = categories.filter(cat => !cat.parentId)
  
  // Organizar subcategorías por categoría padre
  const categoriesWithSubs = mainCategories.map(mainCat => ({
    ...mainCat,
    subcategories: categories.filter(cat => cat.parentId === mainCat.id)
  }))

  const handleLinkClick = () => {
    onClose()
  }

  const handleToggleSubcategories = (categoryId: string) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId)
  }

  return (
    <div className="bg-white shadow-2xl border-t-4 border-green-500 z-40">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <IoGridOutline className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              Todas las Categorías
            </h2>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <IoSparklesOutline className="w-4 h-4" />
            <span>Encuentra todo lo que necesitas</span>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {categoriesWithSubs.map((category) => (
                          <div
                key={category.id} 
                className="p-4 rounded-lg border border-gray-200 transition-all duration-200 hover:shadow-lg group-hover:bg-green-50"
              >
                <div className="flex items-center gap-3">
                  {/* Icon & Title Container - Clickable Link */}
                  <Link
                    href={`/category/${category.slug}`}
                    onClick={handleLinkClick}
                    className="flex items-center gap-3 flex-1"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {category.title.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors capitalize">
                        {category.title}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-1">
                        {category.description}
                      </p>
                    </div>
                  </Link>

                  {/* Arrow Button - Toggles Subcategories */}
                  {category.subcategories && category.subcategories.length > 0 && (
                    <button
                      onClick={() => handleToggleSubcategories(category.id)}
                      className="p-2 rounded-full hover:bg-green-100 transition-colors"
                    >
                      <IoChevronForwardOutline 
                        className={`w-4 h-4 text-gray-400 group-hover:text-green-500 transition-transform ${
                          activeCategory === category.id ? 'rotate-90' : ''
                        }`} 
                      />
                    </button>
                  )}
                </div>

                {/* Subcategories - Collapsible */}
                {category.subcategories && category.subcategories.length > 0 && activeCategory === category.id && (
                  <div className="mt-2 ml-4 pl-4 border-l-2 border-green-200">
                    {category.subcategories.map((subcat) => (
                      <Link
                        key={subcat.id}
                        href={`/category/${subcat.slug}`}
                        onClick={handleLinkClick}
                        className="block py-2.5 px-3 my-1 text-sm text-gray-600 hover:text-white hover:bg-green-600 rounded-lg transition-all duration-200 group relative"
                      >
                        <span className="absolute left-[-24px] top-1/2 -translate-y-1/2 w-3 h-3 bg-green-300 rounded-full transition-all duration-200 group-hover:bg-green-600 group-hover:scale-125"></span>
                        <span className="capitalize">{subcat.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
          ))}
        </div>

        {/* Featured Links */}
        <div className="border-t border-gray-200 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <Link
              href="/category/newest"
              onClick={handleLinkClick}
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg hover:shadow-md transition-all duration-200 group"
            >
              <IoSparklesOutline className="w-6 h-6 text-blue-600" />
              <div>
                <h4 className="font-semibold text-blue-900 group-hover:text-blue-700">
                  Productos Nuevos
                </h4>
                <p className="text-xs text-blue-700">
                  Las últimas novedades
                </p>
              </div>
            </Link>

            <Link
              href="/category/ofertas"
              onClick={handleLinkClick}
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg hover:shadow-md transition-all duration-200 group"
            >
              <IoFlashOutline className="w-6 h-6 text-red-600" />
              <div>
                <h4 className="font-semibold text-red-900 group-hover:text-red-700">
                  Ofertas Especiales
                </h4>
                <p className="text-xs text-red-700">
                  Precios increíbles
                </p>
              </div>
            </Link>

            <Link
              href="/category/all"
              onClick={handleLinkClick}
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg hover:shadow-md transition-all duration-200 group"
            >
              <IoTrendingUpOutline className="w-6 h-6 text-green-600" />
              <div>
                <h4 className="font-semibold text-green-900 group-hover:text-green-700">
                  Más Populares
                </h4>
                <p className="text-xs text-green-700">
                  Los más vendidos
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
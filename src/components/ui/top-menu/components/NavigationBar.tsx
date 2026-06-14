'use client'

import { Category } from "@/interfaces"
import { useStoreStore } from "@/store"
import { MegaCategoryMenu } from "@/components"
import { whatsappUrl } from "@/config/contact"
import Link from "next/link"
import { useState } from "react"
import {
  IoBagOutline,
  IoStarOutline,
  IoPricetagOutline,
  IoSparklesOutline,
  IoLogoWhatsapp,
  IoStorefrontOutline,
  IoChevronDownOutline,
  IoMenuOutline,
  IoCloseOutline
} from "react-icons/io5"

interface Props {
  categorias: Category[]
}

interface NavItem {
  title: string
  icon: React.ReactNode
  href: string
  hasDropdown?: boolean
  external?: boolean
}

export const NavigationBar = ({ categorias }: Props) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showMegaMenu, setShowMegaMenu] = useState(false)
  const { selectedStore, clearSelectedStore } = useStoreStore()

  const navItems: NavItem[] = [
    {
      title: "Categorías",
      icon: <IoBagOutline className="w-6 h-6 text-red-500" />,
      href: "#",
      hasDropdown: true
    },
    {
      title: "Ofertas",
      icon: <IoPricetagOutline className="w-6 h-6 text-orange-500" />,
      href: "/category/ofertas"
    },
    {
      title: "Novedades",
      icon: <IoSparklesOutline className="w-6 h-6 text-green-500" />,
      href: "/category/newest"
    },
    {
      title: "Contacto",
      icon: <IoLogoWhatsapp className="w-6 h-6 text-green-600" />,
      href: whatsappUrl(),
      external: true
    }
  ]

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowMegaMenu(!showMegaMenu)
  }

  const closeMegaMenu = () => {
    setShowMegaMenu(false)
  }

  // Cerrar menu al hacer click fuera
  const handleOutsideClick = () => {
    setShowMegaMenu(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    
    // Bloquear scroll
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    document.body.style.overflow = ''
  }

  const handleStoreClick = () => {
    // Disparar evento para abrir selector
    window.dispatchEvent(new Event('openStoreSelector'))
  }

  const handleStoreChange = () => {
    clearSelectedStore()
    // Disparar evento para abrir selector
    window.dispatchEvent(new Event('openStoreSelector'))
  }

  return (
    <div className=" bg-orange-200/50 to-orange-100 text-gray-800 shadow-lg relative z-10">
      <div className="container mx-auto px-4">
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          {/* Tienda Actual */}
          <div 
            onClick={handleStoreClick}
            className="flex items-center gap-2 px-4 py-3 cursor-pointer bg-green-200/50 backdrop-blur-lg rounded-lg border-white/50 hover:bg-white hover:shadow-sm transition-colors"
          >
            <IoStorefrontOutline className="w-6 h-6 text-green-600" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">
                {selectedStore ? selectedStore.name : 'Seleccionar Tienda'}
              </span>
              {selectedStore && (
                <span className="text-xs text-gray-700 truncate max-w-48">
                  {selectedStore.address}
                </span>
              )}
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center overflow-x-auto">
            {navItems.map((item) => (
              <div key={item.title} className="relative">
                {item.hasDropdown ? (
                  <button
                    onClick={item.title === "Categorías" ? handleCategoryClick : undefined}
                    className="flex items-center gap-2 px-4 py-3 hover:bg-white hover:shadow-sm transition-colors whitespace-nowrap text-gray-800 rounded-md"
                  >
                    {item.icon}
                    <span className="text-sm font-medium">{item.title}</span>
                    <IoChevronDownOutline 
                      className={`w-3 h-3 ml-1 transition-transform text-gray-600 ${
                        showMegaMenu && item.title === "Categorías" ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                ) : item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-3 hover:bg-white hover:shadow-sm transition-colors whitespace-nowrap text-gray-800 rounded-md"
                  >
                    {item.icon}
                    <span className="text-sm font-medium">{item.title}</span>
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 px-4 py-3 hover:bg-white hover:shadow-sm transition-colors whitespace-nowrap text-gray-800 rounded-md"
                  >
                    {item.icon}
                    <span className="text-sm font-medium">{item.title}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-between py-3">
          {/* Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            {isMobileMenuOpen ? (
              <IoCloseOutline className="w-5 h-5" />
            ) : (
              <IoMenuOutline className="w-5 h-5" />
            )}
            <span className="text-sm font-medium">Menú</span>
          </button>

          {/* Store Button */}
          {/* <button 
            onClick={handleStoreClick}
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white hover:shadow-sm transition-colors border border-gray-200"
          >
            <IoStorefrontOutline className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-800">
              {selectedStore ? selectedStore.name.split(' ').slice(-1)[0] : 'Tienda'}
            </span>
          </button> */}
        </div>

        {/* Mobile Menu Full Screen */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-white z-50 md:hidden">
            {/* Header with Close Button */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Menú Principal</h2>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <IoCloseOutline className="w-6 h-6 text-gray-800" />
              </button>
            </div>

            {/* Menu Content */}
            <div className="flex-1 overflow-y-auto">
              
              {/* Store Option */}
              <div className="border-b border-gray-200">
                <button 
                  onClick={handleStoreClick}
                  className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors text-left"
                >
                  <IoStorefrontOutline className="w-6 h-6 text-green-600" />
                  <div>
                    <span className="font-medium text-gray-800">
                      {selectedStore ? selectedStore.name : 'Seleccionar Tienda'}
                    </span>
                    <p className="text-sm text-gray-600 mt-1">
                      {selectedStore ? selectedStore.address : 'Elige tu sucursal preferida'}
                    </p>
                  </div>
                </button>
              </div>

              {/* Navigation Items */}
              {navItems.map((item) => (
                <div key={item.title}>
                  {item.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === item.title ? null : item.title)}
                        className="w-full flex items-center justify-between gap-3 px-4 py-4 hover:bg-gray-50 transition-colors text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-green-600 text-xl">
                            {item.icon}
                          </div>
                          <span className="font-medium text-gray-800 text-lg">{item.title}</span>
                        </div>
                        <IoChevronDownOutline 
                          className={`w-5 h-5 text-gray-600 transition-transform ${
                            activeDropdown === item.title ? 'rotate-180' : ''
                          }`} 
                        />
                      </button>
                      
                      {/* Categories Sub-menu Mobile */}
                      {item.title === "Categorías" && activeDropdown === "Categorías" && (
                        <div className="bg-gray-50">
                          {categorias.filter(cat => !cat.parentId).map((categoria) => (
                            <div key={categoria.id}>
                              {/* Main Category */}
                              <Link
                                href={`/category/${categoria.slug || categoria.title}`}
                                onClick={closeMobileMenu}
                                className="flex items-center gap-3 px-8 py-4 hover:bg-white transition-colors"
                              >
                                <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                                  <span className="text-white text-xs font-bold">
                                    {categoria.title.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <span className="text-gray-800 font-medium capitalize">{categoria.title}</span>
                              </Link>
                              
                              {/* Subcategories */}
                              {categoria.subcategories && categoria.subcategories.length > 0 && (
                                <div className="ml-4">
                                  {categoria.subcategories.map((subcat) => (
                                    <Link
                                      key={subcat.id}
                                      href={`/category/${subcat.slug || subcat.title}`}
                                      onClick={closeMobileMenu}
                                      className="flex items-center gap-2 px-8 py-2 hover:bg-white transition-colors"
                                    >
                                      <span className="text-gray-500 text-sm">•</span>
                                      <span className="text-gray-600 text-sm capitalize">{subcat.title}</span>
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="text-green-600 text-xl">
                          {item.icon}
                        </div>
                        <span className="font-medium text-gray-800 text-lg">{item.title}</span>
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="text-green-600 text-xl">
                          {item.icon}
                        </div>
                        <span className="font-medium text-gray-800 text-lg">{item.title}</span>
                      </Link>
                    )
                  )}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-4 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                Papelería 4 Patitas - Todo para tus proyectos
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Mega Category Menu - Desktop */}
      {showMegaMenu && (
        <>
          {/* Backdrop to close menu when clicking outside */}
          <div 
            className="fixed inset-0 z-20 bg-transparent"
            onClick={handleOutsideClick}
          />
          
          <div className="absolute top-full left-0 right-0 -mt-1 z-40">
            <MegaCategoryMenu 
              categories={categorias} 
              onClose={closeMegaMenu}
            />
          </div>
        </>
      )}


    </div>
  )
}
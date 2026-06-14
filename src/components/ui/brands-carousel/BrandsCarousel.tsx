'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'

interface Brand {
  id: string
  name: string
  logo: string
  slug: string
}

interface Props {
  brands: Brand[]
  autoPlay?: boolean
  speed?: number
}

export const BrandsCarousel = ({ 
  brands, 
  autoPlay = true, 
  speed = 30 
}: Props) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Animación automática
  useEffect(() => {
    if (!autoPlay || isHovered) return

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current
        const scrollAmount = 1 // Scroll suave de 1px

        if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
          // Si llegamos al final, volver al inicio
          container.scrollLeft = 0
          setCurrentIndex(0)
        } else {
          container.scrollLeft += scrollAmount
          setCurrentIndex(prev => (prev + 1) % brands.length)
        }
      }
    }, speed)

    return () => clearInterval(interval)
  }, [autoPlay, isHovered, speed, brands.length])

  // Navegación manual
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: 'smooth'
      })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: 'smooth'
      })
    }
  }

  // Duplicar las marcas para crear un efecto infinito
  const duplicatedBrands = [...brands, ...brands, ...brands]

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Botones de navegación */}
      <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:flex items-center justify-center hover:scale-110"
      >
        <IoChevronBack className="w-5 h-5 text-gray-700" />
      </button>

      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:flex items-center justify-center hover:scale-110"
      >
        <IoChevronForward className="w-5 h-5 text-gray-700" />
      </button>

      {/* Container del carrusel */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide py-4 px-4"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {duplicatedBrands.map((brand, index) => (
          <Link
            key={`${brand.id}-${index}`}
            href={`/search?productSearch=${encodeURIComponent(brand.name)}`}
            className="flex-none group/brand"
          >
            <div className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-3 min-w-[140px] lg:min-w-[180px] h-20 lg:h-24 flex items-center justify-center group-hover/brand:scale-105">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={120}
                height={80}
                className="w-full h-full object-contain filter hover:grayscale transition-all duration-300 scale-125"
              />
              
              {/* Overlay con nombre de la marca */}
              <div className="absolute inset-0 bg-black/0 group-hover/brand:bg-black/80 transition-all duration-300 rounded-xl flex items-center justify-center opacity-0 group-hover/brand:opacity-100">
                <span className="text-white text-lg font-bold text-center px-2">
                  {brand.name}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Indicador de scroll para móvil */}
      <div className="flex justify-center mt-2 md:hidden">
        <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          Desliza para ver más marcas →
        </div>
      </div>

      {/* Indicadores de progreso */}
      {/* <div className="flex justify-center mt-4 space-x-1">
        {brands.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex % brands.length
                ? 'bg-blue-500 scale-125'
                : 'bg-gray-300'
            }`}
          />
        ))}
      </div> */}
    </div>
  )
} 
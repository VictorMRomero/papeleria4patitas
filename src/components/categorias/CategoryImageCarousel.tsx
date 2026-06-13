'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'

interface CategoryImageCarouselProps {
  images: string[]
  autoSlide?: boolean
  slideInterval?: number
  className?: string
}

export const CategoryImageCarousel = ({ 
  images = [], 
  autoSlide = true, 
  slideInterval = 5000,
  className = ""
}: CategoryImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Si no hay imágenes, usar imagen por defecto
  const defaultImages = [
    'https://res.cloudinary.com/dog6zhxr8/image/upload/v1706763864/Ads/bu0xxz15orrumrqsukzs.png'
  ]
  
  const displayImages = images.length > 0 ? images : defaultImages

  useEffect(() => {
    if (!autoSlide || displayImages.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % displayImages.length)
    }, slideInterval)

    return () => clearInterval(interval)
  }, [autoSlide, slideInterval, displayImages.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex(prev => prev === 0 ? displayImages.length - 1 : prev - 1)
  }

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % displayImages.length)
  }

  if (displayImages.length === 0) return null

  return (
    <div className={`relative group ${className}`}>
      {/* Contenedor de la imagen */}
      <div className="relative w-full h-40 overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={displayImages[currentIndex]}
          alt={`Imagen ${currentIndex + 1}`}
          fill
          className="object-cover transition-opacity duration-500"
          priority={currentIndex === 0}
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Controles de navegación - solo mostrar si hay más de una imagen */}
      {displayImages.length > 1 && (
        <>
          {/* Botón anterior */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            aria-label="Imagen anterior"
          >
            <IoChevronBack className="w-4 h-4" />
          </button>

          {/* Botón siguiente */}
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            aria-label="Imagen siguiente"
          >
            <IoChevronForward className="w-4 h-4" />
          </button>

          {/* Indicadores de puntos */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
            {displayImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex 
                    ? 'bg-white shadow-sm' 
                    : 'bg-white/60 hover:bg-white/80'
                }`}
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Contador de imágenes */}
      {displayImages.length > 1 && (
        <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
          {currentIndex + 1} / {displayImages.length}
        </div>
      )}
    </div>
  )
}

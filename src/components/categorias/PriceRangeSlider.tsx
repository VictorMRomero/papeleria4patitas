'use client'

import { useState, useEffect, useRef } from 'react'

interface PriceRangeSliderProps {
  min: number
  max: number
  value: [number, number]
  onChange: (value: [number, number]) => void
  step?: number
  formatValue?: (value: number) => string
  minDistance?: number
}

export const PriceRangeSlider = ({
  min,
  max,
  value,
  onChange,
  step = 1,
  minDistance = 0,
  formatValue = (val) => `$${val.toLocaleString()}`
}: PriceRangeSliderProps) => {
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null)
  const [localValue, setLocalValue] = useState<[number, number]>(value)
  const sliderRef = useRef<HTMLDivElement>(null)

  // Sincronizar valor local cuando cambia el prop externo
  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleMouseDown = (type: 'min' | 'max') => (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(type)
  }

  useEffect(() => {
    // Si no estamos arrastrando, no hacer nada.
    if (!isDragging) {
      return
    }

    // Usar una función estable para el mousemove que lea el valor más reciente.
    const handleMouseMove = (e: MouseEvent) => {
      if (!sliderRef.current) return

      const rect = sliderRef.current.getBoundingClientRect()
      const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
      let newValue = min + percent * (max - min)


      if (step && step > 0) {
        newValue = Math.round((newValue - min) / step) * step + min
      }

      setLocalValue(([lo, hi]) => {
        const gap = Math.max(0, minDistance)
        if (isDragging === 'min') {
          const newMin = Math.min(newValue, hi - gap)     // ya no usamos "step" aquí
          return [Math.max(min, newMin), hi]
        } else {
          const newMax = Math.max(newValue, lo + gap)     // ya no usamos "step" aquí
          return [lo, Math.min(max, newMax)]
        }
      })
    }

    const handleMouseUp = () => {
      // Al soltar, llamamos a onChange con el valor final del estado local
      setLocalValue(currentValue => {
        onChange(currentValue)
        return currentValue
      })
      setIsDragging(null)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    // Las dependencias ahora son estables y no cambian durante el arrastre.
  },  [isDragging, min, max, step, minDistance, onChange])

  const minPercent = ((localValue[0] - min) / (max - min)) * 100
  const maxPercent = ((localValue[1] - min) / (max - min)) * 100

  return (
    <div className="space-y-4">
      {/* Etiquetas de valor */}
      <div className="flex justify-between text-sm text-gray-600">
        <span>{formatValue(localValue[0])}</span>
        <span>{localValue[1] === max ? 'Sin límite' : formatValue(localValue[1])}</span>
      </div>

      {/* Slider container */}
      <div className="relative" ref={sliderRef}>
        {/* Track */}
        <div className="h-2 bg-gray-200 rounded-lg relative">
          {/* Progress bar */}
          <div
            className="absolute h-2 bg-blue-500 rounded-lg transition-all duration-150"
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`
            }}
          />
          
          {/* Min thumb */}
          <div
            className={`absolute w-5 h-5 border-2 border-white rounded-full shadow-md cursor-pointer transform -translate-y-1/2 -translate-x-1/2 transition-all duration-150 ${
              isDragging === 'min' 
                ? 'bg-blue-700 scale-110' 
                : 'bg-blue-600 hover:scale-105'
            }`}
            style={{ left: `${minPercent}%`, top: '50%' }}
            onMouseDown={handleMouseDown('min')}
          />
          
          {/* Max thumb */}
          <div
            className={`absolute w-5 h-5 border-2 border-white rounded-full shadow-md cursor-pointer transform -translate-y-1/2 -translate-x-1/2 transition-all duration-150 ${
              isDragging === 'max' 
                ? 'bg-blue-700 scale-110' 
                : 'bg-blue-600 hover:scale-105'
            }`}
            style={{ left: `${maxPercent}%`, top: '50%' }}
            onMouseDown={handleMouseDown('max')}
          />
        </div>
      </div>

      {/* Indicador de rango seleccionado */}
      <div className="text-center text-xs text-gray-500">
        Rango: {formatValue(localValue[0])} - {localValue[1] === max ? 'Sin límite' : formatValue(localValue[1])}
      </div>
    </div>
  )
}

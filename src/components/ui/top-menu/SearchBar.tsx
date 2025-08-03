'use client'

import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import { IoSearchOutline } from "react-icons/io5"

export const SearchBar = () => {
  const [searchText, setSearchText] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const handleSearch = () => {
    if (searchText.trim().length >= 3) {
      router.push(`/search?productSearch=${encodeURIComponent(searchText.trim())}`)
      setSearchText('')
      inputRef.current?.blur()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => setIsFocused(false)

  return (
    <div className="w-full max-w-2xl">
      <div className={`
        flex items-center rounded-full overflow-hidden bg-gray-100
        border-2 transition-all duration-200 mb-2 lg:mb-0
        ${isFocused 
          ? 'border-blue-500 shadow-lg shadow-yellow-500/20' 
          : 'border-blue-300 hover:border-blue-600'
        }
      `}>
        <div className="pl-4 pr-2 py-2">
          <IoSearchOutline className="w-5 h-5 text-blue-500" />
        </div>
        
        <input
          ref={inputRef}
          value={searchText}
          onChange={handleSearchChange}
          onKeyDown={handleKeyPress}
          onFocus={handleFocus}
          onBlur={handleBlur}
          type="text"
          className="flex-1 py-3 pr-4 text-gray-900 placeholder-red bg-transparent focus:outline-none text-sm md:text-base"
          placeholder="Buscar productos, categorías o marcas..."
        />
        
        <button
          onClick={handleSearch}
          disabled={searchText.trim().length < 3}
          className={`
            m-1 px-4 py-2 rounded-full font-medium transition-all duration-200
            ${searchText.trim().length >= 3
              ? 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg'
              : 'bg-green-300 text-gray-800 cursor-not-allowed'
            }
          `}
          aria-label="Buscar"
        >
          <span className="hidden sm:inline">Buscar</span>
          <IoSearchOutline className="w-4 h-4 sm:hidden" />
        </button>
      </div>
      
      {searchText.length > 0 && searchText.length < 3 && (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 px-4">
          Mínimo 3 caracteres para buscar
        </p>
      )}
    </div>
  )
}
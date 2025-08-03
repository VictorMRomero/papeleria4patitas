'use client'

import { useCartStore } from "@/store"
import Link from "next/link"
import { useEffect, useState } from "react"
import { IoCartOutline } from "react-icons/io5"

export const CartButton = () => {
  const totalItemsInCart = useCartStore(state => state.getTotalItems())
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const href = loaded && totalItemsInCart > 0 ? '/cart' : '/empty'

  return (
    <Link 
      href={href}
      className="relative flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group border border-gray-200 hover:border-gray-300"
    >
      <div className="relative">
        <IoCartOutline className="w-6 h-6 text-gray-700 group-hover:text-green-600 transition-colors" />
        
        {loaded && totalItemsInCart > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
            {totalItemsInCart > 9 ? '9+' : totalItemsInCart}
          </span>
        )}
      </div>
      
      <span className="hidden sm:block text-sm font-medium text-gray-700 group-hover:text-green-600 transition-colors">
        Mi carrito
      </span>
    </Link>
  )
}
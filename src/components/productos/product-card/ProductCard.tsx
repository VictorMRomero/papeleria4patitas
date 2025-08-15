'use client'

import { ProductImage } from "@/components"
import { CartProduct, ProductStore } from "@/interfaces"
import Link from "next/link"
import { currencyFormat } from "@/utils"
import { IoCartOutline } from "react-icons/io5"
import { useCartStore } from "@/store"
import { useState } from "react"

interface Props {
    productStore: ProductStore
    variant?: 'grid' | 'carousel'
}

export const ProductCard = ({ productStore, variant = 'grid' }: Props) => {
    const [showConfirmation, setShowConfirmation] = useState(false)
    const addProductToCart = useCartStore(state => state.addProductToCart)

    const addToCart = (productStore: ProductStore) => {
        setShowConfirmation(true)
        const cartProduct: CartProduct = {
            id: productStore.id,
            title: productStore.product.title,
            description: productStore.product.description,
            inStock: productStore.stock,
            price: productStore.price,
            slug: productStore.product.slug,
            quantity: 1,
            descuento: productStore.discount ?? 0,
            image: (productStore.product.images) ? productStore.product.images[0].url : 'no hay'
        }
        addProductToCart(cartProduct)
        setTimeout(() => setShowConfirmation(false), 2000)
    }

    if (!productStore) {
        return null
    }

    const firstImage = productStore.product.images && productStore.product.images.length > 0
        ? productStore.product.images[0].url
        : undefined

    // Estilos para variante carousel (más alto, diseño vertical)
    if (variant === 'carousel') {
        return (
            <div className="w-48 md:w-56 lg:w-auto h-80 md:h-96 lg:h-auto overflow-hidden shadow-lg bg-white rounded-xl hover:shadow-xl transition-all duration-300 relative group flex flex-col">
                <div className="relative flex-shrink-0">
                    <Link href={`/product/${productStore.product.slug}`}>
                        <ProductImage
                            src={firstImage}
                            alt={productStore.product.title}
                            className="w-full h-48 md:h-56 lg:h-64 object-contain rounded-t-xl hover:scale-105 transition-transform duration-300"
                            width={200}
                            height={200}
                        />
                    </Link>
                    
                    <button 
                        className="absolute right-2 -bottom-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 md:p-2 shadow-lg transition-all duration-300 transform hover:scale-125"
                        onClick={() => {addToCart(productStore)}}
                    >
                        <IoCartOutline size={20} className="md:w-[30px] md:h-[30px]" />
                    </button>
                </div>

                {/* Confirmación de agregado al carrito */}
                {showConfirmation && (
                    <div className="absolute lg:top-16 top-12 left-2 right-2 bg-green-500 text-white px-2 py-1 rounded-lg text-xs md:text-base text-center animate-pulse">
                        ¡Agregado al carrito!
                    </div>
                )}

                {/* Badge de descuento */}
                {(productStore.discount ?? 0) > 3 && (
                    <div className="absolute top-2 left-2">
                        <span className="inline-block bg-red-500 rounded-full p-2 lg:p-3 text-xs md:text-base font-semibold text-white">
                            -{productStore.discount}%
                        </span>
                    </div>
                )}

                {/* Información del producto */}
                <div className="p-3 flex-grow flex flex-col justify-between">
                    <div className="flex-grow">
                        <div className="mb-2">
                            <Link 
                                className="hover:text-blue-600 transition-colors" 
                                href={`/product/${productStore.product.slug}`}
                            >
                                <p className="text-sm md:text-base font-medium text-gray-800 line-clamp-2 leading-tight min-h-[2.5rem] md:min-h-[3rem] text-left">
                                    {productStore.product.title}
                                </p>
                            </Link>
                        </div>

                        <p className="text-xs text-gray-500 mb-2">Precio de contado</p>
                    </div>
                    
                    <div className="flex items-baseline mt-auto">
                        {(productStore.discount && productStore.discount > 1) ? (
                            <>
                                <span className="text-base md:text-lg lg:text-xl font-bold text-red-500">
                                    {currencyFormat((productStore.price - (productStore.discount * productStore.price) / 100))}
                                </span>
                                <span className="ml-2 text-xs md:text-sm line-through text-gray-400">
                                    {currencyFormat(productStore.price)}
                                </span>
                            </>
                        ) : (
                            <span className="text-base md:text-lg lg:text-xl font-bold text-gray-700">
                                {currencyFormat(productStore.price)}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    // Estilos para variante grid (más compacto, diseño adaptable)
    return (
        <div className="group overflow-hidden shadow-sm hover:shadow-md bg-white text-black rounded-lg transition-shadow relative">
            <div className="relative w-full h-40 sm:h-48 lg:h-56 overflow-hidden bg-gray-50">
                <Link href={`/product/${productStore.product.slug}`} className="block w-full h-full">
                    <ProductImage
                        src={firstImage}
                        alt={productStore.product.title}
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                        width={600}
                        height={600}
                    />
                </Link>
                <button 
                    className="hidden lg:flex items-center justify-center absolute right-3 bottom-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition-all duration-200"
                    onClick={() => {addToCart(productStore)}}
                >
                    <IoCartOutline size={20} />
                </button>
            </div>
            
            {showConfirmation && (
                <div className="absolute top-2 left-2 transform bg-green-500 text-white px-3 py-1 rounded-full text-xs whitespace-nowrap animate-fade-in-out">
                    ¡Agregado al carrito!
                </div>
            )}

            {(productStore.discount ?? 0) > 3 && (
                <div className="pl-4 pt-2">
                    <span className="inline-block bg-red-500 rounded-full px-2 py-0.5 text-xs font-semibold text-white mr-2">
                        -{productStore.discount}%
                    </span>
                </div>
            )}

            <div className="px-4 pb-3 mt-2">
                <div className="sm:text-lg mb-1">
                    <Link className="hover:text-blue-600 sm:text-lg" href={`/product/${productStore.product.slug}`}>
                        <p className="hidden sm:block truncate">{productStore.product.title}</p>
                        <p className="block sm:hidden truncate">{productStore.product.title}</p>
                    </Link>
                </div>

                <p className="hidden sm:block text-gray-400 text-xs">Precio de contado</p>
                <div className="flex items-baseline mt-1 gap-2">
                    {(productStore.discount && productStore.discount > 1) ? (
                        <>
                            <span className="text-base sm:text-xl lg:text-2xl font-bold text-red-600">
                                {currencyFormat((productStore.price - (productStore.discount * productStore.price) / 100))}
                            </span>
                            <span className="text-sm line-through text-gray-600">
                                {currencyFormat(productStore.price)}
                            </span>
                        </>
                    ) : (
                        <span className="text-gray-800 sm:text-xl lg:text-2xl font-bold">
                            {currencyFormat(productStore.price)}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

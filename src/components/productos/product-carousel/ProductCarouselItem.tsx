'use client'

import { ProductImage } from "@/components"
import { CartProduct, Product, ProductStore } from "@/interfaces"
import Link from "next/link"
import { currencyFormat } from "@/utils"
import { IoCartOutline } from "react-icons/io5"
import { useCartStore } from "@/store"
import { useState } from "react"

interface Props {
    productStore: ProductStore
}

export const ProductCarouselItem = ({ productStore }: Props) => {
    const [showConfirmation, setShowConfirmation] = useState(false)
    const addProductToCart = useCartStore(state => state.addProductToCart)

    const addToCart = (productStore: ProductStore) => {
        setShowConfirmation(true)
        const cartProduct: CartProduct = {
            id: productStore.product.id,
            title: productStore.product.title,
            description: productStore.product.description,
            inStock: productStore.stock,
            price: productStore.finalPrice,
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

    return (
        <div className="w-48 md:w-56 lg:w-auto h-80 md:h-96 lg:h-auto overflow-hidden shadow-lg bg-gray-100 rounded-xl hover:shadow-xl transition-all duration-300 relative group flex flex-col">
            <div className="relative flex-shrink-0">
                <Link href={`/product/${productStore.product.slug}`}>
                    <ProductImage
                        src={
                            (!!productStore.product.images && productStore.product.images.length > 0)
                                ? productStore.product.images[0].url 
                                : 'localImage'
                        }
                        alt={productStore.product.title}
                        className="w-full h-48 md:h-56 lg:h-64 object-cover rounded-t-xl hover:scale-105 transition-transform duration-300"
                        width={200}
                        height={200}
                    />
                </Link>
                
                {/* Botón de agregar al carrito - Siempre visible en móvil */}
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

            {/* Información del producto - Flex grow para ocupar espacio restante */}
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
                                {currencyFormat((productStore.finalPrice - (productStore.discount * productStore.finalPrice) / 100))}
                            </span>
                            <span className="ml-2 text-xs md:text-sm line-through text-gray-400">
                                {currencyFormat(productStore.finalPrice)}
                            </span>
                        </>
                    ) : (
                        <span className="text-base md:text-lg lg:text-xl font-bold text-gray-700">
                            {currencyFormat(productStore.finalPrice)}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}
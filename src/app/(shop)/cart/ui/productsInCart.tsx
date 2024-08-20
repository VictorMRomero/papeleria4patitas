'use client'


import { ProductImage, QuantitySelector } from "@/components";
import { useCartStore } from "@/store"
import { useEffect, useState } from "react";
import Link from "next/link";
import { currencyFormat } from "@/utils";


export const ProductsInCart = () => {

    const updateProductQuantity = useCartStore(state => state.updateProductQuantity);
    const removeProductInCart = useCartStore(state => state.removeProduct)
    const [loaded, setLoaded] = useState(false);
    const productsInCart = useCartStore(state => state.cart);

    useEffect(() => {
        setLoaded(true);

    }, [])

    if (!loaded) {
        return <p>Cargando...</p>
    }




    return (
        <>
            {
                productsInCart.map((product) => (
                    <div key={product.slug} className="bg-gray-100 border dark:border-red dark:bg-gray-800 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center">
                        <div className="w-full sm:w-24 h-24 dark:bg-gray-700 grid-background bg-gray-300 rounded-md mb-4 sm:mb-0 sm:mr-4 flex justify-center items-center">
                            <ProductImage
                                src={product.image}
                                width={100}
                                height={100}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                                alt={product.title}
                                className="rounded"
                            />
                        </div>
                        <div className="flex-grow mb-4 sm:mb-0">
                            <Link
                                className="text-black dark:text-white hover:underline cursor-pointer text-lg font-semibold"
                                href={`/product/${product.slug}`}
                            >
                                {product.title}
                            </Link>
                            <p className="text-sm text-gray-400 mt-1">{product.description.slice(0,25)}...</p>
                            <div className="flex items-center mt-2">
                                <button onClick={() => removeProductInCart(product)} className="text-red-400">✕ Remove</button>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center mt-4 sm:mt-0">
                            <QuantitySelector
                                inStock={product.inStock}
                                quantity={product.quantity}
                                onQuantityChanged={quantity => updateProductQuantity(product, quantity)}
                            />
                            <span className={`mt-2 sm:mt-0 sm:ml-6 text-xl font-bold ${product.descuento ? 'text-red-500' : ''}`}>
                                {product.descuento
                                    ? currencyFormat((product.price * (100 - product.descuento) / 100))
                                    : currencyFormat(product.price)
                                }
                            </span>
                        </div>
                    </div>

                ))
            }
        </>
    )
}

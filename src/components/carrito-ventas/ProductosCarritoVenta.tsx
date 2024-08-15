'use client'
import { useCartStore } from "@/store";
import { useEffect, useState } from "react";
import { ProductosVenta } from "./ProductosVenta";


export const ProductosCarritoVenta = () => {
    const [loaded, setLoaded] = useState(false);

    const { itemInCart, subTotal, total } = useCartStore(state => state.getSumaryInformation());

    const clearCart = useCartStore(state => state.clearCart)

    useEffect(() => {
        setLoaded(true)
    }, [])

    if (!loaded) return <p>Cargando...</p>


    return (
        <>
            <div className="h-16 text-center flex justify-center">
                <div className="pl-8 text-left text-lg py-4 relative">

                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {/* numero de elementos */}
                    <div className="text-center absolute bg-cyan-500 text-white w-5 h-5 text-xs p-0 leading-5 rounded-full -right-2 top-3" >{itemInCart}</div>
                </div>
                <div className="flex-grow px-8 text-right text-lg py-4 relative">

                    <button className="text-blue-gray-300 hover:text-pink-500 focus:outline-none" onClick={() => clearCart()}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>

            <ProductosVenta />
        </>
    )
}
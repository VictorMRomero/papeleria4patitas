'use client'
import { useCartStore } from "@/store";
import { useEffect, useState } from "react";
import { ProductosVenta } from "./ProductosVenta";
import { IoTrashBinOutline } from "react-icons/io5";



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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {/* numero de elementos */}
                    <div className="text-center absolute bg-cyan-500 text-white w-5 h-5 text-xs p-0 leading-5 rounded-full -right-2 top-3" >{itemInCart}</div>
                </div>
                <div className="flex-grow px-8 text-right text-lg py-4 relative">

                    <button className="text-blue-gray-300 hover:text-pink-500 focus:outline-none" onClick={() => clearCart()}>
                        <IoTrashBinOutline className="h-6 w-6 inline-block"/>

                    </button>
                </div>
            </div>

            <ProductosVenta />
        </>
    )
}
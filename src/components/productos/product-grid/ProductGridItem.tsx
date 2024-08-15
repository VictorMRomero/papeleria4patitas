'use client';

import { useState } from "react";
import { ProductImage } from "@/components";
import { Product } from "@/interfaces"
import Link from "next/link";
import { titleFont } from "@/config/fonts";
import { AddtoCart } from "@/app/(shop)/product/[slug]/ui/AddtoCart";
import { currencyFormat } from "@/utils";
import { IoPricetagOutline } from "react-icons/io5";


interface Props {
    product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
    
// {/* <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-800 text-white">
// <img className="w-full" src="/ruta/a/tu/imagen.jpg" alt="Ropero Mobi Firenze Fresno" />


// </div>
// </div> */}
    if(!product){
        return <h1>Verifica tu conexion, no pudimos obtener los productos, intenta mas tarde</h1>
    }
    
    return (
        <div className="max-w-sm overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-md fade-in bg-gray-100 duration-500 hover:shadow-xl">
            <Link href={`/product/${product.slug}`}>
                <ProductImage
                    src={
                        (!!product.images)
                        ? product.images[0]
                        : 'localImage'
                    }
                    alt={product.title}
                    className="w-full rounded-top-xl hover:scale-110 grid-background dark:bg-gray-700"
                    width={500}
                    height={500}
                />
            </Link>
            <div className="pl-6 pt-1 sm:pt-2">
                {
                    (product.discount && product.discount > 1) && (

                            <span className="inline-block bg-red-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">
                                -{product.discount}%
                            </span>

                    )
                }
            </div>
            <div className="px-6 mb-2 mt-2 ">

                <div className="sm:text-lg mb-2">
                    <Link className={`  hover:text-blue-600 sm:text-lg`} href={`/product/${product.slug}`}>
                        <p className="hidden sm:block">{product.title}</p>
                        <p className="block sm:hidden text-base">{product.title.slice(0,13)}...</p>
                    </Link>
                </div>

                <p className="hidden sm:block text-gray-400 text-sm">Precio de contado</p>
                <div className="flex items-baseline mt-1">
                    {
                    (product.discount && product.discount > 1) 
                    ? <>
                            <span className="text-base sm:text-xl lg:text-2xl font-bold text-red-500">{currencyFormat((product.price - (product.discount *  product.price) /100 ))}</span>
                            <span className="ml-2 text-sm line-through text-gray-600 dark:text-gray-500">{currencyFormat(product.price)}</span>
                    </>
                    : <span className="dark:text-base text-gray-600 sm:text-xl lg:text-2xl font-bold">{currencyFormat(product.price)}</span>
                    }

                </div>
            </div>
            

        </div>



    )
}

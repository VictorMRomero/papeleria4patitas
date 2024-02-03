'use client';

import { useState } from "react";
import { ProductImage } from "@/components";
import { Product } from "@/interfaces"
import Link from "next/link";
import { titleFont } from "@/config/fonts";
import { AddtoCart } from "@/app/(shop)/product/[slug]/ui/AddtoCart";
import { currencyFormat } from "@/utils";


interface Props {
    product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
    
    
    
    return (
        <div className="rounded-md overflow-hidden fade-in bg-gray-100 shadow-md duration-500 hover:shadow-xl">
            <Link href={`/product/${product.slug}`} 
             
            >

                <ProductImage
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full object-cover rounded-top-xl hover:scale-110"
                    width={500}
                    height={500}
                />
            </Link>


            <div className="p-2 flex flex-col items-left ">
                <Link className={`  hover:text-blue-600 sm:text-lg`} href={`/product/${product.slug}`}>
                    {(product.title).slice(0, 20)}...
                </Link>
                {
                    (!!product.descuento) 
                    ? <>
                        <span className={`text-xl font-bold cursor-auto line-through text-gray-400`}>{currencyFormat(product.price) }</span> 
                        <span className={`text-xl font-bold cursor-auto text-red-500 `}>{currencyFormat(Math.round(product.price * (100 - product.descuento)/100)) }</span>
                    </>
                    
                    :<span className={`text-xl font-bold cursor-auto `}>{currencyFormat(product.price) }</span>
                }

                <AddtoCart product={product}/>
            </div>
        </div>

    )
}

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

    const [displayImage, setDisplayImage] = useState(product.images[0]);


    return (
        <div className="rounded-md overflow-hidden fade-in bg-gray-100 shadow-md duration-500 hover:shadow-xl">
            <Link href={`/product/${product.slug}`} 
                // onMouseEnter={() => setDisplayImage(product.images[1])}
                // onMouseLeave={() => setDisplayImage(product.images[0])}
                
            >

                <ProductImage
                    src={displayImage}
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
                <span className={`text-xl font-bold cursor-auto `}>{currencyFormat(product.price) }</span>

                <AddtoCart product={product}/>
            </div>

            



           
      


      
    </div>





        
    )
}

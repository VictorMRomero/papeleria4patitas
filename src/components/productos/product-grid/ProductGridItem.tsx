'use client';

import { useState } from "react";
import { ProductImage } from "@/components";
import { Product } from "@/interfaces"
import Link from "next/link";
import { titleFont } from "@/config/fonts";
import { AddtoCart } from "@/app/(shop)/product/[slug]/ui/AddtoCart";


interface Props {
    product: Product;
}

export const ProductGridItem = ({ product }: Props) => {

    const [displayImage, setDisplayImage] = useState(product.images[0]);


    return (
        <div className="rounded-md overflow-hidden fade-in bg-gray-100">
            <Link href={`/product/${product.slug}`} 
                onMouseEnter={() => setDisplayImage(product.images[1])}
                onMouseLeave={() => setDisplayImage(product.images[0])}
            >

                <ProductImage
                    src={displayImage}
                    alt={product.title}
                    className="w-full object-cover rounded"
                    width={500}
                    height={500}
                />
            </Link>

            <div className="p-2 flex flex-col items-center">
                <Link className={`${titleFont.className} text-xl font-bold  hover:text-yellow-600 text-center`} href={`/product/${product.slug}`}>
                    {product.title}
                </Link>
            </div>
            <div className="p-2 flex flex-col items-center">

                <span className={`${titleFont.className} antialiased font-bold text-lg text-blue-700`}>${product.price}</span>

                <AddtoCart product={product}/>
            </div>

        </div>
    )
}

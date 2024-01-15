'use client'

import Image from "next/image";
import { QuantitySelector } from "@/components";
import { useCartStore } from "@/store"
import { useEffect, useState } from "react";
import Link from "next/link";


export const ProductsInCart = () => {

    const updateProductQuantity = useCartStore(state => state.updateProductQuantity);
    const removeProductInCart = useCartStore(state => state.removeProduct)
    const [loaded, setLoaded] = useState(false);
    const productsInCart = useCartStore(state => state.cart);

    useEffect(() => {
        setLoaded(true);
    }, [])

    if(!loaded) {
        return <p>Cargando...</p>
    }

    


  return (
    <>
        {
            productsInCart.map((product)=> (
                <div key={product.slug} className="flex mb-5">
                    <Image
                        src={`/products/${product.image}`}
                        width={100}
                        height={100}
                        style={{
                            width: '100px',
                            height: '100px'
                        }}
                        alt={product.title}
                        className="mr-5 rounded"
                    />
                    <div>
                        <Link
                            className="hover:underline cursor-pointer" 
                            href={`/product/${product.slug}`}>
                            {product.title}
                        </Link>
                        
                        <p>${product.price}</p>
                        <QuantitySelector 
                            quantity={product.quantity} 
                            onQuantityChanged={quantity =>  updateProductQuantity(product, quantity)}
                        />
                        <button onClick={() => removeProductInCart(product) } className="underline mt-3 cursor-pointer">
                            Remover
                        </button>
                    </div>

                </div>
            ))
        }
    </>
  )
}
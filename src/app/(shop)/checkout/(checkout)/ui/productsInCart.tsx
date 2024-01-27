'use client'

import Image from "next/image";

import { useCartStore } from "@/store"
import { useEffect, useState } from "react";

import { currencyFormat } from "@/utils";
import { titleFont } from "@/config/fonts";


export const ProductsInCart = () => {

    
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
                <div key={product.slug} className={`${titleFont.className} flex mb-5 rounded-xl shadow-xl bg-slate-100`}>
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
                        <span className="text-lg" >
                            {product.title}
                        </span>
                        <hr />
                        <span>
                            Cantidad: {product.quantity}
                        </span>
                        
                        <p className="text-xl font-bold">{currencyFormat(product.price * product.quantity)}</p>


                    </div>

                </div>
            ))
        }
    </>
  )
}

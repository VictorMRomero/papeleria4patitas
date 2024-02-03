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
                    <div key={product.slug} className="flex mb-5">
                        <ProductImage
                            src={product.image}
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
                                className="hover:underline cursor-pointer text-xl font-bold"
                                href={`/product/${product.slug}`}>
                                {product.title}
                            </Link>

                            {
                                (!!product.descuento)
                                    ? <p className={`text-xl font-bold cursor-auto text-red-500 `}>{currencyFormat((product.price * (100 - product.descuento) / 100))}</p>
                                    : <p className={`text-xl font-bold cursor-auto `}>{currencyFormat(product.price)}</p>
                            }
                            <QuantitySelector
                                quantity={product.quantity}
                                onQuantityChanged={quantity => updateProductQuantity(product, quantity)}
                            />
                            <button onClick={() => removeProductInCart(product)} className="underline mt-3 cursor-pointer">
                                Remover
                            </button>
                        </div>

                    </div>
                ))
            }
        </>
    )
}

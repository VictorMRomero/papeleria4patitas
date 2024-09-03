'use client';

import { ProductImage } from "@/components";
import { CartProduct, Product } from "@/interfaces"
import Link from "next/link";
import { currencyFormat } from "@/utils";
import { IoCartOutline } from "react-icons/io5";
import { useCartStore } from "@/store";
import { useState } from "react";

interface Props {
    product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const addProductToCart = useCartStore(state => state.addProductToCart);
    const [quantity, setQuantity] = useState<number>(1);

    const addToCart = (product: Product) => {
        setShowConfirmation(true);
        const cartProduct: CartProduct = {
            id: product.id,
            title: product.title,
            description: product.description,
            inStock: product.inStock,
            price: product.price,
            slug: product.slug,
            quantity: 1,
            descuento: product.discount ?? 1,
            image: (product.images) ? product.images[0] : 'nohay'
        }
        addProductToCart(cartProduct);
        setQuantity(1);
        setTimeout(() => setShowConfirmation(false), 2000);
    }

    if (!product) {
        return <h1>Verifica tu conexion, no pudimos obtener los productos, intenta mas tarde</h1>
    }

    return (
        <div className="max-w-sm overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-md fade-in bg-gray-100 duration-500 hover:shadow-xl relative">
           <div className="relative">

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
                <button 
                    className="hidden lg:block absolute right-4 -bottom-5 bg-blue-200 hover:bg-blue-600 text-gray-700 rounded-full p-3 shadow-lg transition-all duration-300 transform hover:scale-110 mb-3"
                    onClick={() => {addToCart(product)}}
                    >
                    <IoCartOutline size={24} />
                </button>

           </div>
           {showConfirmation && (
        <div className=" transform bg-green-500 text-white px-3 py-1 rounded-full text-sm whitespace-nowrap animate-fade-in-out">
          ¡Agregado al carrito!
        </div>
      )}

            {
                (product.discount ?? 0) > 3 && (
                    <div className="pl-6 pt-1 sm:pt-2">
                        <span className="inline-block bg-red-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">
                            -{product.discount}%
                        </span>
                    </div>
                )
            }

            <div className="px-6 mb-2 mt-2 ">
                <div className="sm:text-lg mb-2">
                    <Link className={`  hover:text-blue-600 sm:text-lg`} href={`/product/${product.slug}`}>
                        <p className="hidden sm:block">{product.title}</p>
                        <p className="block sm:hidden">{product.title.slice(0, 13)}...</p>
                    </Link>
                </div>

                <p className="hidden sm:block text-gray-400 text-sm">Precio de contado</p>
                <div className="flex items-baseline mt-1">
                    {
                        (product.discount && product.discount > 1)
                            ? <>
                                <span className="text-base sm:text-xl lg:text-2xl font-bold text-red-500">{currencyFormat((product.price - (product.discount * product.price) / 100))}</span>
                                <span className="ml-2 text-sm line-through text-gray-600 dark:text-gray-500">{currencyFormat(product.price)}</span>
                            </>
                            : <span className="dark:text-base text-gray-600 sm:text-xl lg:text-2xl font-bold">{currencyFormat(product.price)}</span>
                    }

                </div>

            </div>


        </div>
    )
}

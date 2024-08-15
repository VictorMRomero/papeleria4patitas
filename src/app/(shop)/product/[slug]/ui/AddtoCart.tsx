'use client'
import { QuantitySelector } from "@/components"
import type { CartProduct, Product } from "@/interfaces"
import { useCartStore } from "@/store";
import { useState } from "react"

interface Props {
  product: Product;
}

export const AddtoCart = ({product}: Props) => {

    const addProductToCart = useCartStore(state => state.addProductToCart);

    const [quantity, setQuantity] = useState<number>(1);

    const addToCart = () => {
        const cartProduct: CartProduct = {
          id: product.id,
          title: product.title,
          description: product.description,
          inStock: product.inStock,
          price: product.price,
          slug: product.slug,
          quantity: quantity,
          descuento: product.discount ?? 1,
          image: (product.images) ? product.images[0] : 'nohay'
        }
        addProductToCart(cartProduct);
        setQuantity(1);

    }
  return (
    <>
        <button 
        onClick={addToCart}    
        className="btn-primary w-full mt-2 rounded-lg">
           Agregar al carrito
        </button>
    
    </>
  )
}

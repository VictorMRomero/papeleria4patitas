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
          slug: product.slug,
          title: product.title,
          price: product.price,
          quantity: quantity,
          image: product.images[0]
        }
        addProductToCart(cartProduct);
        setQuantity(1);

    }
  return (
    <>
    
        <QuantitySelector 
           quantity={quantity}
           onQuantityChanged = {setQuantity}
        />

        <button 
        onClick={addToCart}    
        className="btn-primary my-5">
           Agregar al carrito
        </button>
    
    </>
  )
}

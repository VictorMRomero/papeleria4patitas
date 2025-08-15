'use client'
import { QuantitySelector } from "@/components"
import type { CartProduct, Product, ProductStore } from "@/interfaces"
import { useCartStore } from "@/store";
import { useState } from "react"
import { IoCartOutline } from 'react-icons/io5'

interface Props {
  product: Product;
  productStore?: ProductStore | null;
}

export const AddtoCart = ({ product, productStore }: Props) => {
    const addProductToCart = useCartStore(state => state.addProductToCart);
    const [quantity, setQuantity] = useState<number>(1);

    const addToCart = () => {
        // Determinar qué datos usar basado en si tenemos productStore o no
        const finalPrice = productStore?.price || 0;
        const finalDiscount = productStore?.discount || 0;
        const finalStock = productStore?.stock || product.inStock;
        const finalImage = productStore?.product.images?.[0]?.url || product.images?.[0]?.url || 'nohay';

        const cartProduct: CartProduct = {
          id: product.id,
          title: product.title,
          description: product.description,
          inStock: finalStock,
          price: finalPrice,
          slug: product.slug,
          quantity: quantity,
          descuento: finalDiscount,
          image: finalImage
        }
        
        addProductToCart(cartProduct);
        setQuantity(1);
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
              <QuantitySelector 
                  quantity={quantity} 
                  inStock={productStore?.stock || product.inStock}
                  onQuantityChanged={setQuantity}
              />
              <span className="text-xs text-gray-500 ml-3">
                *Aplican restricciones de stock
              </span>
            </div>
            
            <button 
                onClick={addToCart}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-white font-semibold shadow-sm hover:bg-blue-700 transition-colors"
            >
                <IoCartOutline className="h-5 w-5" />
                Agregar al carrito
            </button>
        </div>
    )
}

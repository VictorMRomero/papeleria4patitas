import { useCartStore } from "@/store";
import { ProductImage } from "../producto/product-image/ProductImage";
import { QuantitySelector } from "../producto/quantity-selector/QuantitySelector";
import { IoCloseOutline } from "react-icons/io5";




export const ProductosVenta = () => {
    const productsInCart = useCartStore(state => state.cart);
    const updateProductQuantity = useCartStore(state => state.updateProductQuantity);
    const removeProductInCart = useCartStore(state => state.removeProduct)

    return (


        <div className="flex-1 w-full px-4">
            {
                productsInCart.map((product) => (
                    <div key={product.slug} className="select-none mb-3 bg-blue-gray-50 rounded-lg w-full text-blue-gray-700 py-2 px-2 flex justify-center">
                        <ProductImage
                            src={product.image}
                            width={100}
                            height={100}
                            style={{
                                objectFit: 'cover'
                            }}
                            alt={product.title}
                            className="rounded-lg h-10 w-10 bg-white shadow mr-2"
                        />
                        <div className="flex-grow">
                            <h5 className="text-sm" >{product.title}</h5>
                            <p className="text-xs block" >{product.description}</p>
                        </div>
                        <div className="py-1">
                            <div className="w-28 grid grid-cols-3 gap-2 ml-2">
                                <QuantitySelector
                                    inStock={product.inStock}
                                    quantity={product.quantity}
                                    onQuantityChanged={quantity => updateProductQuantity(product, quantity)}
                                />
                            </div>
                        </div>
                        <button className="text-blue-gray-300 hover:text-pink-500 focus:outline-none" onClick={() => removeProductInCart(product)}>
                            <IoCloseOutline className="h-8 w-8"/>
                        </button>
                    </div>
                ))
            }
        </div>
    )


}
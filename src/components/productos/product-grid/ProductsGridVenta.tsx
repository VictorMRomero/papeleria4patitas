import { ProductImage } from "@/components/producto/product-image/ProductImage"
import ContextMenu from "@/components/ui/contextMenu/ContextMenu";
import { CartProduct, Product } from "@/interfaces"
import { useCartStore } from "@/store";
import { useCallback, useEffect, useState } from "react";

interface ProductsGridVentaProps {
    searchResults: Product[];
}

export const ProductsGridVenta: React.FC<ProductsGridVentaProps> = ({ searchResults }) => {

    const [contextMenu, setContextMenu] = useState<{ x: number; y: number, slug: string } | null>(null);

    const handleContextMenu = useCallback((event: React.MouseEvent, slug: string) => {
        event.preventDefault();
        setContextMenu({ x: event.clientX, y: event.clientY, slug });
    }, []);

    const closeContextMenu = useCallback(() => {
        setContextMenu(null);
    }, []);

    //----
    const addProductToCart = useCartStore(state => state.addProductToCart);

    const [quantity, setQuantity] = useState<number>(1);

    const addToCart = (product: Product) => {
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


    useEffect(() => {
        document.addEventListener('click', closeContextMenu);
        return () => {
            document.removeEventListener('click', closeContextMenu);
        };
    }, [closeContextMenu]);



    return (
        <div className="grid grid-cols-6 gap-4 pb-3">

            {
                searchResults.map(product => (
                    <div
                        key={product.slug}
                        role="button"
                        onContextMenu={(e) => handleContextMenu(e, product.slug)}
                        onClick={() => addToCart(product)}
                        className="select-none cursor-pointer transition-shadow overflow-hidden rounded-2xl bg-white shadow hover:shadow-lg"
                        title="product.name"

                    >
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
                        <div className="flex pb-3 px-3 text-sm -mt-3">
                            <p className="flex-grow truncate mr-1" >{product.title}</p>
                            <p className="nowrap font-semibold" >{product.price}</p>
                        </div>


                    </div>
                ))
            }
            
            {contextMenu && (
                <ContextMenu
                    x={contextMenu.x}
                    y={contextMenu.y}
                    onClose={closeContextMenu}
                    urlProduct={contextMenu.slug}
                />
            )}


        </div>
    )
}
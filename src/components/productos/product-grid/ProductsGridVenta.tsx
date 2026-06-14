import { ProductImage } from "@/components/producto/product-image/ProductImage"
import ContextMenu from "@/components/ui/contextMenu/ContextMenu";
import { CartProduct, PosProduct } from "@/interfaces"
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useCallback, useEffect, useState } from "react";

interface ProductsGridVentaProps {
    searchResults: PosProduct[];
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

    const addToCart = (product: PosProduct) => {
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
                        className="select-none cursor-pointer transition-shadow overflow-hidden rounded-2xl dark:bg-gray-700 bg-gray-300 shadow hover:shadow-lg"
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
                        <div className="px-6 mb-2 mt-2 ">

                            <div className="sm:text-lg mb-2">
                                <p className="hidden sm:block">{product.title}</p>
                            </div>
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
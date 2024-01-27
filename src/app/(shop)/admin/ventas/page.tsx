
import { getProductByText } from "@/actions";
import { ProductImage } from "@/components";
import Link from "next/link";
import { OrderSummary } from "../../cart/ui/OrderSummary";
import { AddtoCart } from "../../product/[slug]/ui/AddtoCart";

import { PlaceVenta } from "./ui/PlaceVenta";

interface Props {
    searchParams: {
        productSearch: string;
        page: string;
    }
}



export default async function VentasPage({ searchParams }: Props) {

    const productSearch = searchParams.productSearch;

    


    if (!productSearch ) {
        return (
            <>
                <div className="text-center mt-20 mb-40">
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl ">Empieza a vender, escribe el nombre del producto</h1>
                </div>
            </>
        )
    }
    const { products } = await getProductByText(productSearch);
    if (products.length === 0  ) {
        return (
            <>
                <div className="mb-10 mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 justify-center">
                    <div className="text-center mt-20 mb-40 flex">
                        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl ">No encontre el producto: {productSearch}</h1>
                    </div>
                    <OrderSummary />
                    <span></span>
                    <button className="btn-primary w-full">Vender</button>
                </div>
            </>
        )
    }

    return (
        <>

            <div className="mb-10 mt-10 grid grid-cols-1  sm:grid-cols-5 justify-center">



                <div className="grid col-span-3 grid-cols-1 sm:grid-cols-2">
                {

                        products?.map((product) => (
                            <div key={product.slug} className="flex mb-5">
                                <ProductImage
                                    src={product.ProductImage[0].url}
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
                                        href={`/admin/product/${product.slug}`}>
                                        {product.title}
                                    </Link>
    
                                    <p>${product.price}  -  stock:{product.inStock}</p>
                                    
                                    <AddtoCart product={product} />
                                </div> 
    
                            </div>
                        ))
                }
                </div>
                <div className="col-span-2">

                    <OrderSummary />

                    <PlaceVenta />
                </div>

            </div>
        </>
    )
}
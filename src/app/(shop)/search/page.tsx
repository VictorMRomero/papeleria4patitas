


import { getProductByText } from "@/actions";
import { ProductGrid, Title } from "@/components";
import { NoEncontrado } from "./ui/NoEncontrado";
import Image from "next/image";

interface Props {
    searchParams: {
        productSearch: string;
    }
}


export default async function Search({ searchParams }: Props) {


    const productSearch = searchParams.productSearch;

    if (productSearch === '') {
        return (
            <NoEncontrado />
        )
    }


    const { products } = await getProductByText(productSearch)


    if (products.length === 0) {
        return (

            <NoEncontrado />
        )
    }


    return (
        <div className="mt-10 ">
            <Image

                width={1500}
                height={320}
                src='https://res.cloudinary.com/dog6zhxr8/image/upload/v1706763864/Ads/bu0xxz15orrumrqsukzs.png'
                alt='imagen busqueda'
                className="object-fill mb-4"

            />
            <Title
                title={`Resultado de busqueda para: ${productSearch}`}
                subtitle=''

            />
            <ProductGrid
                products={products}
            />

        </div>
    )
}
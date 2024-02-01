export const revalidate = 60;

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import prisma from "@/lib/prisma";
import Image from "next/image";


import { notFound } from "next/navigation";

interface Props {
    params: {
        nameCategory: string;
    },
    searchParams: {
        page?: string;
    }


}





export default async function categoryPage({ params, searchParams }: Props) {


    try {
        const { nameCategory } = params; //recibo el string 'juguetes'

        const { id, name } = (await prisma.category.findUnique({
            where: { name: nameCategory }
        })) as { id: string; name: string; };

        const page = searchParams.page ? parseInt(searchParams.page) : 1;

        const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({
            page,
            id: id
        });



        // if(products.length === 0) {
        //   redirect(`/category/${nameCategory}`);
        // }

        if (products.length === 0) { notFound(); }


        return (
            <>
                <Image

                    width={1500}
                    height={320}
                    src='https://res.cloudinary.com/dog6zhxr8/image/upload/v1706763864/Ads/bu0xxz15orrumrqsukzs.png'
                    alt='imagen busqueda'
                    className="object-fill mt-2"

                />
                <Title

                    title={name.charAt(0).toUpperCase() + name.slice(1)}
                    subtitle={`Productos de ${name.charAt(0).toUpperCase() + name.slice(1)}`}
                    className='mb-2'
                />

                <ProductGrid
                    products={products}
                />

                <Pagination totalPages={totalPages} />
            </>


        )


    } catch (error) {
        notFound();
    }













}


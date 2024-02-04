'use server';

import prisma from "@/lib/prisma";


interface PaginationOptions {
    page?: number;
    take?: number;
    id?: string;
}


export const getPaginatedProductsWithImages = async ({
    page = 1,
    take = 15, 
    id,
}: PaginationOptions) => {



        
    if(isNaN(Number(page))) page = 1;
    if(page < 1) page = 1;

    try{
        //Obtener productos
        const products = await prisma.product.findMany({
            take: take,
            skip:(page - 1) * take,
            include:{
                ProductImage:{
                    take: 2,
                    select: {
                        url: true
                    }
                }
            },
            where: {
                categoryId: id,
            },
            orderBy: {
                title: 'asc' // Ordenar por fecha de creación en orden descendente
              },
        })
        // total pages

        const totalCount = await prisma.product.count({
            where: {
                categoryId: id,
            }
        })
        const totalPages = Math.ceil(totalCount/take);

        return {
            currentPage: page,
            totalPages: totalPages,
            products: products.map(product => ({
                ...product,
                images: product.ProductImage.map(image => image.url)
            }))
        }
    }catch(error){
        throw new Error('No se pudo cargar los productos')
    }

}
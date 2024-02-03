import prisma from "@/lib/prisma";

export const getNewProducts = async() => {

    try{
        const products = await prisma.product.findMany({
          
            include: {
              ProductImage: {
                select: {
                  url: true
                }
              },
              descuento: {
                select:{
                  valor: true
                }
              }
            },
            orderBy: {
              createAt: 'desc' // Ordenar por fecha de creación en orden descendente
            },
            take: 10 // Obtener solo los primeros 10 resultados
          });

          return {

            products: products.map(product => ({
                ...product,
                images: product.ProductImage.map(image => image.url),
                descuento: product.descuento?.valor,
            }))
        }


    }catch(error){
        console.log(error)
        throw new Error ('Error al obtener los nuevos productos')
    }

}

export const getProductosWithOffer = async() => {

  try{
      const productsWithOffer = await prisma.product.findMany({
          where:{
            descuento:{
              valor:{
                not: undefined
              }
            }
          },
          include: {
            ProductImage: {
              select: {
                url: true
              }
            },
            descuento: {
              select:{
                valor: true
              }
            }
          },
          orderBy: {
            createAt: 'desc' // Ordenar por fecha de creación en orden descendente
          },
          // Obtener solo los primeros 10 resultados
        });

        return {

          productsWithOffer: productsWithOffer.map(product => ({
              ...product,
              images: product.ProductImage.map(image => image.url),
              descuento: product.descuento?.valor,
          }))
      }


  }catch(error){
      console.log(error)
      throw new Error ('Error al obtener los nuevos productos')
  }

}
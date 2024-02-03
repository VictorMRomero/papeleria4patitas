'use server'

import prisma from "@/lib/prisma"

export const getProductBySlug = async(slug: string) => {

    try{

        const product = await prisma.product.findFirst({
            include: {
                ProductImage: true,
                descuento: {
                  select:{
                    valor: true
                  }
                }
                
            },
            where: {
                slug: slug
            }

        })

        if(!product)return null;

        return{
            ...product,
            images: product.ProductImage.map(image => image.url),
            descuento: product.descuento?.valor
        }

    }catch(error){
        console.log(error)
        throw new Error ('Error al obtener el producto por slug')
    }

}

export const getProductById = async (id: string) => {
    const product = await prisma.product.findUnique({
      include: {
        ProductImage: {
          take: 1,
          select: {
            url: true
          }
        },
        descuento: {
          select:{
            valor: true
          }
        },
      },
      where: {
        id: id
      }
    });
  
    // Verificar si el producto tiene imágenes y extraer la URL
    const imageUrl = product?.ProductImage[0]?.url || null;
  
    // Crear un nuevo objeto sin la propiedad ProductImage y con la URL directamente
    const modifiedProduct = {
      ...product,
      ProductImage: imageUrl
    };
  
    return {
      modifiedProduct,
      descuento: product?.descuento?.valor
    }

  };

  export const getProductByText = async (texto: string) => {
    const products = await prisma.product.findMany({
      include:{
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
      
      
      where: {
        // Utiliza el operador "contains" para buscar productos que contengan el texto en el nombre
        OR: [
          {
            slug: {
              contains: texto,
              mode: "insensitive"
            }
          },

          {
            tags:{
              hasSome: [texto]
            }
          }
        ]


      },
    })
    
    return {
      products: products.map(product => ({
        
        ...product,
        images: product.ProductImage.map(image => image.url),
        descuento: product.descuento?.valor,
    }))
    }
  }
  
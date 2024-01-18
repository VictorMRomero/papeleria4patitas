'use server'

import prisma from "@/lib/prisma"

export const getOrderById =async (id:string) => {

    const order = await prisma.order.findFirst({
        include:{
            OrderAddress:true
        },

        where: {
            id: id
        }

    })

    return order;
   
}

export const getItemsByOrderId = async (id: string) => {
    const items = await prisma.orderItem.findMany({
      include: {
        product: {
          select: {
            title: true,
            ProductImage: {
              take: 1,
              select: {
                url: true
              }
            }
          }
        }
      },
      where: {
        orderId: id
      }
    });
  
    // Modificar la estructura de cada item para obtener solo la URL de la imagen
    const modifiedItems = items.map(item => {
      const imageUrl = item.product.ProductImage[0]?.url || null;
      return {
        ...item,
        product: {
          title: item.product.title,
          ProductImage: imageUrl
        }
      };
    });
  
    return modifiedItems;
  };
'use server'

import prisma from "@/lib/prisma"


export const getSales =async () => {
    const ventas = await prisma.venta.findMany({

        orderBy: {
            createAt: 'asc'
        },
        include:{
            user: {
                select:{
                    name:true
                }
            },
            OrderItem: {
                select: {
                    product: {
                        select:{
                            title: true
                        }
                    }
                }
            }
        }
        

    })

    return ventas;
}
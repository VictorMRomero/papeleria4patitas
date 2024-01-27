

'use server'

import { auth } from "@/auth.config"
import { User } from "@/interfaces";
import prisma from "@/lib/prisma";


export const getPaginatedOrders = async() => {
    const session = await auth();

    //todo verificar...
    if( (session?.user as User).role !== 'admin') {
        return{
            ok: false,
            message: 'Debe de ser admin'
        }
    }

    const orders = await prisma.order.findMany({
        orderBy: {
            createAt: 'desc'
        },
        include:{
            OrderAddress:{
                select:{
                    firstName: true,
                    lastName: true,
                }
            }
        }
    })

    return{
        ok:true,
        orders: orders,
    }
}
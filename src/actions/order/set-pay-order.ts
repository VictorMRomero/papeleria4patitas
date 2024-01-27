'use server';

import prisma from "@/lib/prisma";
import { Order } from "@prisma/client";


export const setPayOrder =async (id: string, order:Order) => {


    try{

        const data = {
            id: order.id,
            itemsInOrder: order.itemsInOrder,
            isPaid: true,
            paidAt: new Date(),
            subTotal: order.subTotal,
            total: order.total,
            createAt: order.createAt,
            updatedAt: new Date(),
            userId: order.userId,
            transactionId: order.transactionId,
        }
       
        const updatePayOrder = await prisma.order.update({

        

            where: {id},
            data: data
        })

        return {
            ok: true,
            updatePayOrder
        }

    }catch(error){
        return {
            ok: false
        }
    }
}
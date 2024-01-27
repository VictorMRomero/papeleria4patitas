"use server"

import prisma from "@/lib/prisma"

export const getUserAddress = async (userId: string) => {
    try{

        const address = await prisma.userAddress.findUnique({
            where: {userId}
        });

        if(!address)return null;

        const {estadoId, detalle, referencia, ...rest} = address;



        return {
            ...rest,
            estado: estadoId,
            detalle: detalle ? detalle : '',
            referencia: referencia ? referencia : '',
    
        };



    }catch(error){
        return null;
    }
}
'use server'

import type { Address } from "@/interfaces"
import prisma from "@/lib/prisma"

export const setUserAddress = async (address:Address, userId: string) => {
    
    try{

        const newAddress = await createOrReplaceAddres(address, userId);

        return{
            ok: true,
            message: newAddress,
        }




    }catch(error){
        return{
            ok:false,
            message:'no se pudo guardar'
        }
    }

}

const createOrReplaceAddres = async (address:Address, userId: string) => {
   try{

    const storeAddress = await prisma.userAddress.findUnique({
        where: { userId }
    });

    const addressToSave = {
        userId: userId,
        address: address.address,
        address2: address.address2,
        countryId: address.country,
        city: address.city,
        firstName: address.firstName,
        lastName: address.lastName,
        phone: address.phone,
        postalCode: address.postalCode,
    };

    if(!storeAddress) {
        const newAddress = await prisma.userAddress.create({
            data: addressToSave
        });

        return newAddress;
    }

    const updateAddress = await prisma.userAddress.update({
        where: {userId},
        data: addressToSave
    })
    return updateAddress;


   }catch(error){   
    throw new Error('no se pudo grabar')
   } 
}



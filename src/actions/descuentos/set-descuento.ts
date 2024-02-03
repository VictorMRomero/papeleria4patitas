"use server";


import prisma from "@/lib/prisma"

export const createOrReplaceDescuento = async (productId:string, descuento: string ) => {
   try{

    console.log(productId, descuento)

    const storeDescuento = await prisma.descuento.findUnique({
        where: { productId }
    });


    if(!storeDescuento) {
       await prisma.descuento.create({
         data: {
            valor: Number.parseInt(descuento),
            productId
         }
     });
    }

    await prisma.descuento.update({
        where: {productId},
        data: {
            valor:Number.parseInt(descuento)
        },
    })



   }catch(error){   
    return{
        ok:false,
        error
    }
   } 
}


export const deleteDescuento = async(productId: string) => {
    try{
        
        
        await prisma.descuento.delete({
        where: {productId}
        });




    } catch (error) {

        return{
            ok: false,
            message: 'no se pudo borrar'    
        }
    }
}



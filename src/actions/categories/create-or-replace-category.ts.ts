"use server";
import prisma from "@/lib/prisma";


export const createOrReplaceCategoria = async (categoriaId:string, name: string ) => {

    try{
 
     const storeCategoria = await prisma.category.findUnique({
         where: { id: categoriaId }
     });
 
 
     if(!storeCategoria) {
        const categoriaUpdated = await prisma.category.create({
          data: {
             name: name
          }
      });
     }
 
    const categoriaUpdated =  await prisma.category.update({
         where: {id: categoriaId},
         data: {
             name:name
         },
     })
     return{
        ok: true,
        categoriaUpdated
     }
 
 
    }catch(error){   
     return{
         ok:false
     }
    } 
 }
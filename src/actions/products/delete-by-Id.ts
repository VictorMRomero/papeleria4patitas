import prisma from "@/lib/prisma"


export const DeleteById =async (id:string) => {

    try {
        const deleteProduct = await prisma.product.delete({
            where: {
                id: id
            }
        })
        
        return {
            ok: true,
            
        }
    } catch (error) {
        return {
            ok: false,
            error: error
        }
    }
    

}

'use server';

import { auth } from "@/auth.config";
import { User } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export const changeUserRole =async (id:string, role: string) => {
    
    const session  = await auth();

    if((session?.user as User).role !== 'admin'){
        return{
            ok: false,
            message: 'El usuario debe ser administrador'
        }
    }

    try{

        const newRole = role === 'admin' ? 'admin': 'user';

        const user= await prisma.user.update({
            where: {
                id: id
            },
            data:{
                role: newRole
            }
        })

        revalidatePath('/admin/users')

        return{
            ok: true
        }



    }catch(error){
        return{
            ok: false,
            message: 'No se pudo actualizar el rol'
        }
    }


}
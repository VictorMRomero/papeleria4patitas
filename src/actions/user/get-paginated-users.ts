'use server'

import { auth } from "@/auth.config"
import { User } from "@/interfaces";
import prisma from "@/lib/prisma";

export const getPaginationUsers = async() => {
     
    const session = await auth();
    
    if((session?.user as User).role !== 'admin'){
        return{
            ok: false,
            message: 'Debe de ser un usuario administrador'
        }
    } 

    const users = await prisma.user.findMany({
        orderBy: {
            name: 'desc'
        }

    });

    return {
        ok: true,
        users: users
    }

} 

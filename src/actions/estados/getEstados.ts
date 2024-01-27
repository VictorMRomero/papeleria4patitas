'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const getEstados = async() => {
    const estados = await prisma.estado.findMany({
        orderBy:{
            id: 'asc'
        }
    })

    return estados
}
'use server';

import prisma from '@/lib/prisma';



export const getCategories =  async()=> {

  try {
      const categories = await prisma.category.findMany({
        orderBy: {
          name: 'asc'
        }
      });


      return categories;



  } catch (error) {
    console.log(error);
    return [];
  }


}

export const getCategoriesById =  async(id: string)=> {

  try {
      const categoria = await prisma.category.findUnique({
        where: {
          id: id
        }
      });


      return categoria;



  } catch (error) {
    console.log(error);
    return error;
  }


}
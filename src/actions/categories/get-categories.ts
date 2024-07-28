'use server';

import api from '@/config/api';
import prisma from '@/lib/prisma';



export const getCategories =  async()=> {

  try {
      const response = await api.get(`/category`)
      const {ok, total, allCategories} = response.data;

      return allCategories;



  } catch (error) {
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
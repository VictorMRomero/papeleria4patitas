'use server';

import api from '@/config/api';



export const getCategories =  async()=> {

  try {
      const response = await api.get(`/category`)
      const {ok, total, allCategories} = response.data;

      return allCategories;



  } catch (error) {
    return [];
  }


}

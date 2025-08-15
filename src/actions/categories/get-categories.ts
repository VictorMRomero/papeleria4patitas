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

export const getCategoryBySlug = async(slug: string)=> {

  try {
    const response = await api.get(`/category/slug/${slug}`)
    const {ok, category} = response.data;

    if(!ok || !category){
      return null;
    }

    return category;
  } catch (error) {
    return null;
  }
}

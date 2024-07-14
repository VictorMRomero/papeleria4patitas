import api from "@/config/api";
import prisma from "@/lib/prisma";


export const getNewProducts = async() => {


  const response = await api.get('/products/news');
  const {products, total }= response.data;

  return{
    newProducts: products
  }


}

export const getProductsWithOffer = async() => {

  try{

    const response = await api.get('/products/discounts');
    const {products, total }= response.data;
    console.log(products)

    return{
      productsWithOffer: products
    }

  }catch(error){
      console.log(error)
      throw new Error ('Error al obtener los nuevos productos')
  }

}
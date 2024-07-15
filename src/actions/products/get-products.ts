import api from "@/config/api";
import prisma from "@/lib/prisma";

export const getAllProducts = async({
  page = 1,
  limit = 20,
  offset = 0
}) => {
  
  if(isNaN(Number(page))) page = 1;
  if(page < 1) page = 1;
  
  
  if(page > 1){
    offset = limit * page - limit;
  };
  
  const response = await api.get(`/products?limit=${limit}&offset=${offset}`)
  const {products, total} = response.data;


  const totalPages = Math.ceil(total/limit);

  return {
    currenPage: page,
    totalPages,
    products,
    total
  }

}


export const getNewProducts = async({
  page = 1,
  limit = 20,
  offset = 0
}) => {

  if(isNaN(Number(page))) page = 1;
  if(page < 1) page = 1;
  
  
  if(page > 1){
    offset = limit * page - limit;
  };

  const response = await api.get(`/products/news?limit=${limit}&offset=${offset}`);
  const {products, total }= response.data;

  const totalPages = Math.ceil(total/limit);

  return{
    newProducts: products,
    currenPage: page,
    totalPages,
    total
  }

}

export const getProductsWithOffer = async({
  page = 1,
  limit = 20,
  offset = 0
}) => {

  
  try{
    
    if(isNaN(Number(page))) page = 1;
    if(page < 1) page = 1;
    
    
    if(page > 1){
      offset = limit * page - limit;
    };

    const response = await api.get(`/products/discounts?limit=${limit}&offset=${offset}`);
    const {products, total }= response.data;
    
    const totalPages = Math.ceil(total/limit);

    return{
      productsWithOffer: products,
      currentPage: page,
      totalPages,
      total
    }

  }catch(error){
      console.log(error)
      throw new Error ('Error al obtener los nuevos productos')
  }

}
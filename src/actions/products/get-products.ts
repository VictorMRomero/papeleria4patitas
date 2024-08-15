import api from "@/config/api";


export const getAllProducts = async ({
  page = 1,
  limit = 20,
  offset = 0
}) => {

  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;


  if (page > 1) {
    offset = limit * page - limit;
  };

  const response = await api.get(`/products?limit=${limit}&offset=${offset}`)
  const { products, total } = response.data;


  const totalPages = Math.ceil(total / limit);

  return {
    currenPage: page,
    totalPages,
    products,
    total
  }

}

export const getViewProducts = async ({
  page = 1,
  limit = 20,
  offset = 0
}) => {

  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;


  if (page > 1) {
    offset = limit * page - limit;
  };

  const response = await api.get(`/products/views?limit=${limit}&offset=${offset}`)
  const { products, total } = response.data;


  const totalPages = Math.ceil(total / limit);

  return {
    currenPage: page,
    totalPages,
    products,
    total
  }

}



export const getNewProducts = async ({
  page = 1,
  limit = 20,
  offset = 0
}) => {

  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;


  if (page > 1) {
    offset = limit * page - limit;
  };

  const response = await api.get(`/products/news?limit=${limit}&offset=${offset}`);
  const { products, total } = response.data;

  const totalPages = Math.ceil(total / limit);

  return {
    newProducts: products,
    currenPage: page,
    totalPages,
    total
  }

}

export const getProductsWithOffer = async ({
  page = 1,
  limit = 20,
  offset = 0
}) => {


  try {

    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;


    if (page > 1) {
      offset = limit * page - limit;
    };

    const response = await api.get(`/products/discounts?limit=${limit}&offset=${offset}`);
    const { products, total } = response.data;

    const totalPages = Math.ceil(total / limit);

    return {
      productsWithOffer: products,
      currentPage: page,
      totalPages,
      total
    }

  } catch (error) {
    console.log(error)
    throw new Error('Error al obtener los nuevos productos')
  }

}

export const getProductByTerm = async (term: string) => {
  try {
    const response = await api.get(`/products/${term}`)
    const product = response.data;
    return product

  } catch (error) {
    return {
      ok: false
    }
  }

}

export const getProductsByText = async (text: string) => {
  try {

    const response = await api.get(`products/search/${text}`)
    const products = response.data;
    return products
  } catch (error) {
    return {
      ok: false
    }
  }
}
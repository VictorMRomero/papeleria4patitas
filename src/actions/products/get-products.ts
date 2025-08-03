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

  try {
    const response = await api.get(`/products?limit=${limit}&offset=${offset}`)
    const { products, total } = response.data;

    const totalPages = Math.ceil(total / limit);

    return {
      currenPage: page,
      totalPages,
      products,
      total
    }
  } catch (error) {
    throw new Error('API not available');
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

  try {
    const response = await api.get(`/products/views?limit=${limit}&offset=${offset}`)
    const { products, total } = response.data;

    const totalPages = Math.ceil(total / limit);

    return {
      currenPage: page,
      totalPages,
      products,
      total
    }
  } catch (error) {
    throw new Error('API not available');

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

  try {
    const response = await api.get(`/products/news?limit=${limit}&offset=${offset}`);
    const { products, total } = response.data;

    const totalPages = Math.ceil(total / limit);

    return {
      newProducts: products,
      currenPage: page,
      totalPages,
      total
    }
  } catch (error) {
    throw new Error('API not available');
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
    throw new Error('API not available');
  }
}

export const getProductByTerm = async (term: string) => {
  try {
    const response = await api.get(`/products/${term}`)
    const product = response.data;
    return product
  } catch (error) {
    throw new Error('API not available');
  }
}

export const getProductsByText = async (text: string) => {
  try {
    const response = await api.get(`products/search/${text}`)
    const products = response.data;
    return products
  } catch (error) {
    throw new Error('API not available');
  }
}
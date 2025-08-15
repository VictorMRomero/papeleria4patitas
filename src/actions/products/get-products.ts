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

export const getProductsByTextPaginated = async ({
  text,
  page = 1,
  limit = 20,
  offset = 0
}: { text: string; page?: number; limit?: number; offset?: number }) => {
  try {
    if (!text || text.trim() === '') {
      return { products: [], totalPages: 1, currenPage: 1, total: 0 }
    }

    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;

    if (page > 1) {
      offset = limit * page - limit;
    }

    const response = await api.get(`products/search/${encodeURIComponent(text)}?limit=${limit}&offset=${offset}`)
    const { products, total } = response.data ?? {};

    if (!Array.isArray(products) || typeof total !== 'number') {
      // Fallback local pagination si el API no soporta paginado
      const all = await getProductsByText(text);
      const totalLocal = all.length;
      const totalPagesLocal = Math.max(1, Math.ceil(totalLocal / limit));
      const start = (page - 1) * limit;
      const sliced = all.slice(start, start + limit);
      return {
        products: sliced,
        total: totalLocal,
        totalPages: totalPagesLocal,
        currenPage: page
      }
    }

    const totalPages = Math.max(1, Math.ceil(total / limit));
    return {
      products,
      total,
      totalPages,
      currenPage: page
    }
  } catch (error) {
    // Fallback en caso de error en el API
    const all = await getProductsByText(text);
    const totalLocal = all.length;
    const totalPagesLocal = Math.max(1, Math.ceil(totalLocal / limit));
    const start = (page - 1) * limit;
    const sliced = all.slice(start, start + limit);
    return {
      products: sliced,
      total: totalLocal,
      totalPages: totalPagesLocal,
      currenPage: page
    }
  }
}

export const getProductBySlug = async (slug: string) => {

  try {
    const response = await api.get(`/products/${slug}`);
    const { product } = response.data;

    return product;
  } catch (error) {
    throw new Error('API not available');
  }
}

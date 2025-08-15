'use server'
import api from "@/config/api";

export const getProductsByCategoryStore = async (
  storeId: string, 
  slug: string,
  page: number = 1,
  limit: number = 20
) => {
  try {
    if (!storeId || !slug) {
      return { products: [], total: 0, totalPages: 1, currentPage: page };
    }

    const offset = (page - 1) * limit;
    const response = await api.get(`/store/${storeId}/products/category/${slug}?limit=${limit}&offset=${offset}`);

    if (!response.data) {
      return { products: [], total: 0, totalPages: 1, currentPage: page };
    }

    const { ok, products: productsField, product: productField, total: totalField } = response.data as any;

    // Tolerar endpoints que devuelven `products` o `product`
    const parsedProducts = (Array.isArray(productsField) ? productsField : (Array.isArray(productField) ? productField : [])) as any[];
    const total = typeof totalField === 'number' ? totalField : parsedProducts.length;

    const totalPages = Math.ceil(total / limit);

    return {
      products: parsedProducts,
      total,
      totalPages,
      currentPage: page
    };

  } catch (error) {
    console.error('Error fetching products by category:', error);
    return {
      products: [],
      total: 0,
      totalPages: 1,
      currentPage: page
    };
  }
}

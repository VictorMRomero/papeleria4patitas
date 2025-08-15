'use server'
import api from "@/config/api";

export const getProductStoreBySlug = async (storeId: string, slug: string) => {

  try {

    if (!storeId || !slug) {
      return null;
    }

    const response = await api.get(`/store/${storeId}/products/product-by-slug/${slug}`);

    if (!response.data) {
      return null;
    }

    const { ok, product } = response.data;

    if (!ok) {
      return null;
    }

    return product;

  } catch (error) {
    throw new Error(`API not available ${error}`);
  }
}

export const getProductFuzzySearch = async (storeId: string, term: string) => {

  try {

    if (!storeId || !term) {
      return null;
    }

    console.log('storeId', storeId, 'term', term)

    const response = await api.get(`/store/${storeId}/products/fuzzy-search/${term}`);

    if (!response.data) {
      return null;
    }

    const { ok, products } = response.data;

    if (!ok) {
      return null;
    }

    return products;

  } catch (error) {
    throw new Error(`API not available ${error}`);
  }
}
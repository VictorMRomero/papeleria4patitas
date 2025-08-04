'use server'
import api from "@/config/api";
import { useStoreStore } from "@/store";


export const getAllStores = async () => {
  try {
    const response = await api.get(`/store`)
    const { stores, total } = response.data;
    return {
      stores,
      total
    }
  } catch (error) {
    console.warn('API not available');
    return {
      stores: [],
      total: 0
    }
  }
}

export const getAllStoresActive = async () => {
  try {
    const response = await api.get(`/store/active`)
    
    if (!response.data) {
      return { stores: [], total: 0 }
    }
    
    const { stores, total } = response.data;

    return {
      stores: stores || [],
      total: total || 0
    }
  } catch (error) {
    console.warn('API not available');
    return {
      stores: [],
      total: 0
    }
  }
}

export const getAllStoreProducts = async (storeId?: string) => {
  try {
    if (!storeId) {
      return { products: [], total: 0 }
    }
    
    const response = await api.get(`/store/${storeId}/products`)
    
    if (!response.data) {
      return { products: [], total: 0 }
    }
    
    const { products, total } = response.data;

    return {
      products: products || [],
      total: total || 0
    }
  } catch (error) {
    console.warn('API not available');
    return {
      products: [],
      total: 0
    }
  }
}

export const getAllStoreProductsWithDiscount = async (storeId?: string) => {
  try {
    if (!storeId) {
      return { products: [], total: 0 }
    }
    
    const response = await api.get(`/store/${storeId}/products/discounted`)
    
    if (!response.data) {
      return { products: [], total: 0 }
    }
    
    const { products, total } = response.data;

    return {
      products: products || [],
      total: total || 0
    }
  } catch (error) {
    console.warn('API not available');
    return {
      products: [],
      total: 0
    }
  }
}
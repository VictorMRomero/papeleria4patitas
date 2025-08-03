'use server'
import api from "@/config/api";

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


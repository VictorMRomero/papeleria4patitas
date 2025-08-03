import { mockUsers, mockOrders, simulateApiDelay } from './mockData';

// Función wrapper para manejar errores de API
export async function safeApiCall<T>(
  apiCall: () => Promise<T>,
  fallbackData: T,
  errorMessage?: string
): Promise<T> {
  try {
    const result = await apiCall();
    return result;
  } catch (error) {
    console.warn(`API call failed, using fallback data: ${errorMessage || error}`);
    await simulateApiDelay(200); // Simular delay de red
    return fallbackData;
  }
}

// Helpers específicos para cada tipo de datos
export const getProductsWithFallback = async () => {
  return safeApiCall(
    async () => {
      // Aquí iría tu llamada real a la API
      throw new Error('API not available');
    },
    
    'Error fetching products'
  );
};

export const getCategoriesWithFallback = async () => {
  return safeApiCall(
    async () => {
      // Aquí iría tu llamada real a la API
      throw new Error('API not available');
    },
    
    'Error fetching categories'
  );
};

export const getUsersWithFallback = async () => {
  return safeApiCall(
    async () => {
      // Aquí iría tu llamada real a la API
      throw new Error('API not available');
    },
    mockUsers,
    'Error fetching users'
  );
};

export const getOrdersWithFallback = async () => {
  return safeApiCall(
    async () => {
      // Aquí iría tu llamada real a la API
      throw new Error('API not available');
    },
    mockOrders,
    'Error fetching orders'
  );
}; 
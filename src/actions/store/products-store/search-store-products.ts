'use server'
import api from "@/config/api";
import { SearchProductsDto } from "@/interfaces/search-products.interface";

export const searchStoreProducts = async (
  storeId: string,
  searchDto: SearchProductsDto
) => {
  try {
    if (!storeId) {
      return { products: [], total: 0, totalPages: 1, currentPage: 1 };
    }

    // Construir parámetros de consulta
    const queryParams = new URLSearchParams();

    
    // Parámetros básicos
    if (searchDto.limit) queryParams.append('limit', searchDto.limit.toString());
    if (searchDto.offset) queryParams.append('offset', searchDto.offset.toString());
    if (searchDto.categorySlug) queryParams.append('categorySlug', searchDto.categorySlug);
    if (searchDto.subcategoryId) queryParams.append('subcategoryId', searchDto.subcategoryId);
    if (searchDto.categoryIds?.length) queryParams.append('categoryIds', searchDto.categoryIds.join(','));
    
    // Filtros de precio
    if (searchDto.minPrice !== undefined) queryParams.append('minPrice', searchDto.minPrice.toString());
    if (searchDto.maxPrice !== undefined) queryParams.append('maxPrice', searchDto.maxPrice.toString());
    
    // Filtros de stock y disponibilidad
    if (searchDto.inStock === true) queryParams.append('inStock', 'true');
    if (searchDto.isActive === true) queryParams.append('isActive', 'true');
    if (searchDto.minStock !== undefined && searchDto.minStock > 0) queryParams.append('minStock', searchDto.minStock.toString());
    if (searchDto.onlineOnly === true) queryParams.append('onlineOnly', 'true');
    
    // Filtros de descuento
    if (searchDto.hasDiscount === true) queryParams.append('hasDiscount', 'true');
    if (searchDto.minDiscount !== undefined && searchDto.minDiscount > 0) queryParams.append('minDiscount', searchDto.minDiscount.toString());
    
    // Filtros de tiempo y popularidad
    if (searchDto.newProductsDays !== undefined && searchDto.newProductsDays > 0) queryParams.append('newProductsDays', searchDto.newProductsDays.toString());
    if (searchDto.minViews !== undefined && searchDto.minViews > 0) queryParams.append('minViews', searchDto.minViews.toString());
    
    // Ordenamiento
    if (searchDto.sortBy && searchDto.sortBy !== 'title') queryParams.append('sortBy', searchDto.sortBy);
    if (searchDto.sortOrder && searchDto.sortOrder !== 'ASC') queryParams.append('sortOrder', searchDto.sortOrder);
    
    // Búsqueda por texto
    if (searchDto.search) queryParams.append('search', searchDto.search);
    
    // Tags
    if (searchDto.tags?.length) queryParams.append('tags', searchDto.tags.join(','));


    const response = await api.get(`/store/${storeId}/products/search?${queryParams.toString()}`);


    if (!response.data) {
      return { products: [], total: 0, totalPages: 1, currentPage: 1 };
    }

    const { ok, products, total, highestPrice } = response.data;
    
    if (!ok || !products) {
      return { products: [], total: 0, totalPages: 1, currentPage: 1, highestPrice: 0 };
    }

    const limit = searchDto.limit || 20;
    const totalPages = Math.ceil(total / limit);
    const currentPage = Math.floor((searchDto.offset || 0) / limit) + 1;

    return {
      products,
      total,
      totalPages,
      currentPage,
      filters: searchDto,
      highestPrice: highestPrice || 0
    };

  } catch (error) {
    console.error('Error searching store products:', error);
    return {
      products: [],
      total: 0,
      totalPages: 1,
      currentPage: 1,
      filters: searchDto,
      highestPrice: 0
    };
  }
}

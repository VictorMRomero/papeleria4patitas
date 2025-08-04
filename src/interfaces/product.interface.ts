import { Category } from "./category.interface";
export interface ImageInStore {
  id: string;
  url: string;
}

export interface CategoryInStore {
  id: string;
  title: string;
  slug: string;
  description: string;
  parentId: string | null;
}

export interface ProductInStore {
  id: string;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  views: number;
  images: ImageInStore[];
  categories: Category[];
}

export interface ProductStore {
  id: string;
  storeId: string;
  productId: string;
  stock: number;
  storePrice: number;
  basePrice: number;
  finalPrice: number;
  discount?: number;
  isOnlineOnly?: boolean;
  isActive?: boolean;
  product: ProductInStore;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  inStock: number;
  price: number;
  slug: string;
  tags: string[];
  discount?: number;
  createAt?: Date;
  isActive?: boolean;
  views?: number;
  images?: string[];
  categories?: Category[];
}



export interface CartProduct {
  id: string;
  title: string;
  description: string;
  inStock: number;
  price: number;
  slug: string;
  // tags: string[];
  descuento: number;
  createAt?: Date;
  isActive?: boolean;
  views?: number;
  image?: string;
  categories?: string[];
  quantity: number;
}

export interface ProductImage {
  id: number;
  url: string;
  productId: string;
}

export interface ProductCategories {
  id: string,
  title: string,
  description: string
}





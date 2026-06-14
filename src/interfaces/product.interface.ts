import { Category } from "./category.interface";


export interface CategoryInStore {
  id: string;
  title: string;
  slug: string;
  description: string;
  parentId: string | null;
}

// export interface ProductInStore {
//   id: string;
//   title: string;
//   slug: string;
//   description: string;
//   tags: string[];
//   views: number;
//   images: ImageInStore[];
//   categories: Category[];
// }

// export interface StoreProduct {
//   storeId: string;
//   storeName: string;
//   slug: string;
//   description: string;
//   tags: string[];
// }

export interface ProductStore {
  id: string;
  storeId: string;
  productId: string;
  stock: number;
  price: number;
  isOnlineOnly?: boolean;
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date;
  discount?: number;
  product: Product;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  inStock: number;
  images?: ImageInStore[];
  categories?: CategoryInStore[];
}

export interface ImageInStore {
  id: string;
  url: string;
}

// Producto plano que consume el punto de venta (POS) y la busqueda interna.
// Mantiene precio/descuento a nivel producto porque proviene del API antiguo.
export interface PosProduct {
  id: string;
  title: string;
  slug: string;
  description: string;
  inStock: number;
  price: number;
  discount?: number;
  images?: string[];
  tags?: string[];
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





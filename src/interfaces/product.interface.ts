import { Category } from "./category.interface";

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





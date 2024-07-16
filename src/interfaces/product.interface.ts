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
  categories?: string[];
}

export interface CartProduct {
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
  categories?: string[];
}

export interface ProductImage {
  id: number;
  url: string;
  productId: string;
}


export type ValidCategory = 'papeleria'|'juguetes'|'belleza'|'regalos'|'tecnologia';


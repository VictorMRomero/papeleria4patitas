export interface Product {
  id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  slug: string;
  tags: string[];
  title: string;
  category?: string;
  descuento?: number;
}

export interface CartProduct {
  id:string;
  slug:string;
  title:string;
  price:number;
  quantity: number;
  image:string;
  descuento?: number;
}

export interface ProductImage {
  id: number;
  url: string;
  productId: string;
}


export type ValidCategory = 'papeleria'|'juguetes'|'belleza'|'regalos'|'tecnologia';


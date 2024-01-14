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
}

export interface CartProduct {
  id:string;
  slug:string;
  title:string;
  price:number;
  quantity: number;
  image:string;
}


export type ValidCategory = 'papeleria'|'juguetes'|'belleza'|'regalos'|'tecnologia';


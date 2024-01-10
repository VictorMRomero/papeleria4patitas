interface SeedProduct {
  description: string;
  images: string[];
  inStock: number;
  price: number;

  slug: string;
  tags: string[];
  title: string;
  category: ValidCategory;
}


export type ValidCategory = 'papeleria'|'juguetes'|'belleza'|'regalos'|'tecnologia';


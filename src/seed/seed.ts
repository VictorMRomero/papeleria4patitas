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

interface SeedData {
    products: SeedProduct[],
}




export const initialData: SeedData = {
    products: [
        {
            description: "Es un producto que se utiliza para tomar",
            images: [
                'bottle-water.png',
                'bottle-water-near.png',
            ],
            inStock: 7,
            price: 75,

            slug: "pegamento_barra_dixon_8gr",
            category: 'belleza',
            tags: ['pegamento'],
            title: "Pegamento Barra Dixon 8gr",
        },
        {
            description: "Es un producto que se utiliza para pintar.",
            images: [
                'lapizero.jpeg',
                'lapicero-near.jpeg',
            ],
            inStock: 7,
            price: 15,

            slug: "lapizero_negro_gel",
            category: 'papeleria',
            tags: ['lapizero'],
            title: "Lapizero color negro de gel",
        },
        {
            description: "Es un producto que se utiliza para cortar.",
            images: [
                'tijeras.jpeg',
                'tijeras-near.jpeg',
            ],
            inStock: 7,
            price: 12,

            slug: "tijeras_sencillas",
            category: 'juguetes',
            tags: ['tijeras'],
            title: "tijera sencilla-economica",
        },
        
    ]
}
import bcryptjs from 'bcryptjs';

interface SeedProduct {
    description: string;
    images: string[];
    inStock: number;
    price: number;
    slug: string;
    tags: string[];
    title: string;
    category: string;
}

interface SeedUser {
    email: string;
    password: string;
    name: string;
    role: 'user' | 'admin';

}


export type ValidCategory = 'Papeleria'|'Juguetes'|'Belleza'|'Regalos'|'Tecnologia'| 'Ropa';

interface SeedData {
    users: SeedUser[],
    products: SeedProduct[],
    categories: string[],
}




export const initialData: SeedData = {
    users: [
        {
            email: 'vmrbaez@gmail.com',
            name: 'Victor Manuel',
            password: bcryptjs.hashSync('Snuff2448'),
            role: 'admin'
        },

    ],



    categories: [
        'papeleria','juguetes','belleza','regalos','tecnologia', 'ropa'
    ],
    products: [
        {
            description: "Es un ejemplo",
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
        }
    ]

}
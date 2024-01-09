interface SeedProduct {
    description: string;
    images: string[];
    inStock: number;
    price: number;

    slug: string;
    tags: string[];
    title: string;
    type: ValidTypes;
    gender: 'men'|'women'|'kid'|'unisex'
}


type ValidTypes = 'shirts'|'pants'|'hoodies'|'papeleria';

interface SeedData {
    products: SeedProduct[],
}




export const initialData: SeedData = {
    products: [
        {
            description: "El pegamento, también conocido como cola, es un producto que se utiliza para unir o acoplar un objeto con otro. Su finalidad es lograr que dos superficies que se encuentran separadas, acaben acopladas y entrando en contacto para convertirse en una sola pieza.",
            images: [
                '1740176-00-A_0_2000.jpg',
                '1740176-00-A_1.jpg',
            ],
            inStock: 7,
            price: 75,

            slug: "pegamento_barra_dixon_8gr",
            type: 'papeleria',
            tags: ['pegamento'],
            title: "Pegamento Barra Dixon 8gr",
            gender: 'men'
        },
        
    ]
}
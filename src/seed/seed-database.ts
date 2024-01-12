import prisma from "../lib/prisma";
import { initialData } from "./seed";



async function main() {
    //borrar registros
    

    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    

    //Categoria

    const {categories, products} = initialData;

    const categoriesData = categories.map(categoria => ({
        name:categoria
    }))

    await prisma.category.createMany({
        data: categoriesData
    });
    

    const categoriesDB = await prisma.category.findMany();
    const categoriesMap = categoriesDB.reduce((map, category) => {
        map[category.name] = category.id;
        
        return map;
    }, {} as Record<string, string>)

    products.forEach ( async (product) => {
        const {images, category, ...rest} = product;
  
        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId:categoriesMap[category]
            }
        })

        const imagesData = images.map(image => ({
            url: image,
            productId: dbProduct.id
        }));

        await prisma.productImage.createMany({
            data: imagesData
        })

    })


    






    
}


(() => {
    if(process.env.NODE_ENV === 'production') return;
    
    main()
})();
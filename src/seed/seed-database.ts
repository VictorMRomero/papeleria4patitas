import prisma from "../lib/prisma";
import { initialData } from "./seed";
import { estados } from "./seed-estados";



async function main() {
    //borrar registros
    await prisma.orderAddress.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.venta.deleteMany();
    await prisma.userAddress.deleteMany();
    await prisma.user.deleteMany();
    await prisma.estado.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    //usuarios


    //Categoria

    const {categories, products, users} = initialData;


    await prisma.user.createMany({
        data: users
    })

    await prisma.estado.createMany({
        data: estados
    })


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
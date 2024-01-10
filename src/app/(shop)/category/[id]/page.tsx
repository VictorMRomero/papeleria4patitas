import { ProductGrid, Title } from "@/components";
import { ValidCategory, initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
    params:{
        id: ValidCategory;
    }
}
const seedProducts = initialData.products;



 function categoryPage({params}: Props) {

    const {id} = params;
    const products = seedProducts.filter(product => product.category === id);

    if(products.length === 0 ){notFound();}



        
    return(
        <>
            <Title 
                
                title={id}
                subtitle={`Productos de ${id}`}
                className='mb-2'
            />
        
            <ProductGrid 
                products={products}
            />
        </> 


    )

    


}

export default categoryPage;



import { getProductByText } from "@/actions";
import { ProductGrid } from "@/components";
import { NoEncontrado } from "./ui/NoEncontrado";

interface Props {
    searchParams: {
      productSearch:string;
    }
  }


export default async function Search ({searchParams}: Props){
    

    const productSearch = searchParams.productSearch;

    if(productSearch === ''){
        return(
            <NoEncontrado />
        )
    }

  
    const {products }= await getProductByText(productSearch)
    

    if(products.length === 0 ) {
        return(

            <NoEncontrado />
        )
    }


    return(
        <div className="mt-10">
            <ProductGrid
                products={products}
            /> 

        </div>
    )
}
import { Product } from "@/interfaces"
import { ProductGridItem } from "./ProductGridItem";


interface Props {
  products: Product[];
}

export const ProductGrid = ({ products }: Props) => {
  return (
    <>
    <div className="grid grid-cols-2 sm:grid-cols-5 sm:gap-5 gap-2 mb-10">
        {
            products.map(product => (
                <ProductGridItem 
                  key={product.slug}
                  product={product}
                />
            ))
        }
    </div>

    </>



  )
}

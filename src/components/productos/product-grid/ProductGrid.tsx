import { ProductStore } from "@/interfaces"
import { ProductGridItem } from "./ProductGridItem";


interface Props {
  products: ProductStore[];
}

export const ProductGrid = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-5 mb-10">
      {products.map((product) => (
        <ProductGridItem key={product.product.slug} product={product} />
      ))}
    </div>
  )
}

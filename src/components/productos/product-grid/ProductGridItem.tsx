import { ProductCard } from "../product-card";
import { ProductStore } from "@/interfaces"

interface Props {
    product: ProductStore;
}

export const ProductGridItem = ({ product }: Props) => {
    return <ProductCard productStore={product} variant="grid" />
}

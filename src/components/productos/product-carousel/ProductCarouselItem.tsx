import { ProductCard } from "../product-card";
import { ProductStore } from "@/interfaces"

interface Props {
    productStore: ProductStore
}

export const ProductCarouselItem = ({ productStore }: Props) => {
    return <ProductCard productStore={productStore} variant="carousel" />
}
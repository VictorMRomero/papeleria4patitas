import { ProductGrid, Title } from "@/components";
import { ProductsInCart } from "./ui/productsInCart";
import { OrderSummary } from "./ui/OrderSummary";
import { getViewProducts } from "@/actions";


export default async function cart() {

    const {products} = await getViewProducts({});

    return (

        <div className="dark:bg-gray-900 text-white p-4 sm:p-6 md:p-8">
            <Title title="Carrito" />

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:flex-grow space-y-4">
                    <ProductsInCart />
                </div>

                <div className="w-full lg:w-80 mt-6 lg:mt-0">
                    <OrderSummary />
                </div>
            </div>
            
            <Title subtitle="Los clientes tambien compraron..." className="hidden sm:block"/>
            <div className="hidden sm:block">
                <ProductGrid products={products}/>
            </div>

        </div>
    )
}
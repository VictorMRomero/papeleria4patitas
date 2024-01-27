
import { Title } from "@/components";
import Link from "next/link";


import { ProductsInCart } from "./ui/productsInCart";
import { PlaceOrder } from "./ui/PlaceOrder";







export default function cart() {

    return(
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-[1000px] ">

                <Title title="Verificar Orden"/>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

                    {/* CArrito */}
                    <div className="flex flex-col mt-5">
                        <span className="text-xl ">Ajustar elementos</span>
                        <Link href='/cart' className="underline mb-5">
                            Editar carrito
                        </Link>
                    

                    {/* items */}
                    <ProductsInCart/>
                    
                    </div>
                    
                    {/* chekck order */}

                    <PlaceOrder/>


                </div>


            </div>
            
        </div>
    )
}
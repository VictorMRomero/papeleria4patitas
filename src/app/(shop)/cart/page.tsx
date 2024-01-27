import { Title } from "@/components";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ProductsInCart } from "./ui/productsInCart";
import { OrderSummary } from "./ui/OrderSummary";
import { titleFont } from "@/config/fonts";




export default function cart() {

    //if(productsInCart.length === 0) redirect('/empty')

    return(
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-[1000px] ">

                <Title title="Carrito"/>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

                    {/* CArrito */}
                    <div className="flex flex-col mt-5">
                        <span className="text-xl ">Agregar mas articulos</span>
                        <Link href='/' className="underline mb-5">
                            Continua comprando
                        </Link>
                    

                    {/* items */}
                    <ProductsInCart />
                    
                    </div>
                    
                    {/* chekck order */}

                    <div className="abosolute bg-white rounded-xl shadow-xl p-7 h-fit">
                        <h2 className={`${titleFont.className} text-3xl text-bold mb-2`}>Resumen de orden</h2>

                        <OrderSummary />

                        <div className="mt-5 mb-2 w-full">
                            <Link className="flex btn-primary justify-center " href='/checkout/address'>
                                Checkout

                            </Link>
                        </div>

                    </div>


                </div>


            </div>
            
        </div>
    )
}
import { Title } from "@/components";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ProductsInCart } from "./ui/productsInCart";
import { OrderSummary } from "./ui/OrderSummary";
import { titleFont } from "@/config/fonts";




export default function cart() {

    //if(productsInCart.length === 0) redirect('/empty')

    return(
        <div className="w-full   sm:mb-72  mb-10">
            <div className="flex sm:p-5 flex-col ">

                <Title title="Carrito" subtitle="Agregar mas articulos"/>

                <div className={`${titleFont.className} grid grid-cols-1 sm:grid-cols-5 gap-5`}>

                    {/* CArrito */}
                    <div className="flex flex-col sm:col-span-2 mt-5">

                        <Link href='/' className="underline mb-5">
                            Continua comprando
                        </Link>
                    

                    {/* items */}
                        <ProductsInCart />
                    
                    </div>
                    
                    {/* chekck order */}

                    
                        
                    <div className="flex col-span-3 flex-col mt-5">
                        <OrderSummary />
                        

                        <div className="mt-5 mb-2 w-full">
                            <Link className="flex btn-primary justify-center " href='/checkout/address'>
                                Continuar al Pago

                            </Link>
                        </div>
                    </div>


                    


                </div>


            </div>
            
        </div>
    )
}
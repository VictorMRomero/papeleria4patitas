
import { QuantitySelector, Title } from "@/components";
import Link from "next/link";
import {initialData} from '@/seed/seed'
import Image from "next/image";


const productsInCart = [
    initialData.products[0],
    initialData.products[1],

]


export default function cart() {

    return(
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-[1000px] ">

                <Title title="Verificar Orden"/>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

                    {/* CArrito */}
                    <div className="flex flex-col mt-5">
                        <span className="text-xl ">ajustar elementos</span>
                        <Link href='/cart' className="underline mb-5">
                            Editar carrito
                        </Link>
                    

                    {/* items */}
                    {
                        productsInCart.map(product => (
                            <div key={product.slug} className="flex mb-5">
                                <Image
                                    src={`/products/${product.images[0]}`}
                                    width={100}
                                    height={100}
                                    style={{
                                        width: '100px',
                                        height: '100px'
                                    }}
                                    alt={product.title}
                                    className="mr-5 rounded"
                                />
                                <div>
                                    <p>{product.title}</p>
                                    <p>${product.price}</p>
                                    <p className="font-bold">Subtotal: ${product.price * 3}</p>
                                    <button className="underline mt-3">
                                        Remover
                                    </button>
                                </div>

                            </div>
                        ))
                    }
                    </div>
                    
                    {/* chekck order */}

                    <div className="bg-white rounded-xl shadow-xl p-7">
                        
                        <h2 className="text-2xl mb-2 font-bold">Direccion de entrega</h2>
                        <div className="mb-10">
                            <p className="text-xl">Vikis Romero</p>
                            <p>C. Benito Juarez</p>
                            <p>Cardenas </p>
                            <p>Cod. Postal 90520</p>
                        </div>
                        
                        <div className="w-full h-0.5 bg-gray-200 mb-10"/>

                        <h2 className="text-2xl mb-2">Resumen de orden</h2>

                        <div className="grid grid-cols-2">
                            <span>No.productos</span>
                            <span className="text-rigth">3 articulos</span>
                            
                            <span>Subtotal</span>
                            <span className="text-rigth">$100</span>

                            <span>Impuestos</span>
                            <span className="text-rigth">$100</span>

                            <span className="mt-5 text-2xl">Total:</span>
                            <span className=" mt-5 text-2xl text-rigth">$100</span>
                        </div>

                        <div className="mt-5 mb-2 w-full">
                            <span className="mb-5">
                                Al hacer click en &quot;Colocar Orden&quot;, aceptas nuestros <a href="#" className="underline"> terminos y condiciones</a>
                            </span>
                            <Link className="flex btn-primary justify-center" href='/orders/123'>
                                Colocar Orden

                            </Link>
                        </div>

                    </div>&quot


                </div>


            </div>
            
        </div>
    )
}
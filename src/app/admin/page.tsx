'use client'

import { ProductosCarritoVenta } from "@/components/carrito-ventas/ProductosCarritoVenta";
import { ProductsGridVenta } from "@/components/productos/product-grid/ProductsGridVenta";
import { BarraBusqueda } from "@/components/ui/barraBusqueda/BarraBusqueda";
import { SideMenu } from "@/components/ui/side-menu/SideMenu";
import { Product } from "@/interfaces";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";

import { useEffect, useState } from "react";



export default function AdminPage() {

    const [searchResults, setSearchResults] = useState<Product[]>([]);
    
    const handleSearchResults = (results: Product[]) => {
        
        setSearchResults(results);
    };
    
    //---carrito de venta
    
    const { itemInCart, subTotal, total } = useCartStore(state => state.getSumaryInformation());
    const [efectivo, setEfectivo] = useState('');
    const [cambio, setCambio] = useState(0);

    useEffect(() => {
        const efectivoNum = parseFloat(efectivo) || 0;
        const cambioCalculado = efectivoNum - total;
        setCambio(cambioCalculado > 0 ? cambioCalculado : 0);
    }, [efectivo, total]);


    return (
        <div className="bg-blue-gray-50">
            <div className="hide-print flex flex-row h-screen antialiased text-blue-gray-800">

                <SideMenu />


                <div className="flex-grow flex">

                    <div className="flex flex-col bg-blue-gray-50 h-full w-full py-4">
                        <BarraBusqueda onSearchResults={handleSearchResults} />
                        <div className="h-full overflow-hidden mt-4">
                            <div className="h-full overflow-y-auto px-2">
                                <ProductsGridVenta searchResults={searchResults} />
                            </div>
                        </div>
                    </div>



                    <div className="w-5/12 flex flex-col bg-blue-gray-50 h-full bg-white pr-4 pl-2 py-4">
                        <div className="bg-white rounded-3xl flex flex-col h-full shadow">

                            {/* carrito vacio */}


                            {
                                (itemInCart > 0)
                                    ? <div className="flex-1 flex flex-col overflow-auto">
                                        <ProductosCarritoVenta />
                                    </div>
                                    : <div className="flex-1 w-full p-4 opacity-25 select-none flex flex-col flex-wrap content-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <p>
                                            CART EMPTY
                                        </p>
                                    </div>
                            }






                            <div className="h-auto w-full text-center pt-3 pb-4 px-4">
                                <div className="flex mb-3 text-lg font-semibold text-blue-gray-700">
                                    <div>Subtotal</div>
                                    <div className="text-right w-full" >{currencyFormat(subTotal)}</div>
                                </div>
                                <div className="flex mb-3 text-lg font-semibold text-blue-gray-700">
                                    <div>Descuento</div>
                                    <div className="text-right text-green-400 w-full" >{currencyFormat(total - subTotal)}</div>
                                </div>
                                <div className="flex mb-3 text-lg font-semibold text-blue-gray-700">
                                    <div>TOTAL</div>
                                    <div className="text-right w-full" >{currencyFormat(total)}</div>
                                </div>
                                <div className="mb-3 text-blue-gray-700 px-3 pt-2 pb-3 rounded-lg bg-blue-gray-50">
                                    <div className="flex text-lg font-semibold">
                                        <div className="flex-grow text-left">
                                            Efectivo
                                        </div>
                                        <div className="flex text-right">
                                            <input
                                                type="text"
                                                className="w-28 text-right bg-white shadow rounded-lg focus:bg-white focus:shadow-lg px-2 focus:outline-none"
                                                value={efectivo}
                                                onChange={(e) => setEfectivo(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                </div>
                                <div className="flex mb-3 text-lg font-semibold bg-cyan-50 text-blue-gray-700 rounded-lg py-2 px-3">
                                    <div className="text-cyan-800">
                                        Cambio
                                    </div>
                                    <div className="text-right flex-grow text-cyan-600">
                                        {cambio.toFixed(2)}
                                    </div>
                                </div>
                                <button className="dark:text-white bg-green-400 hover:bg-blue-400 rounded-2xl text-lg w-full py-3 ">
                                    VENDER
                                </button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}


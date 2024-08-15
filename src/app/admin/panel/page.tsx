

// import { ProductImage } from "@/components";
// import Link from "next/link";
// import { OrderSummary } from "../../(shop)/cart/ui/OrderSummary";
// import { AddtoCart } from "../../(shop)/product/[slug]/ui/AddtoCart";

// import { PlaceVenta } from "./ui/PlaceVenta";

// interface Props {
//     searchParams: {
//         productSearch: string;
//         page: string;
//     }
// }



export default async function VentasPage() {

    return (
        <div className="flex h-screen bg-gray-100">
  {/* <!-- Barra lateral izquierda --> */}
            <div className="w-16 bg-gray-800 text-white">
                {/* <!-- Íconos de navegación --> */}
                <div className="flex flex-col items-center py-4 space-y-4">
                    <div className="bg-blue-500 p-2 rounded-full">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    </div>
                {/* <!-- Añadir más íconos aquí --> */}
                </div>
            </div>
{/* 
  <!-- Contenido principal --> */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* <!-- Barra superior --> */}
                <header className="flex justify-between items-center p-4 bg-white shadow">
                    <h1 className="text-2xl font-bold">Vender</h1>
                    <div className="flex items-center space-x-4">
                        <button className="bg-gray-200 px-3 py-1 rounded">Ayuda</button>
                        <select className="border rounded px-2 py-1">
                        <option>Grano Cafetería</option>
                        </select>
                    </div>
                </header>

                {/* <!-- Área principal --> */}
                <main className="flex-1 flex overflow-hidden">
                {/* <!-- Catálogo de productos --> */}
                    <div className="w-3/4 p-4 overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <input type="text" placeholder="Nombre o código" className="border rounded px-2 py-1 w-64"></input>
                            <button className="border rounded px-3 py-1">Categorías</button>
                        </div>
                        <div className="grid grid-cols-5 gap-4">
                        {/* <!-- Producto --> */}
                            <div className="bg-white rounded shadow overflow-hidden">
                                <img src="ruta_imagen" alt="Producto" className="w-full h-32 object-cover"></img>
                                <div className="p-2">
                                    <h3 className="font-semibold">Agua con gas</h3>
                                    <p className="text-sm text-gray-600">$ 6,90</p>
                                </div>
                            </div>
                        {/* <!-- Repetir para más productos --> */}
                        </div>
                    </div>
            {/* 
                <!-- Carrito de compra --> */}
                    <div className="w-1/4 bg-white p-4 overflow-y-auto">
                        <h2 className="font-bold mb-4">Seleccionar cliente</h2>
                        <div className="space-y-2">
                        {/* <!-- Ítem del carrito --> */}
                            <div className="flex justify-between items-center">
                                <div>
                                <span className="font-semibold">1</span>
                                <span>Capuchino chocco</span>
                                </div>
                                <span>$ 7,10</span>
                            </div>
                        {/* <!-- Repetir para más ítems --> */}
                        </div>
                        <div className="mt-8">
                            <div className="flex justify-between mb-2">
                                <span>Subtotal:</span>
                                <span>$ 62,10</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600 mb-4">
                                <span>Descuento (5%):</span>
                                <span>$ 3,10</span>
                            </div>                            <div className="flex justify-between mb-2">
                                <span>Subtotal:</span>
                                <span>$ 62,10</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600 mb-4">
                                <span>Descuento (5%):</span>
                                <span>$ 3,10</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total:</span>
                                <span>$ 59,00</span>
                            </div>
                            <button className="w-full bg-green-500 text-white py-2 rounded mt-4">Ir al pago</button>
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total:</span>
                                <span>$ 59,00</span>
                            </div>
                            <button className="w-full bg-green-500 text-white py-2 rounded mt-4">Ir al pago</button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
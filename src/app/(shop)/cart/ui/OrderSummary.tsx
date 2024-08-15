
'use client'

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";



export const OrderSummary = () => {

  const [loaded, setLoaded] = useState(false);

  const { itemInCart, subTotal, total } = useCartStore(state => state.getSumaryInformation());

  useEffect(() => {
    setLoaded(true)
    if(itemInCart === 0) redirect('/empty')
  }, [itemInCart])

  if (!loaded) return <p>Cargando...</p>

  return (
    <div className="border text-black dark:text-white dark:bg-gray-800 rounded-lg p-4 mb-4">
      <h2 className="text-xl font-bold mb-4">Orden</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Precio original</span>
          <span>{currencyFormat(subTotal)}</span>
        </div>
        <div className="flex justify-between text-green-400">
          <span>Ahorras</span>
          <span>{currencyFormat(total - subTotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>No. de productos</span>
          <span>{itemInCart}</span>
        </div>
        <div className="flex justify-between">
          <span>Iva</span>
          <span>Ya incluido</span>
        </div>
        <div className="flex justify-between font-bold text-xl mt-4">
          <span>Total</span>
          <span>{currencyFormat(total)}</span>
        </div>
      </div>
      <button className="w-full bg-blue-600 text-white py-2 rounded-md mt-4 hover:bg-blue-700">
        Proceder al pago
      </button>
      <Link href="/" className="block text-center text-blue-400 mt-2">Continua comprando →</Link>
    </div>
  )
}
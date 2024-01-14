
'use client'

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useEffect, useState } from "react";



export const OrderSummary = () => {

    const [loaded, setLoaded] = useState(false);

    
    const {itemInCart, subTotal} = useCartStore(state => state.getSumaryInformation());
    
    
    useEffect(() => {
        setLoaded(true)
    },[])

    if(!loaded) return <p>Cargando...</p>

    

  return (
    <div className="grid grid-cols-2">
        <span>No.productos</span>
        <span className="text-rigth">{itemInCart}</span>
        
        {/* <span>Subtotal</span>
        <span className="text-rigth">$100</span>

        <span>Impuestos</span>
        <span className="text-rigth">$100</span> */}

        <span className="mt-5 text-2xl">Total:</span>
        <span className=" mt-5 text-2xl text-rigth">{currencyFormat(subTotal)}</span>
    </div>
  )
}

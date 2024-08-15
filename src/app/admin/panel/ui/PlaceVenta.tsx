"use client"

import { placeOrder, placeVenta } from '@/actions';
import { titleFont } from '@/config/fonts';
import { useAddressStore, useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export const PlaceVenta = () => {

    const router = useRouter();

    const [loaded, setLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isPlacingVenta, setIsPlacingVenta] = useState(false);

    const address = useAddressStore(state => state.address);
    
    const {itemInCart, total, subTotal} = useCartStore(state => state.getSumaryInformation());
    
    const cart = useCartStore(state => state.cart)
    const clearCart = useCartStore(state => state.clearCart) 

    useEffect(() => {
        setLoaded(true);
    },[])
    
    
 
    
    const onPlaceVenta = async() => {
        setIsPlacingVenta(true);
        
        const productsToOrder = cart.map(producto => ({
            productId: producto.id,
            quantity: producto.quantity,
            
        }))
        
        //! server action
        const resp = await placeVenta(productsToOrder);
        if(!resp.ok){
            
            setIsPlacingVenta(false);
            setErrorMessage(resp.message);
            return;
            
        }
        // Todo bien

        //router.replace(`/orders/` + resp.order!.id)
        router.replace(`/admin/ventas`)
        clearCart();

        
    }



    if(!loaded){
        return <p>Cargando...</p>
    }



    return (

            <div className="mt-5 mb-2 w-full">
                {/* <span className="mb-5">
                    Al hacer click en &quot;Colocar Orden&quot;, aceptas nuestros <a href="#" className="underline"> terminos y condiciones</a>
                </span> */}

            <p className='text-red-500'>{errorMessage}</p>

                <button 
                    className={
                        clsx(
                            "flex justify-center w-full mt-4" ,
                            {
                             
                            'btn-primary': !isPlacingVenta,
                            'btn-disabled': isPlacingVenta
                        })
                    }
                    onClick={onPlaceVenta}
                >
                    Vender
                </button>
            </div>
    )
}
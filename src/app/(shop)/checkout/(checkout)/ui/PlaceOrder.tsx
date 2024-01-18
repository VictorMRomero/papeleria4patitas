"use client"

import { placeOrder } from '@/actions';
import { useAddressStore, useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export const PlaceOrder = () => {

    const router = useRouter();

    const [loaded, setLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const address = useAddressStore(state => state.address);
    
    const {itemInCart, subTotal} = useCartStore(state => state.getSumaryInformation());
    
    const cart = useCartStore(state => state.cart)
    const clearCart = useCartStore(state => state.clearCart) 

    useEffect(() => {
        setLoaded(true);
    },[])
    
 
    
    const onPlaceOrder = async() => {
        setIsPlacingOrder(true);
        
        const productsToOrder = cart.map(producto => ({
            productId: producto.id,
            quantity: producto.quantity,
            
        }))
        
        //! server action
        const resp = await placeOrder(productsToOrder, address);
        if(!resp.ok){
            
            setIsPlacingOrder(false);
            setErrorMessage(resp.message);
            return;
            
        }
        // Todo bien

        clearCart();
        router.replace(`/orders/` + resp.order!.id)




        

        
        
    }



    if(!loaded){
        return <p>Cargando...</p>
    }



    return (
        <div className="bg-white rounded-xl shadow-xl p-7">

            <h2 className="text-2xl mb-2 font-bold">Direccion de entrega</h2>
            <div className="mb-10">
                <p className="text-xl">{address.firstName} {address.lastName}</p>
                <p>{address.address}</p>
                <p>{address.address2} </p>
                <p>{address.postalCode}</p>
                <p>{address.city}, {address.country}</p>
                <p>{address.phone}</p>
            </div>

            <div className="w-full h-0.5 bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Resumen de orden</h2>

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

            <div className="mt-5 mb-2 w-full">
                <span className="mb-5">
                    Al hacer click en &quot;Colocar Orden&quot;, aceptas nuestros <a href="#" className="underline"> terminos y condiciones</a>
                </span>

            <p className='text-red-500'>{errorMessage}</p>
                
                <button 
                    className={
                        clsx(
                            "flex justify-center" ,
                            {
                             
                            'btn-primary': !isPlacingOrder,
                            'btn-disabled': isPlacingOrder
                        })
                    }
                    onClick={onPlaceOrder}
                >
                    Colocar Orden
                </button>
            </div>

        </div>
    )
}

'use client';

import { setPayOrder } from "@/actions";
import { Order } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";




interface Props {
  orderId: string;
  order: Order;
}



export const TiendaButton = ({ orderId, order }: Props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onPayOrder = async() => {
        setIsLoading(true);
        
        const {ok} = await setPayOrder(orderId, order);

        
        setIsLoading(false);
        
        if(ok){
            router.refresh();
        }

    }





  return (
    <div className="relative z-0">
        <button onClick={onPayOrder} className="btn-primary w-full">{isLoading ? 'Procesando...' : 'Entregar'}</button>
    </div>
  )
}
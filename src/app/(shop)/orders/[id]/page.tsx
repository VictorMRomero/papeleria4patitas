
import { Title } from "@/components";

import Image from "next/image";
import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";
import { getItemsByOrderId, getOrderById, getProductById, getUserById } from "@/actions";





interface Props {
    params: {
        id: string;
    };
}


export default async function order({params}:Props) {



    const {id } = params;

    //Traer orden
    const order = await getOrderById(id);
    //trar usuario
    const user = await getUserById(order?.userId ?? '');

    //traer los itemsIds
    const items = await getItemsByOrderId(order?.id ?? '');

    // const products = await Promise.all(items.map(async (item) => {
    //     const product = await getProductById(item.productId);
    //     return product;
    // }));
  


    //redirect


    
    return(
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-[1000px] ">

                <Title title={`Orden #${id.split('-').at(-1)}`}/>
                

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

                    <div className="flex flex-col mt-5">
       
                        <div className={
                            clsx(
                                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                                {
                                    
                                    'bg-red-500': !order?.isPaid,
                                    'bg-green-700':order?.isPaid
                                }
                            )
                        }>
                            <IoCardOutline size={30}/>
                            {
                                (order?.isPaid)
                                ? <span className="mx-2"> Orden Pagada </span>
                                : <span className="mx-2"> Pendiente de pago </span>
                                
                            }
                            
                        </div>


                    

                    {/* items */}
                    {
                        items.map(item => (
                            <div key={item.id} className="flex mb-5">
                                <Image
                                    src={`/products/${item.product.ProductImage}`}
                                    width={100}
                                    height={100}
                                    style={{
                                        width: '100px',
                                        height: '100px'
                                    }}
                                    alt={item.product.title}
                                    className="mr-5 rounded"
                                />
                                <div>
                                    <p>{item.product.title}</p>
                                    <p>Piezas: {item.quantity}</p>
                                    <p>${item.price}</p>
                                    <p className="font-bold">Subtotal: ${item.price * item.quantity}</p>

                                </div>

                            </div>
                        ))
                    }
                    </div>
                    
                    {/* chekck order */}

                    <div className="bg-white rounded-xl shadow-xl p-7">
                        
                        <h2 className="text-2xl mb-2 font-bold">Direccion de entrega</h2>
                        <div className="mb-10">
                            <p><span className="font-bold">Nombre: </span> {user?.name}</p>
                            <p><span className="font-bold">Direccion: </span>{order?.OrderAddress?.address}</p>
                            <p><span className="font-bold">Direccion 2: </span>{order?.OrderAddress?.address2}</p>
                            <p><span className="font-bold">Ciudad: </span> {order?.OrderAddress?.city}</p>
                            <p><span className="font-bold">Pais </span>{order?.OrderAddress?.countryId}</p>
                            <p><span className="font-bold">Telefono </span>{order?.OrderAddress?.phone}</p>
                        </div>
                        
                        <div className="w-full h-0.5 bg-gray-200 mb-10"/>

                        <h2 className="text-2xl font-bold mb-2">Resumen de orden</h2>

                        <div className="mb-5">
                            
                            <p><span className="font-bold">No.productos: </span>{order?.itemsInOrder}</p>
                            
                            {/* <span className="font-bold">Total: </span>
                            <span className="text-rigth">${order?.subTotal}</span> */}

                            

                            
                            <p className="mt-5 text-2xl"><span className="text-2xl font-bold">Total a pagar: </span>{order?.subTotal}</p>
                            <span className="text-rigth">*Iva incluido *</span>
                        </div>

                        <div className={
                            clsx(
                                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                                {
                                    'bg-red-500': !order?.isPaid,
                                    'bg-green-700':order?.isPaid
                                }
                            )
                        }>
                            <IoCardOutline size={30}/>
                            {
                                (order?.isPaid)
                                ? <span className="mx-2"> Orden Pagada </span>
                                : <span className="mx-2"> Pendiente de pago </span>
                                
                            }
                        </div>

                    </div>


                </div>


            </div>
            
        </div>
    )
}
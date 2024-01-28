
'use client'

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";



export const OrderSummary = () => {
  const router = useRouter();
  const productsInCart = useCartStore(state => state.cart);
  const [loaded, setLoaded] = useState(false);
  const removeProductInCart = useCartStore(state => state.removeProduct)

  //todo utilizar total
  const { itemInCart, subTotal } = useCartStore(state => state.getSumaryInformation());


  useEffect(() => {
    setLoaded(true)
  }, [])



  if (!loaded) return <p>Cargando...</p>




  return (

    <>
      <div className="hidden sm:flex  shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right ">

          <tbody>
            <tr className="border-b border-gray-300">
              <th scope="row" className="px-4 py-2 font-bold whitespace-nowrap bg-gray-200 ">
                Productos
              </th>

              <th className="px-4 py-2">
                Precion
              </th>
              <th className="px-4 py-2">
                Cantidad
              </th>
              <th>
                Subtotal
              </th>
            </tr>

            {
              productsInCart.map((product) => (



                <tr key={product.slug} className="border-b border-gray-300">
                  <th scope="row" className="grid-cols-2 flex px-6 py-4 font-medium whitespace-nowrap bg-gray-100 ">
                    

                      <button onClick={() => removeProductInCart(product) } className="underline hover:text-red-400 mt-3 cursor-pointer">
                          <IoCloseCircleOutline size={30} className="mr-2"/>
                        </button>
                    
                    {product.title}
                  </th>

                  <th className="px-6 py-4">
                    {product.price} 
                  </th>

                  <th className="px-6 py-4">
                    {product.quantity}
                  </th>

                  <th className="px-6 py-4">
                    {product.price * product.quantity}
                  </th>
 



                </tr>



              ))
            }

            <tr className="border-b border-gray-300">
              <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap bg-blue-800 ">
                Total:
              </th>

              <td className="px-6 py-4 text-2xl font-bold">
                {currencyFormat(subTotal)}  
              </td>
            </tr>

          </tbody>
        </table>
      </div>

      <span className="sm:hidden text-2xl font-bold">Subtotal: {subTotal}</span>
    </>












  )
}

import { getSales } from "@/actions"
import { titleFont } from "@/config/fonts";



export default async function Sales() {

    const ventas = await getSales();


    return (



        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                <div>
                    <button id="dropdownRadioButton" data-dropdown-toggle="dropdownRadio" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">

                        Todas 
                        <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>



                </div>

            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mb-10">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>

                        <th scope="col" className="px-6 py-3">
                            Vendedor
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Cantidad
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Total
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Articulo(s)
                        </th>

                    </tr>
                </thead>
                <tbody>
                    

                {
                    ventas.map((venta) => (
                        <tr key={venta.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {venta.user.name}
                            </th>
                            <td className="px-6 py-4">
                                {venta.itemsInOrder}
                            </td>
                            <td className="px-6 py-4">
                                {venta.total}
                            </td>
                            <td className="px-6 py-4">
                                {venta.OrderItem[0].product.title}...
                            </td>
                        </tr>
                    ))
                }

                <span className={`${titleFont.className} text-3xl font-bold`}>Total: {
                    
                }</span>

                
                </tbody>
            </table>
        </div>
    )
}
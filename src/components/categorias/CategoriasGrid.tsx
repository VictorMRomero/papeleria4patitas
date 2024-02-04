import Link from "next/link"
import { IoAddOutline, IoAppsSharp, IoCutSharp, IoGiftOutline, IoGiftSharp, IoPricetagOutline, IoPricetagSharp } from "react-icons/io5"

export const CategoriaGrid = () => {
    return (
        <div className="grid grid-cols-4 sm:grid-cols-5 xl:grid-cols-10 mt-4 gap-2">
            <Link href="#" className=" text-center block max-w-sm p-2 hover:bg-gray-100 ">
                <IoAppsSharp className='w-full text-blue-500' size={60} />
                <h5 className="mb-2 text-lg font-semibold text-gray-900 ">Todos los productos </h5>

            </Link>
            <Link href="#" className=" text-center block max-w-sm p-2 hover:bg-gray-100 ">
                <IoPricetagOutline className='w-full text-red-400' size={60} />
                <h5 className="mb-2 text-lg font-semibold text-gray-900 ">Descuentos</h5>

            </Link>
            <Link href="#" className=" text-center block max-w-sm p-2 hover:bg-gray-100 ">
                <IoGiftOutline className='w-full text-blue-500' size={60} />
                <h5 className="mb-2 text-lg font-semibold text-gray-900 ">Regalos</h5>

            </Link>
            <Link href="#" className=" text-center block max-w-sm p-2 hover:bg-gray-100 ">
                <IoGiftOutline className='w-full text-blue-500' size={60} />
                <h5 className="mb-2 text-lg font-semibold text-gray-900 ">Regalos</h5>

            </Link>
            <Link href="#" className=" text-center block max-w-sm p-2 hover:bg-gray-100 ">
                <IoGiftOutline className='w-full text-blue-500' size={60} />
                <h5 className="mb-2 text-lg font-semibold text-gray-900 ">Regalos</h5>

            </Link>
            <Link href="#" className=" text-center block max-w-sm p-2 hover:bg-gray-100 ">
                <IoGiftOutline className='w-full text-blue-500' size={60} />
                <h5 className="mb-2 text-lg font-semibold text-gray-900 ">Regalos</h5>

            </Link>
            <Link href="#" className=" text-center block max-w-sm p-2 hover:bg-gray-100 ">
                <IoGiftOutline className='w-full text-blue-500' size={60} />
                <h5 className="mb-2 text-lg font-semibold text-gray-900 ">Regalos</h5>

            </Link>
            <Link href="#" className=" text-center block max-w-sm p-2 hover:bg-gray-100 ">
                <IoGiftOutline className='w-full text-blue-500' size={60} />
                <h5 className="mb-2 text-lg font-semibold text-gray-900 ">Regalos</h5>

            </Link>
            <Link href="#" className=" text-center block max-w-sm p-2 hover:bg-gray-100 ">
                <IoGiftOutline className='w-full text-blue-500' size={60} />
                <h5 className="mb-2 text-lg font-semibold text-gray-900 ">Regalos</h5>

            </Link>
            <Link href="#" className=" text-center block max-w-sm p-2 hover:bg-gray-100 ">
                <IoGiftOutline className='w-full text-blue-500' size={60} />
                <h5 className="mb-2 text-lg font-semibold text-gray-900 ">Regalos</h5>

            </Link>


        </div>
    )
}
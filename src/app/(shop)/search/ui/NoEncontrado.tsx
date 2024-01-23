import { titleFont } from "@/config/fonts"
import Image from "next/image"
import Link from "next/link"


export const NoEncontrado = () => {
  return (
    <>
        <div className="text-center mt-20 mb-40">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl ">Lo sentimos no pudimos encontrar lo que buscas.</h1>
            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">No se encontraron resultados para la búsqueda, puedes buscar otro artículo o regresar al inicio.</p>
            <a href="/" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                Regresar
            </a>

        </div>
    </>




    
  )
}

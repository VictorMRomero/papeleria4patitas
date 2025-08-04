import Link from "next/link"
import { IoArrowForward } from "react-icons/io5"

interface Props {
    link: string
    text: string
}

export const ViewMoreCard = ({ link, text }: Props) => {
    return (
        <Link href={link} className="block group">
            <div className="w-48 md:w-56 lg:w-64 h-80 md:h-96 lg:h-[420px] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl border-2 border-dashed border-blue-300 hover:border-blue-400 transition-all duration-300 relative overflow-hidden">
                
                {/* Elementos decorativos de fondo */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 right-4 w-16 h-16 bg-blue-400 rounded-full"></div>
                    <div className="absolute bottom-6 left-4 w-12 h-12 bg-blue-300 rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>

                {/* Contenido principal */}
                <div className="relative z-10 text-center p-6">
                    {/* Icono */}
                    <div className="mb-4 flex justify-center">
                        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <IoArrowForward className="w-8 h-8 text-white group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                    </div>

                    {/* Texto */}
                    <h3 className="text-lg md:text-xl font-bold text-blue-700 mb-2 group-hover:text-blue-800 transition-colors">
                        {text}
                    </h3>
                    
                    <p className="text-sm text-blue-600 group-hover:text-blue-700 transition-colors">
                        Descubre toda nuestra colección
                    </p>

                    {/* Indicador de acción */}
                    <div className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700">
                        <span>Explorar</span>
                        <IoArrowForward className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                </div>

                {/* Efecto hover de brillo */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
            </div>
        </Link>
    )
}
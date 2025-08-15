import Link from 'next/link';
import { IoCheckmarkCircleOutline, IoShieldCheckmarkOutline, IoGiftOutline, IoFlashOutline } from 'react-icons/io5';

export const BenefitsSection = () => {
    // Definir los beneficios con sus respectivos iconos
    const benefits = [
        {
            icon: <IoFlashOutline className="text-4xl text-blue-600 dark:text-blue-400" />,
            title: 'No a las filas',
            href: '#',
        },
        {
            icon: <IoGiftOutline className="text-4xl text-blue-600 dark:text-blue-400" />,
            title: 'Productos Exclusivos',
            href: '#',
        },
        {
            icon: <IoCheckmarkCircleOutline className="text-4xl text-blue-600 dark:text-blue-400" />,
            title: 'Bonificación por compra',
            href: '#',
        },
        {
            icon: <IoShieldCheckmarkOutline className="text-4xl text-blue-600 dark:text-blue-400" />,
            title: 'Compra fácil y segura',
            href: '#',
        },
    ];

    return (
        <div className="relative my-10 md:my-16 lg:my-20 flex justify-center px-4">
            {/* Contenedor del título flotante */}
            <div className="absolute -top-6 bg-yellow-300 rounded-full px-6 py-3 shadow-lg flex items-center justify-between space-x-2">
                <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">
                    Beneficios de comprar en Papelería 4 Patitas
                </span>
                <span className="text-gray-800">
                    {/* Icono de flecha */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </span>
            </div>

            {/* Contenedor de los beneficios */}
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-full pt-6 pb-4 px-4 sm:px-6 lg:px-8">
                {/* Grid para el layout de los beneficios */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {benefits.map((benefit, index) => (
                        <Link href={benefit.href} key={index} className='flex flex-col items-center text-center pt-4 text-xs md:text-base'>
                            <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full hover:bg-green-300 transition-all duration-300">
                                {benefit.icon}
                            </div>
                            <h3 className="text-sm md:text-lg font-semibold text-gray-900 mt-2">{benefit.title}</h3>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};
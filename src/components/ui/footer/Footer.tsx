import { titleFont } from "@/config/fonts"
import Link from "next/link"
import { IoEyeOffOutline, IoHelpOutline, IoHomeOutline, IoLocationOutline, IoLogoFacebook, IoMailOutline, IoPeopleOutline, IoReaderOutline, IoTimeOutline } from "react-icons/io5"


export const Footer = () => {
  return (

    <footer className="bg-gray-600">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-3 gap-8 px-4 py-6 lg:py-8 md:grid-cols-3">
          <div>
            <h2 className={`${titleFont.className} mb-6  font-semibold text-gray-900 uppercase dark:text-white text-xl`}>Encuéntranos</h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className=" mb-4 flex items-center">
                <IoLocationOutline size={30} className='w-[50px] mr-1 text-yellow-300 flex-shrink-0'/>
                <span className={`${titleFont.className} antialiased`}>C. Benito Juarez No.40, Col. Lazaro Cardenas, C.P. 90520, Humantla Tlaxcala</span>
              </li>
              <li className="flex items-center mb-1">
                <IoMailOutline size={30} className='w-[50px] mr-1 text-yellow-300 flex-shrink-0'/>
                <span className={`${titleFont.className} antialiased`}>papeleria4patitas@gmail.com</span>
              </li>
              <li className="mt-2 flex items-center">
                <IoTimeOutline size={30} className='w-[50px] mr-1 text-yellow-300 flex-shrink-0'/>
                <span className={`${titleFont.className} antialiased`}>Horario: Todos los días de 7:30 a.m. a 9:30 p.m.</span>
              </li>

            </ul>
          </div>
          <div>
            <h2 className={`mb-6 text-xl font-semibold text-gray-900 uppercase dark:text-white ${titleFont.className} antialiased`}>Nosotros</h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4 flex items-center">
                <IoHomeOutline size={30} className='w-[50px] mr-1 text-yellow-300 flex-shrink-0'/>
                <Link href="/" className={`${titleFont.className} hover:underline hover:text-yellow-300`}>Inicio</Link>
              </li>
              <li className="mb-4 flex items-center">
              <IoPeopleOutline size={30} className='w-[50px] mr-1 text-yellow-300 flex-shrink-0'/>
              <Link href="/" className={`${titleFont.className} hover:underline hover:text-yellow-300`}>¿Quiénes Somos?</Link>
              </li>

            </ul>
          </div>
          <div>
            <h2 className={`mb-6 text-xl font-semibold text-gray-900 uppercase dark:text-white ${titleFont.className} antialiased`}>Atención al ciente</h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4 flex items-center">
                <IoEyeOffOutline size={30} className='w-[50px] mr-1 text-yellow-300 flex-shrink-0'/>
                <Link href="/" className={`${titleFont.className} hover:underline hover:text-yellow-300`}>Aviso de privacidad</Link>
              </li>
              <li className="mb-4 flex items-center">
              <IoHelpOutline size={30} className='w-[50px] mr-1 text-yellow-300 flex-shrink-0'/>
              <Link href="/" className={`${titleFont.className} hover:underline hover:text-yellow-300`}>Preguntas Frecuentes</Link>
              </li>
              <li className="mb-4 flex items-center">
              <IoReaderOutline size={30} className='w-[50px] mr-1 text-yellow-300 flex-shrink-0'/>
              <Link href="/" className={`${titleFont.className} hover:underline hover:text-yellow-300`}>Términos y Condiciones</Link>
              </li>

            </ul>
          </div>
          </div>
        <div className="px-4 py-6 bg-gray-100 dark:bg-gray-700 md:flex md:items-center md:justify-between">
          <span className= {`${titleFont.className} text-gray-500 dark:text-gray-300 sm:text-center`}>2024 | <span className={`${titleFont.className} font-bold`}>Papeleria 4 Patitas</span>. 
          </span>
          <div className="flex mt-4 sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
            <Link href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
              
                <IoLogoFacebook className="w-4 h-4 text-blue-300"/>
            </Link>
            
          </div>
        </div>
      </div>
    </footer>


  )
}

import { titleFont } from "@/config/fonts"
import Link from "next/link"
import { IoEyeOffOutline, IoHelpOutline, IoHomeOutline, IoLocationOutline, IoLogoFacebook, IoLogoGithub, IoLogoLinkedin, IoLogoTwitter, IoLogoWhatsapp, IoMailOutline, IoPeopleOutline, IoReaderOutline, IoTimeOutline } from "react-icons/io5"


export const Footer = () => {
  return (

    <footer className="bg-gray-200 dark:bg-gray-700 ">
      <div className="mx-auto w-full max-w-screen-xl text-gray-800">
        <div className="text-sm grid grid-cols-1 gap-8 px-4 py-6 lg:py-8 md:grid-cols-3">
          <div>
            <h2 className={`mb-6  font-bold text-blue-950 dark:text-gray-200 text-xl`}>Encuéntranos</h2>
            <ul className=" dark:text-gray-400 font-medium ">
              <li className=" mb-4 flex items-center">
                <IoLocationOutline size={20} className='w-[50px] mr-1 text-yellow-600 dark:text-yellow-300 flex-shrink-0'/>
                <span className={`${titleFont.className} antialiased`}>C. Benito Juárez No. 40, Col. Lázaro Cárdenas, C.P. 90520, Huamantla, Tlaxcala.</span>
              </li>
              <li className="flex items-center mb-1">
                <IoMailOutline size={20} className='w-[50px] mr-1 text-blue-600 flex-shrink-0'/>
                <span className={`${titleFont.className} antialiased`}>papeleria4patitas@gmail.com</span>
              </li>
              <li className="mt-2 flex items-center">
                <IoTimeOutline size={20} className='w-[50px] mr-1 text-green-600 flex-shrink-0'/>
                <span className={`${titleFont.className} antialiased`}>Horario: Todos los días de 7:30 a.m. a 10:00 p.m.</span>
              </li>

            </ul>
          </div>
          <div>
            <h2 className={`mb-6 text-xl font-bold text-blue-950 dark:text-gray-200  antialiased`}>Nosotros</h2>
            <ul className=" dark:text-gray-400 font-medium">
              <li className="mb-4 flex items-center">
                <IoHomeOutline size={20} className='w-[50px] mr-1 text-red-600 flex-shrink-0'/>
                <Link href="/" className={` hover:underline hover:text-yellow-300`}>Inicio</Link>
              </li>
              <li className="mb-4 flex items-center">
              <IoPeopleOutline size={20} className='w-[50px] mr-1 text-blue-600 flex-shrink-0'/>
              <Link href="/nosotros" className={`hover:underline hover:text-yellow-300`}>¿Quiénes Somos?</Link>
              </li>

            </ul>
          </div>
          <div>
            <h2 className={`mb-6 text-xl font-bold text-blue-950 dark:text-gray-200 antialiased`}>Atención al ciente</h2>
            <ul className=" dark:text-gray-400 font-medium">
              <li className="mb-4 flex items-center">
                <IoEyeOffOutline size={20} className='w-[50px] mr-1 text-yellow-600 flex-shrink-0'/>
                <Link href="/" className={` hover:underline hover:text-yellow-300`}>Aviso de privacidad</Link>
              </li>

              <li className="mb-4 flex items-center">
              <IoReaderOutline size={20} className='w-[50px] mr-1 text-green-600 flex-shrink-0'/>
              <Link href="#" className={` hover:underline hover:text-yellow-300`}>Términos y Condiciones</Link>
              </li>

            </ul>
          </div>
          </div>
        <div className="px-4 py-6 bg-blue-950 text-sm dark:bg-gray-900 md:flex md:items-center md:justify-between">
          <span className= {`text-gray-100 dark:text-gray-300 sm:text-center`}>2024 | <span className={`${titleFont.className} font-bold`}>Made By Victor Manuel Romero</span>. 
          </span>
          <div className="flex mt-4 sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
            <Link href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
              
                <IoLogoLinkedin className="w-4 h-4 text-blue-500"/>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
              
              <IoLogoGithub className="w-4 h-4 text-white"/>
          </Link>
          <Link href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
              
              <IoLogoWhatsapp className="w-4 h-4 text-green-500"/>
          </Link>

            
          </div>
        </div>
      </div>
    </footer>


  )
}

'use client'
import { logout } from "@/actions";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoListOutline, IoLogOutOutline, IoMoonOutline, IoPersonOutline, IoReaderOutline, IoShirtOutline, IoStorefrontOutline, IoSunnyOutline } from "react-icons/io5";


export const SideMenu = () => {

    const router = useRouter();
    const { theme, setTheme } = useTheme();

    const items = [
      {
        title: theme === "light" ? "Modo Obscuro" : "Modo claro",
        icon: theme === "light" ? <IoMoonOutline className="text-2xl"/> : <IoSunnyOutline className="text-2xl"/>,
        color: "bg-teal-300 dark:bg-teal-800",
        onclick: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
      },

      {
        title: "Ver Categorias",
        icon: <IoListOutline className="text-2xl"/>,
        onclick: () => {router.push('/admin/categorias')},
      },
      {
        title: "Ver Ordenes",
        icon: <IoReaderOutline className="text-2xl"/>,
        color: "bg-fuchsia-300 dark:bg-fuchsia-800",
        onclick: () => {router.push('/admin/orders')},
      },
      {
        title: "Ver Usuarios",
        icon: <IoPersonOutline className="text-2xl"/>,
        color: "bg-red-300 dark:bg-red-800",
        onclick: () => { router.push('/admin/users') },
      },
      {
        title: "Ver ventas",
        icon: <IoStorefrontOutline className="text-2xl"/>,
        color: "bg-red-300 dark:bg-red-800",
        onclick: () => { router.push('/admin/sales') },
      },
      ];

    return( 

      <div className="flex flex-row w-auto flex-shrink-0 pl-4 pr-2 py-4">
          <div className="flex flex-col items-center py-4 flex-shrink-0 w-20 dark:bg-navegacion bg-indigo-900 rounded-3xl">
              <Link href="/" className="flex items-center justify-center h-14 w-14 rounded-full" title="Regresar a la pagina principal">
                <Image
                  src="https://res.cloudinary.com/dog6zhxr8/image/upload/v1705889836/ucdj2aqkkenh4jus1aoh.png"
                  alt="logo"
                  width={80}
                  height={80}
                  className="hidden sm:flex"
                />
              </Link>
              <ul className="flex flex-col space-y-2 mt-12">
                {
                  items.map(item => (
                    <li key={item.title}>
                        <div onClick={item.onclick} className="flex items-center " title={item.title}>
                          <span className="flex items-center justify-center text-gray-200 hover:bg-sky-400 dark:hover:bg-sky-700 h-14 w-14 rounded-full">
                            {item.icon}
                          </span>
                        </div>
                    </li>
                  ))
                }                
              </ul>

              <div onClick={() => logout()} className="mt-auto flex items-center justify-center text-gray-200  h-14 w-14" title="Cerrar Sesion">
                <span className="flex items-center justify-center text-gray-200 h-14 w-14 hover:bg-red-400 dark:hover:bg-red-700 rounded-full">
                  <IoLogOutOutline className="text-2xl"/>
                </span>
              </div>


          </div>
      </div> 
    )
}
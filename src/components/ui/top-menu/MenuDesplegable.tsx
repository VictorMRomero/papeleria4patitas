import { logout } from '@/actions';
import { getUser } from '@/config/token';
import { Category, User } from '@/interfaces';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoArrowBackOutline, IoArrowForwardOutline, IoCloseOutline, IoGridOutline, IoKeyOutline, IoLogInOutline, IoLogOutOutline, IoMenuOutline, IoMoonOutline, IoPersonOutline, IoReaderOutline, IoSunnyOutline } from 'react-icons/io5';

interface Props {
    categorias: Category[];
}

const MenuDesplegable = ({ categorias }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const[menuCategories, setMenuCategories] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
      // user 
    const user: User | null  = getUser()
    const isAuthenticated: Boolean = !!user;
    let isAdmin: Boolean = false;//(session?.user && (session.user as User).role === 'admin');
    
    if(user){
        isAdmin = user.roles.includes('admin'); 
    }

    const items = [
        {
          title: "Perfil",
          icon: <IoPersonOutline className="w-5 h-5"/>,
          color: "bg-indigo-300 dark:bg-indigo-800",
          onclick: () => {router.push('/profile'); setIsOpen(false);},
        },
        {
          title: theme === "light" ? "Dark theme" : "Light theme",
          icon: theme === "light" ? <IoMoonOutline className="w-5 h-5"/> : <IoSunnyOutline className="w-5 h-5"/>,
          color: "bg-teal-300 dark:bg-teal-800",
          onclick: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
        },
        {
            title: "Categorias",
            icon: <IoGridOutline className="w-5 h-5"/>,
            color: "bg-indigo-300 dark:bg-indigo-800",
            onclick: () => {setMenuCategories(true)},
        },
        {
          title: "Mis ordenes",
          icon: <IoReaderOutline className="w-5 h-5"/>,
          color: "bg-fuchsia-300 dark:bg-fuchsia-800",
          onclick: () => {
            router.push('/orders');
            setIsOpen(false);
          },
        },
        {
          title: "Logout",
          icon: <IoLogOutOutline className="w-5 h-5"/>,
          color: "bg-red-300 dark:bg-red-800",
          onclick: () => { logout() },
        },
      ];

      const adminItem = {
        title: "Administrador",
        icon: <IoKeyOutline className="w-5 h-5"/>,
        color: "bg-fuchsia-300 dark:bg-fuchsia-800",
        onclick: () => {router.push('/admin'); setIsOpen(false);},
    }

    if(isAdmin){
        items.push(adminItem);
    }

    const itemsNoAuth = [
        {
          title: "Iniciar Sesion",
          icon: <IoLogInOutline className="w-5 h-5"/>,
          color: "bg-indigo-300 dark:bg-indigo-800",
          onclick: () => {router.push('/auth/login')},
        },
        {
          title: theme === "light" ? "Dark theme" : "Light theme",
          icon: theme === "light" ? <IoMoonOutline className="w-5 h-5"/> : <IoSunnyOutline className="w-5 h-5"/>,
          color: "bg-teal-300 dark:bg-teal-800",
          onclick: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
        },
        {
            title: "Categorias",
            icon: <IoArrowForwardOutline className="w-5 h-5"/>,
            color: "bg-indigo-300 dark:bg-indigo-800",
            onclick: () => {setMenuCategories(true)},
        },
        
      ];



  return (
    <div className="relative">
      {/* Botón del menú */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className=" p-2"
        aria-label="Menú"
      >
        {
            (!isOpen) 
            ? <IoMenuOutline className='w-6 h-6 text-black dark:text-white' /> 
            : <IoCloseOutline className='w-6 h-6 text-red-400' />
        }
      </button>

      {/* Menú desplegable */}
      {isOpen && (

        <div className="absolute z-10 top-full left-0 w-64 bg-slate-200 dark:bg-gray-800 shadow-lg shadow-[rgba(0,_0,_0,_0.24)_0px_0px_40px] shadow-slate-400 rounded-lg overflow-hidden">

          {
            (isAuthenticated && !menuCategories) && (
                <ul className="divide-y dark:divide-gray-200 divide-gray-700">
                    {items.map((item) => (
                    <li
                        key={item.title}
                        className="p-4 flex items-center justify-start"
                        onClick={item.onclick}
                    >
                        <div
                        className={`w-8 h-8  flex items-center justify-center rounded-lg ${item.color}`}
                        >
                        <div className="w-3/5 text-gray-800 h-3/5 dark:text-gray-200">
                            {item.icon}
                        </div>
                        </div>
                        <p className="ml-5 text-gray-600 dark:text-gray-200">
                        {item.title}
                        </p>
                    </li>
                    ))}
                </ul>
            )
          }
          {
           (!isAuthenticated && !menuCategories) && (
                <ul className="divide-y dark:divide-gray-200 divide-gray-700 ">
                {itemsNoAuth.map((item) => (
                <li
                    key={item.title}
                    className="p-4 flex items-center"
                    onClick={item.onclick}
                >
                    <div
                    className={`w-8 h-8 mr-3 flex items-center justify-center rounded-lg ${item.color}`}
                    >
                    <div className="w-3/5 text-gray-800 h-3/5 dark:text-gray-200">
                        {item.icon}
                    </div>
                    </div>
                    <p className="ml-5 text-gray-600 dark:text-gray-200">
                    {item.title}
                    </p>
                </li>
                ))}
            </ul>
            )
          }
          {
            menuCategories && (
                <>
                    <ul className="divide-y dark:divide-gray-200 divide-gray-700">
                        <li 
                            key='regresar' 
                            className="p-4 flex items-center cursor-pointer dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-slate-600"
                            onClick={() => setMenuCategories(false)}
                        >

                            <div className={`w-8 h-8 mr-3 flex items-center justify-center rounded-lg bg-indigo-300 dark:bg-indigo-800`}>
                                <div className="w-3/5 text-gray-800 h-3/5 dark:text-gray-200">
                                    <IoArrowBackOutline className="w-5 h-5"/>
                                </div>
                            </div>
                            <p className="ml-5 text-gray-600 dark:text-gray-200">Regresar</p>
                        </li>
                        <li
                            key={"all"}
                            className="p-4 flex items-center cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600"
                            onClick={() => {setIsOpen(false); setMenuCategories(false)}}
                        >
                            <Link className="ml-5 text-gray-600 dark:text-gray-200" href={`/category/all`}>
                                Todos los productos
                            </Link>
                        </li>
                        <li
                            key={"ofertas"}
                            className="p-4 flex items-center cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600"
                            onClick={() => {setIsOpen(false); setMenuCategories(false)}}
                        >
                            <Link className="ml-5 text-red-600 " href={`/category/ofertas`}>
                                Ofertas
                            </Link>
                        </li>
                        {categorias.map((categoria) => (
                            <li
                                key={categoria.title}
                                className="p-4 flex items-center cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600"
                                onClick={() => {setIsOpen(false); setMenuCategories(false)}}
                            >
                                <Link className="ml-5 text-gray-600 dark:text-gray-200" href={`/category/${categoria.title}`}>
                                    {categoria.title}
                                </Link>
                            </li>
                        ))}

                    </ul>
                </>
            )
          }


        </div>
      )}
    </div>
  );
};

export default MenuDesplegable;
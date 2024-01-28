'use client'
import { logout } from '@/actions'
import { useUIStore } from '@/store'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import {IoCloseOutline, IoLogIn, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoPricetagOutline, IoSearchOutline, IoShirtOutline, IoStorefrontOutline, IoTicketOutline} from 'react-icons/io5'
import { User } from '@/interfaces'


export const Sidebar = () => {
    const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen);
    const closeMenu = useUIStore(state => (state.closeSideMenu));
    

    const {data: session} = useSession();

    const isAuthenticated = !!session?.user;

    const isAdmin = (session?.user && (session.user as User).role === 'admin');
    




  return (
    <div>
        {/* blackgroud black */}
        {
            isSideMenuOpen && (
                
                <div 
                    className="fixed sm:top-0 sm:left-0 sm:w-screen sm:h-screen z-10 bg-black opacity-30" 
                />
            )
        }
        {/* blur */}
        {
            isSideMenuOpen && (

                <div 
                    className="hidden fade-in sm:fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm" 
                />
            )
        }


        <nav 
            className={
                clsx(
                    "fixed p-5 right-0 top-0 w-full sm:w-[500px] h-screen bg-gray-200 z-20 shadow-2xl transform transition-all duration-300",
                    {
                        "translate-x-full": !isSideMenuOpen
                    }
                    
                )
            }
        >
            <IoCloseOutline 
                size={50}
                className="absolute top-5 right-5 cursor-pointer text-red-500 "
                onClick={() => closeMenu()}
            />







            {
                isAuthenticated && (

                    <>
                        <Link
                            href='/profile'
                            onClick={() => closeMenu()}
                            className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'    
                        >
                            <IoPersonOutline size={30} />
                            <span className="ml-3 text-xl">Perfil</span>
                        </Link>
            
                        <Link
                            href='/orders'
                            onClick={() => closeMenu()}
                            className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'    
                        >
                            <IoTicketOutline size={30} />
                            <span className="ml-3 text-xl">Ordenes</span>
                        </Link>

                        <button
                            className='w-full flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'    
                            onClick={() => logout()}
                            
                        >
                        
                            <IoLogOutOutline size={30} />
                            <span className="ml-3 text-xl">Salir</span>
                        
                        </button>

                    </>
                )

                

            }
            {
                !isAuthenticated && (
                    <>
                    

                        
                        <Link
                            href='/auth/login'
                            className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'    
                            onClick={() => closeMenu()}
                        >
                        
                            <IoLogIn size={30} />
                            <span className="ml-3 text-xl">Ingresar</span>
                        
                        </Link>
                    </>


                )
            }

            {isAdmin && (
                <>
                
                    <div className="w-full h-px bg-gray-200 my-10" />

                    <Link
                        href='/admin/products'
                        onClick={() => closeMenu()}
                        className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'    
                    >
                        <IoShirtOutline size={30} />
                        <span className="ml-3 text-xl">Products</span>
                    </Link>

                    <Link
                        href='/admin/orders'
                        onClick={() => closeMenu()}
                        className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'    
                    >
                        <IoTicketOutline size={30} />
                        <span className="ml-3 text-xl">Ordenes</span>
                    </Link>

                    <Link
                        href='/admin/users'
                        onClick={() => closeMenu()}
                        className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'    
                    >
                        <IoPeopleOutline size={30} />
                        <span className="ml-3 text-xl">Clientes</span>
                    </Link>
                    <Link
                        href='/admin/ventas'
                        onClick={() => closeMenu()}
                        className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'    
                    >
                        <IoStorefrontOutline size={30} />
                        <span className="ml-3 text-xl">Vender</span>
                    </Link>
                    <Link
                        href='/admin/sales'
                        onClick={() => closeMenu()}
                        className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'    
                    >
                        <IoPricetagOutline size={30} />
                        <span className="ml-3 text-xl">Ventas</span>
                    </Link>
                
                </>
            )}




        </nav>
        
    </div>
  )
}

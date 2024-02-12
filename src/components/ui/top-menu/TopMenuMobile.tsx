'use client'


import { titleFont } from "@/config/fonts"
import { useCartStore, useUIStore } from "@/store";
import Image from "next/image";
import Link from "next/link"

import { useEffect, useState } from "react";
import { IoCartOutline, IoMenuOutline, IoOptionsOutline } from 'react-icons/io5'
import { SearchBar } from "./SearchBar";
import clsx from "clsx";

interface Props {

    className?: string;
}



export const TopMenuMobile = ({ className }: Props) => {
    const [menuOpen, setMenuOpen] = useState(true);


    const openSideMenu = useUIStore(state => (state.openSideMenu));
    const totalItemsInCart = useCartStore(state => state.getTotalItems())

    const [loaded, setLoaded] = useState(true);



    useEffect(() => {
        setLoaded(true);
    }, [])

    return (
        <div className={className}>

            <nav className=" flex px-5 justify-between items-center w-full  pl-2 pr-2 bg-gray-700">
                <Link href="/">
                    <div className="flex items-center">

                        <Image
                            src="https://res.cloudinary.com/dog6zhxr8/image/upload/v1705889836/ucdj2aqkkenh4jus1aoh.png"

                            alt="logo"
                            width={60}
                            height={60}
                            className="p-1 flex"
                        />


                    </div>
                </Link>

                <SearchBar />


            </nav >

            <nav className="bg-gray-300 border-gray-700">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
                    <button type="button" onClick={() => setMenuOpen(!menuOpen)} className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-hamburger" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <IoMenuOutline size={30} />
                    </button>


                    <div className="inline-flex items-center justify-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 ">

                        <Link href={
                            (totalItemsInCart === 0 && loaded)
                                ? '/empty'
                                : '/cart'
                        }
                            className="mx-2 rounded-md ">
                            <div className="relative">
                                {(loaded && totalItemsInCart > 0) && (
                                    <span className="fade-in absolute text-xs rounded-full px-1 font-bold -top-2 bg-blue-700 text-white -right-2">
                                        {totalItemsInCart}
                                    </span>
                                )}

                                <IoCartOutline className="w-6 h-6" />
                            </div>
                        </Link>

                        <button
                            className={`${titleFont.className} antialiased rounded-md  transition-all hover:bg-yellow-200 text-xl`}
                            onClick={() => openSideMenu()}
                        >
                            <IoOptionsOutline className='' size={30} />
                        </button>


                    </div >

                     
              
                    <div className={
                        clsx(
                            "w-full",
                            {
                                "hidden": menuOpen,
                            })
                    } id="navbar-hamburger">
                        <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-300  border-gray-700">
                            <Link onClick={() => setMenuOpen(true)} className="m-2 p-2 rounded-[50px] transition-all hover:bg-red-400 items-center flex" href='/search?productSearch=Amor'>
                            <svg className="w-[20px] h-[20px] text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z" />
                            </svg>


                            <span className={`${titleFont.className} antialiased font-semibold`}>Amor y Amistad</span>
                        </Link> 
                            <Link onClick={() => setMenuOpen(true)} className="rounded-md transition-all  items-center flex" href='/category/all'>
                                <span className={`${titleFont.className} block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 focus:bg-gray-200`}>Todos los Productos</span>
                            </Link>
                            <Link onClick={() => setMenuOpen(true)} className="rounded-md transition-all  items-center flex" href='/category/ofertas'>
                                <span className={`${titleFont.className} block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 focus:bg-gray-200`}>Ofertas</span>
                            </Link>
                            <Link onClick={() => setMenuOpen(true)} className="rounded-md transition-all  items-center flex" href='/category/arte'>

                                <span className={`${titleFont.className} block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 focus:bg-gray-200`}>Arte</span>
                            </Link>
                            <Link onClick={() => setMenuOpen(true)} className="rounded-md transition-all  items-center flex" href='/category/cuadernos'>

                                <span className={`${titleFont.className} block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 focus:bg-gray-200`}>Cuadernos</span>
                            </Link>
                            <Link onClick={() => setMenuOpen(true)} className="rounded-md transition-all  items-centear flex" href='/category/belleza'>

                                <span className={`${titleFont.className} block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 focus:bg-gray-200`}>Belleza</span>
                            </Link>
                            <Link onClick={() => setMenuOpen(true)} className="rounded-md transition-all  items-center flex" href='/category/regalos'>

                                <span className={`${titleFont.className} block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 focus:bg-gray-200`}>Regalos</span>
                            </Link>
                            <Link onClick={() => setMenuOpen(true)} className="rounded-md transition-all  items-center flex" href='/category/electronica'>

                                <span className={`${titleFont.className} block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 focus:bg-gray-200`}>Electronica</span>
                            </Link>
                            <Link onClick={() => setMenuOpen(true)} className="rounded-md transition-all  items-center flex" href='/category/escolar'>

                                <span className={`${titleFont.className} block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 focus:bg-gray-200`}>Escolar</span>
                            </Link>
                            <Link onClick={() => setMenuOpen(true)} className="rounded-md transition-all  items-center flex" href='/category/fiesta'>

                                <span className={`${titleFont.className} block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 focus:bg-gray-200`}>Fiesta</span>
                            </Link>
                            <Link onClick={() => setMenuOpen(true)} className="rounded-md transition-all  items-center flex" href='/category/juguetes'>

                                <span className={`${titleFont.className} block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 focus:bg-gray-200`}>Juguetes</span>
                            </Link>
                            <Link onClick={() => setMenuOpen(true)} className="rounded-md transition-all  items-center flex" href='/category/oficina'>

                                <span className={`${titleFont.className} block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 focus:bg-gray-200`}>Oficina</span>
                            </Link>
                            <Link onClick={() => setMenuOpen(true)} className="rounded-md transition-all  items-center flex" href='/category/papel'>

                                <span className={`${titleFont.className} block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 focus:bg-gray-200`}>Papel</span>
                            </Link>
                            <Link onClick={() => setMenuOpen(true)} className="rounded-md transition-all  items-center flex" href='/category/ropa'>

                                <span className={`${titleFont.className} block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 focus:bg-gray-200`}>Ropa</span>
                            </Link>
                            <Link onClick={() => setMenuOpen(true)} className="rounded-md transition-all  items-center flex" href='/category/joyeria'>

                                <span className={`${titleFont.className} block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 focus:bg-gray-200`}>Joyeria</span>
                            </Link>

                        </ul>
                    </div>
                </div>




            </nav>







        </div>
    )
}
'use client'


import { titleFont } from "@/config/fonts"
import { useCartStore, useUIStore } from "@/store";
import Image from "next/image";
import Link from "next/link"

import { useEffect, useState } from "react";
import { IoCartOutline, IoMenuOutline, IoOptionsOutline } from 'react-icons/io5'
import { SearchBar } from "./SearchBar";
import clsx from "clsx";
import { Category } from "@/interfaces";

interface Props {

    className?: string;
    categorias: Category[];
}



export const TopMenuMobile = ({ className, categorias }: Props) => {
    const [menuOpen, setMenuOpen] = useState(true);
    const openSideMenu = useUIStore(state => (state.openSideMenu));
    const totalItemsInCart = useCartStore(state => state.getTotalItems())

    const [loaded, setLoaded] = useState(true);



    useEffect(() => {
        setLoaded(true);
    }, [])

    return (
        <div className={className}>

            <nav className="flex items-center justify-between w-full px-2 text-white dark:bg-gray-900 bg-indigo-900">
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

            <nav className="dark:bg-gray-700 shadow-custom-bottom shadow-slate-200 dark:shadow-slate-800">
                <div className="flex flex-wrap items-center justify-between mx-auto p-2">
                    <button type="button" onClick={() => setMenuOpen(!menuOpen)} className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-hamburger" aria-expanded="false">
                        <IoMenuOutline className="text-2xl" />
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

                                <IoCartOutline className="text-2xl" />
                            </div>
                        </Link>

                        <button
                            className={`${titleFont.className} antialiased rounded-md  transition-all hover:bg-yellow-200 text-xl`}
                            onClick={() => openSideMenu()}
                        >
                            <IoOptionsOutline className='text-2xl'  />
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
                            <Link onClick={() => setMenuOpen(true)} className="rounded-md transition-all  items-center flex" href='/category/all'>
                                <span className={`${titleFont.className} block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 focus:bg-gray-200`}>Todos los Productos</span>
                            </Link>
                            <Link onClick={() => setMenuOpen(true)} className="rounded-md transition-all  items-center flex" href='/category/ofertas'>
                                <span className={`${titleFont.className} block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 focus:bg-gray-200`}>Ofertas</span>
                            </Link>
                            {
                                categorias.map((categoria) => (
                                    <Link onClick={() => setMenuOpen(true)} className="rounded-md transition-all  items-center flex" href='/category/ofertas'>
                                        <span className={`${categoria.title} block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 focus:bg-gray-200`}>{categoria.title}</span>
                                    </Link>
                                ))
                            }

                        </ul>
                    </div>
                </div>




            </nav>







        </div>
    )
}
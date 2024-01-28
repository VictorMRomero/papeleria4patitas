'use client'


import { titleFont } from "@/config/fonts"
import { useCartStore, useUIStore } from "@/store";
import Image from "next/image";
import Link from "next/link"

import { useEffect, useState } from "react";
import { IoCartOutline, IoMenuOutline } from 'react-icons/io5'
import { SearchBar } from "./SearchBar";
import clsx from "clsx";

interface Props {

    className?: string;
}



export const TopMenuMobile = ({ className }: Props) => {
    const [menuOpen, setMenuOpen] = useState(false);


    const openSideMenu = useUIStore(state => (state.openSideMenu));
    const totalItemsInCart = useCartStore(state => state.getTotalItems())

    const [loaded, setLoaded] = useState(true);



    useEffect(() => {
        setLoaded(true);
    }, [])

    return (
        <div className={className}>

            <nav className=" flex px-5 justify-between items-center w-full sm:pl-[300px] sm:pr-[300px] pl-2 pr-2 bg-gray-700">
                <SearchBar />

                
            </nav >

            <nav className="border-gray-200 bg-gray-300 dark:border-gray-700">
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
                            <IoMenuOutline className='' size={30}/>
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
                            <Link  href='/'>
                                <span className={`${titleFont.className} block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 focus:bg-gray-200`}>Inicio</span>
                            </Link>
                            <Link  href='/category/papeleria'>
                                <span className={`${titleFont.className} block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 focus:bg-gray-200`}>Papeleria</span>
                            </Link>
                            <Link className="rounded-md transition-all hover:bg-blue-100 items-center flex" href='/category/juguetes'>

                                <span className={`${titleFont.className} block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 focus:bg-gray-200`}>Juguetes</span>
                            </Link>
                            <Link className="rounded-md transition-all hover:bg-blue-100 items-center flex" href='/category/belleza'>

                                <span className={`${titleFont.className} block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 focus:bg-gray-200`}>Belleza</span>
                            </Link>
                            <Link className="rounded-md transition-all hover:bg-blue-100 items-center flex" href='/category/regalos'>

                                <span className={`${titleFont.className} block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 focus:bg-gray-200`}>Regalos</span>
                            </Link>
                            <Link className="rounded-md transition-all hover:bg-blue-100 items-center flex" href='/category/tecnologia'>

                                <span className={`${titleFont.className} block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 focus:bg-gray-200`}>Tecnologia</span>
                            </Link>

                        </ul>
                    </div>
                </div>




            </nav>







        </div>
    )
}
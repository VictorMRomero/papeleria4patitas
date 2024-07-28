'use client'


import { titleFont } from "@/config/fonts"
import { useCartStore, useUIStore } from "@/store";
import Image from "next/image";
import Link from "next/link"

import { useEffect, useState } from "react";
import { IoCartOutline, IoMenuOutline } from 'react-icons/io5'
import { SearchBar } from "./SearchBar";

import './style.css'
import clsx from "clsx";

interface Props {

    className?: string;
}


export const TopMenu = ({ className }: Props) => {


    const openSideMenu = useUIStore(state => (state.openSideMenu));
    const totalItemsInCart = useCartStore(state => state.getTotalItems())
    const [menuOpen, setMenuOpen] = useState(true);
    const [loaded, setLoaded] = useState(false);



    useEffect(() => {
        setLoaded(true);
        setMenuOpen(true);
    }, [])

    return (
        <div className={className}>

            <nav className=" flex px-5 justify-between items-center w-full xl:pl-[300px] xl:pr-[300px] pl-2 pr-2 text-white bg-gray-700">
                <div className="  flex intems-center">

                    <Link href="/">
                        <div className="flex items-center">

                            <Image
                                src="https://res.cloudinary.com/dog6zhxr8/image/upload/v1705889836/ucdj2aqkkenh4jus1aoh.png"

                                alt="logo"
                                width={80}
                                height={80}
                                className="mr-2 hidden sm:flex"
                            />

                            <span className={`flex antialiased font-bold text-xl`}> Papelería 4 patitas</span>
                        </div>
                    </Link>
                </div>


                <SearchBar />

                <div className="flex items-center">

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
                        className={`${titleFont.className} antialiased m-2 p-2 rounded-md  transition-all hover:bg-yellow-200 text-xl`}
                        onClick={() => openSideMenu()}
                    >
                        <IoMenuOutline className='' size={30} />
                    </button>


                </div >
            </nav >
            {/* <ListCategory/> */}

            <nav className="flex pl-[300px] px-5 w-full bg-gray-300">

                <div className="flex">

                    <Link className="m-2 p-2 rounded-[50px] transition-all hover:bg-blue-400 items-center flex" href='/category/all'>
                        <svg className="w-[38px] h-[38px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M9 8h10M9 12h10M9 16h10M5 8h0m0 4h0m0 4h0" />
                        </svg>


                        <span className={`${titleFont.className} antialiased font-semibold`}>Todos</span>
                    </Link>
                    <Link className="m-2 p-2 rounded-[50px] transition-all hover:bg-red-100 items-center flex text-red-500" href='/category/ofertas'>
                        <svg className="w-[30px] h-[30px] " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18 3h-5.7a2 2 0 0 0-1.4.6L3.6 11a2 2 0 0 0 0 2.8l6.6 6.6a2 2 0 0 0 2.8 0l7.4-7.5a2 2 0 0 0 .6-1.4V6a3 3 0 0 0-3-3Zm-2.4 6.4a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                        </svg>

                        <span className={`${titleFont.className} antialiased`}>Ofertas</span>
                    </Link>

                </div>


            </nav >

        </div >
    )
}
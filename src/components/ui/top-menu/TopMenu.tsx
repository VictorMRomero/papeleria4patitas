'use client'


import { titleFont } from "@/config/fonts"
import { useCartStore, useUIStore } from "@/store";
import Image from "next/image";
import Link from "next/link"

import { useEffect, useState } from "react";
import { IoCartOutline, IoMenuOutline } from 'react-icons/io5'
import { SearchBar } from "./SearchBar";



export const TopMenu = () => {


    const openSideMenu = useUIStore(state => (state.openSideMenu));
    const totalItemsInCart = useCartStore(state => state.getTotalItems())

    const [loaded, setLoaded] = useState(false);

    
    
    useEffect(() => {
        setLoaded(true);
    }, [])

    return (
        <>

            <nav className=" flex px-5 justify-between items-center w-full sm:pl-[300px] sm:pr-[300px] pl-2 pr-2 bg-gray-300">
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

                            <span className={`${titleFont.className} flex antialiased font-bold text-xl`}> Papeleria 4 patitas</span>
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
                        <IoMenuOutline className='' size={30}/>
                    </button>


                </div >
            </nav >

            <nav className="flex px-5 items-center text-white justify-center  w-full bg-gray-600 mb-10">

                <div className="hidden sm:flex justify-center ">
                    <Link className="m-2 p-2 rounded-md transition-all hover:bg-blue-100 items-center flex" href='/category/papeleria'>

                        <span className={`${titleFont.className} antialiased font-semibold`}>Papeleria</span>
                    </Link>
                    <Link className="m-2 p-2 rounded-md transition-all hover:bg-blue-100 items-center flex" href='/category/juguetes'>

                        <span className={`${titleFont.className} antialiased`}>Juguetes</span>
                    </Link>
                    <Link className="m-2 p-2 rounded-md transition-all hover:bg-blue-100 items-center flex" href='/category/belleza'>

                        <span className={`${titleFont.className} antialiased`}>Belleza</span>
                    </Link>
                    <Link className="m-2 p-2 rounded-md transition-all hover:bg-blue-100 items-center flex" href='/category/regalos'>

                        <span className={`${titleFont.className} antialiased`}>Regalos</span>
                    </Link>
                    <Link className="m-2 p-2 rounded-md transition-all hover:bg-blue-100 items-center flex" href='/category/tecnologia'>

                        <span className={`${titleFont.className} antialiased`}>Tecnologia</span>
                    </Link>

                </div>

            </nav>




            


        </>
    )
}
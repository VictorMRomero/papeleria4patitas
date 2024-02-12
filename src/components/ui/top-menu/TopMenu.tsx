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

                    <button className={clsx(
                        "m-2 p-2 rounded-[50px] transition-all hover:bg-gray-400 items-center flex",
                        {
                            "bg-gray-500": !menuOpen,
                        })}
                        onClick={() => setMenuOpen(!menuOpen)}>
                        <svg className="w-[30px] h-[30px] text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M4.9 3C3.9 3 3 3.8 3 4.9V9c0 1 .8 1.9 1.9 1.9H9c1 0 1.9-.8 1.9-1.9V5c0-1-.8-1.9-1.9-1.9H5Zm10 0c-1 0-1.9.8-1.9 1.9V9c0 1 .8 1.9 1.9 1.9H19c1 0 1.9-.8 1.9-1.9V5c0-1-.8-1.9-1.9-1.9h-4Zm-10 10c-1 0-1.9.8-1.9 1.9V19c0 1 .8 1.9 1.9 1.9H9c1 0 1.9-.8 1.9-1.9v-4c0-1-.8-1.9-1.9-1.9H5Zm10 0c-1 0-1.9.8-1.9 1.9V19c0 1 .8 1.9 1.9 1.9H19c1 0 1.9-.8 1.9-1.9v-4c0-1-.8-1.9-1.9-1.9h-4Z" clip-rule="evenodd" />
                        </svg>
                        Categorias
                    </button>

                    <Link className="m-2 p-2 rounded-[50px] transition-all hover:bg-red-400 items-center flex" href='/search?productSearch=Amor'>
                        <svg className="w-[30px] h-[30px] text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z" />
                        </svg>


                        <span className={`${titleFont.className} antialiased font-semibold`}>Amor y Amistad</span>
                    </Link>



                </div>


            </nav >


            <div className={
                clsx(
                    "card w-full xl:pl-[300px] xl:pr-[300px]  grid grid-cols-6 gap-2 pl-4 pr-4 mb-10 mt-10",
                    {
                        "hidden": menuOpen,
                    })
            }>

                <Link href='/category/escolar' onClick={() => setMenuOpen(true)} className="social-link2">

                    <svg className=" text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m10.8 17.8-6.4 2.1 2.1-6.4m4.3 4.3L19 9a3 3 0 0 0-4-4l-8.4 8.6m4.3 4.3-4.3-4.3m2.1 2.1L15 9.1m-2.1-2 4.2 4.2" />
                    </svg>
                    <p className="text-lg text-black">Escolar</p>
                </Link>
                <Link href='/category/regalos' onClick={() => setMenuOpen(true)} className="social-link1">
                    <svg className="text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21v-9m3-4H7.5a2.5 2.5 0 1 1 0-5c1.5 0 2.9 1.3 3.9 2.5M14 21v-9m-9 0h14v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8ZM4 8h16a1 1 0 0 1 1 1v3H3V9a1 1 0 0 1 1-1Zm12.2-5c-3 0-5.5 5-5.5 5h5.5a2.5 2.5 0 0 0 0-5Z" />
                    </svg>
                    <p className="text-lg text-black">Regalos</p>

                </Link>
                <Link href='/category/arte' onClick={() => setMenuOpen(true)} className="social-link3">
                    <svg className=" text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 7h0m3.5 1.5h0m-7 0h0M7 12h0m9 4h2.7a2 2 0 0 0 1.9-1.3 9 9 0 1 0-16 2.5A9.1 9.1 0 0 0 12 21a2 2 0 0 0 2-2v-.9a2 2 0 0 1 2-2.1Z" />
                    </svg>
                    <p className="text-lg text-black">Arte y Manualidades</p>

                </Link>
                <Link href='/category/cuadernos' onClick={() => setMenuOpen(true)} className="social-link4">
                    <svg className="text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19V4c0-.6.4-1 1-1h12c.6 0 1 .4 1 1v13H7a2 2 0 0 0-2 2Zm0 0c0 1.1.9 2 2 2h12M9 3v14m7 0v4" />
                    </svg>
                    <p className="text-lg text-black">Cuadernos</p>
                </Link>
                <Link href='/category/electronica' onClick={() => setMenuOpen(true)} className="social-link5">
                    <svg className=" text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 15h12M6 6h12m-6 12h0m-5 3h10c.6 0 1-.4 1-1V4c0-.6-.4-1-1-1H7a1 1 0 0 0-1 1v16c0 .6.4 1 1 1Z" />
                    </svg>
                    <p className="text-lg text-black">Electrónica</p>
                </Link>
                <Link href='/category/fiesta' onClick={() => setMenuOpen(true)} className="social-link6">
                    <svg className=" text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-width="2" d="M11 5.1a1 1 0 0 1 2 0l1.7 4c.1.4.4.6.8.6l4.5.4a1 1 0 0 1 .5 1.7l-3.3 2.8a1 1 0 0 0-.3 1l1 4a1 1 0 0 1-1.5 1.2l-3.9-2.3a1 1 0 0 0-1 0l-4 2.3a1 1 0 0 1-1.4-1.1l1-4.1c.1-.4 0-.8-.3-1l-3.3-2.8a1 1 0 0 1 .5-1.7l4.5-.4c.4 0 .7-.2.8-.6l1.8-4Z" />
                    </svg>

                    <p className="text-lg text-black">Fiesta</p>
                </Link>
                <Link href='/category/juguetes' onClick={() => setMenuOpen(true)} className="social-link7">
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#000" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.6 4.6c1.2 1.5 2 3.4 2 5.3-2-.4-4-.4-6-.2l-.2-.5-.6-1.2c1.9-.7 3.5-1.9 4.8-3.4ZM10 3.7l2-.2c2 0 4.1.7 5.7 2.1a9.6 9.6 0 0 1-4.5 3.1c-1-1.7-2-3.4-3.2-5Zm-6.4 6.6a8.6 8.6 0 0 1 4.8-6 54 54 0 0 1 3.1 5 32 32 0 0 1-7.9 1Zm2 7.4a8.5 8.5 0 0 1-2-5.7v-.2c3 0 5.9-.5 8.7-1.3L13 12h-.3a14.5 14.5 0 0 0-7 5.7Zm6.4 2.9c-1.9 0-3.7-.7-5.2-1.8a11.7 11.7 0 0 1 6.7-5.4c.8 2.1 1.4 4.3 1.8 6.5-1 .4-2.2.7-3.3.7Zm4.8-1.5c-.4-2-1-4.1-1.7-6.1 1.8-.3 3.6-.1 5.3.4a8.6 8.6 0 0 1-3.6 5.7Z" clip-rule="evenodd" />
                    </svg>

                    <p className="text-lg text-black">Juguetes</p>
                </Link>
                <Link href='/category/oficina' onClick={() => setMenuOpen(true)} className="social-link8">
                    <svg className=" text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 13h3.4a1 1 0 0 1 1 .6 4 4 0 0 0 7.3 0 1 1 0 0 1 .9-.6H20M4 13v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6M4 13l2-9h12l2 9" />
                    </svg>

                    <p className="text-lg text-black">Oficina</p>
                </Link>
                <Link href='/category/papel' onClick={() => setMenuOpen(true)} className="social-link1">
                    <svg className="text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M10 3v4c0 .6-.4 1-1 1H5m14-4v16c0 .6-.4 1-1 1H6a1 1 0 0 1-1-1V8c0-.4.1-.6.3-.8l4-4 .6-.2H18c.6 0 1 .4 1 1Z" />
                    </svg>

                    <p className="text-lg text-black">Papel</p>
                </Link>
                <Link href='/category/ropa' onClick={() => setMenuOpen(true)} className="social-link2">
                    <svg className="text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.6 8.4h0m-4.7 11.3-6.6-6.6a1 1 0 0 1 0-1.4l7.3-7.4a1 1 0 0 1 .7-.3H18a2 2 0 0 1 2 2v5.5a1 1 0 0 1-.3.7l-7.5 7.5a1 1 0 0 1-1.3 0Z" />
                    </svg>
                    <p className="text-lg text-black">Ropa</p>
                </Link>
                <Link href='/category/belleza' onClick={() => setMenuOpen(true)} className="social-link3">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="96" height="96" viewBox="0 0 64 64">
                        <path d="M 32 9 C 19.25 9 9 17.622 9 44 C 12.322 48.56 18 51 22 51 L 23.8125 51 C 26.234185 53.334695 29.13919 55 32 55 C 34.86081 55 37.765815 53.334695 40.1875 51 L 42 51 C 46 51 51.678 48.56 55 44 C 55 17.549 44.75 9 32 9 z M 32 13 C 37.729 13 42.014562 14.964812 45.101562 19.007812 C 48.853562 23.921812 50.833234 31.853703 50.990234 42.595703 C 48.933983 44.855463 45.999859 46.337018 43.574219 46.816406 C 45.070034 44.424433 46 41.917917 46 39.914062 L 46 32 C 40.178 28.447 37 22 37 22 C 35.812 25.976 32.644 32.999719 18 33.386719 L 18 39.914062 C 18 41.917917 18.929966 44.424433 20.425781 46.816406 C 18.000141 46.337018 15.066017 44.855463 13.009766 42.595703 C 13.167766 31.878703 15.147391 23.957203 18.900391 19.033203 C 21.995391 14.974203 26.28 13 32 13 z M 37.4375 29.728516 C 38.6805 31.200516 40.204 32.744469 42 34.105469 L 42 39.914062 C 42 43.485063 36.398 51 32 51 C 27.602 51 22 43.485062 22 39.914062 L 22 37.117188 C 28.941 36.317188 34.1035 33.844516 37.4375 29.728516 z"></path>
                    </svg>
                    <p className="text-lg text-black">Belleza</p>
                </Link>
                <Link href='/category/joyeria' onClick={() => setMenuOpen(true)} className="social-link3">
                    <svg className="text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 1 12c0 .5-.5 1-1 1H6a1 1 0 0 1-1-1L6 8h12Z" />
                    </svg>
                    <p className="text-lg text-black">Joyeria</p>
                </Link>


            </div>




        </div >
    )
}
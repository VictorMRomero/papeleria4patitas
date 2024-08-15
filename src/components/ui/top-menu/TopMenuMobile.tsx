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
import MenuDesplegable from "./MenuDesplegable";

interface Props {

    className?: string;
    categorias: Category[];
}



export const TopMenuMobile = ({ className, categorias }: Props) => {

    const totalItemsInCart = useCartStore(state => state.getTotalItems())

    const [loaded, setLoaded] = useState(true);



    useEffect(() => {
        setLoaded(true);
    }, [])

    return (
        <div className={className}>
            <nav className={`${className} dark:bg-gray-900 bg-indigo-900 text-white p-2 flex items-center justify-between w-full`}>
                {/* Botón de menú */}
                <MenuDesplegable categorias={categorias}/>


                <Link href={
                    (totalItemsInCart === 0 && loaded)
                        ? '/empty'
                        : '/cart'
                    }
                        className="p-2">
                    <div className="relative">
                        {(loaded && totalItemsInCart > 0) && (
                            <span className="fade-in absolute text-xs rounded-full px-1 font-bold -top-2 bg-blue-700 text-white -right-2">
                                {totalItemsInCart}
                            </span>
                        )}

                        <IoCartOutline className="w-6 h-6" />
                    </div>
                </Link>

                <SearchBar />

            </nav>
        </div>
    )
}
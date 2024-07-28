"use client"

import { useTheme } from "next-themes";
import Image from "next/image"
import Link from "next/link"
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";


export const TopMenuCredentials = () => {

    const { theme, setTheme } = useTheme();

    return (
        <nav className="flex items-center justify-between w-full px-2 text-white dark:bg-gray-700 bg-gray-600 xl:px-[300px]">
            
            <div className="flex intems-center">

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
            <button 
                id="themeToggle" 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="antialiased m-2 p-2 rounded-md  transition-all hover:bg-blue-200 text-xl"
            >
                {
                    (theme === 'dark') 
                    ? <IoSunnyOutline className='' size={30} /> 
                    : <IoMoonOutline className='' size={30} /> 
                }
                

            </button>
        </nav>
    )
}
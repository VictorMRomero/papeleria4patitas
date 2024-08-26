'use client'

import { logout } from "@/actions";
import { ProductImage } from "@/components/producto/product-image/ProductImage";
import { getUser } from "@/config/token";
import { Category, User } from "@/interfaces";
import { useCartStore, useUIStore } from "@/store";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoCartOutline, IoKeyOutline, IoLogInOutline, IoLogOutOutline, IoMoonOutline, IoPersonOutline, IoPricetag, IoReaderOutline, IoSunnyOutline } from 'react-icons/io5';
import { SearchBar } from "./SearchBar";

interface Props {
    className?: string;
    categorias: Category[];
}


export const TopMenu = ({ className, categorias }: Props) => {

    const totalItemsInCart = useCartStore(state => state.getTotalItems())
    const [loaded, setLoaded] = useState(false);
    const { theme, setTheme } = useTheme();
    const router = useRouter();
    const productsInCart = useCartStore(state => state.cart);
    // user 
    const user: User | null = getUser()
    const isAuthenticated: Boolean = !!user;
    let isAdmin: Boolean = false;//(session?.user && (session.user as User).role === 'admin');

    if (user) {
        isAdmin = user.roles.includes('admin');
    }

    const items = [
        {
            title: "Perfil",
            icon: <IoPersonOutline className="text-2xl" />,
            color: "bg-indigo-300 dark:bg-indigo-800",
            onclick: () => { router.push('/profile') },
        },
        {
            title: theme === "light" ? "Dark theme" : "Light theme",
            icon: theme === "light" ? <IoMoonOutline className="text-2xl" /> : <IoSunnyOutline className="text-2xl" />,
            color: "bg-teal-300 dark:bg-teal-800",
            onclick: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
        },
        {
            title: "Mis ordenes",
            icon: <IoReaderOutline className="text-2xl" />,
            color: "bg-fuchsia-300 dark:bg-fuchsia-800",
            onclick: () => { router.push('/orders') },
        },
        {
            title: "Logout",
            icon: <IoLogOutOutline className="text-2xl" />,
            color: "bg-red-300 dark:bg-red-800",
            onclick: () => { logout() },
        },
    ];

    const adminItem = {
        title: "Administrador",
        icon: <IoKeyOutline className="text-2xl" />,
        color: "bg-fuchsia-300 dark:bg-fuchsia-800",
        onclick: () => { router.push('/admin') },
    }

    if (isAdmin) {
        items.push(adminItem);
    }

    const itemsNoAuth = [
        {
            title: "Iniciar Sesion",
            icon: <IoLogInOutline className="text-2xl" />,
            color: "bg-indigo-300 dark:bg-indigo-800",
            onclick: () => { router.push('/auth/login') },
        },
        {
            title: theme === "light" ? "Dark theme" : "Light theme",
            icon: theme === "light" ? <IoMoonOutline className="text-2xl" /> : <IoSunnyOutline className="text-2xl" />,
            color: "bg-teal-300 dark:bg-teal-800",
            onclick: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
        },
    ];


    useEffect(() => {
        setLoaded(true);
    }, [])

    return (
        <div className={className}>

            <nav className=" flex px-5 justify-between items-center w-full xl:pl-[150px] xl:pr-[150px] 2xl:pl-[300px] 2xl:pr-[300px] pl-2 pr-2 text-white dark:bg-gray-900 bg-indigo-900">
                <div className="flex intems-center">

                    <Link href="/">
                        <div className="flex items-center">

                            <Image
                                src="https://res.cloudinary.com/dog6zhxr8/image/upload/v1724631720/Ads/lxjh61k2mjrtxyoh3qtb.png"

                                alt="logo"
                                width={300}
                                height={80}
                                className="mr-2 hidden sm:flex"
                            />
                        </div>
                    </Link>
                </div>


                <SearchBar />

                <div className="flex items-center ">

                    <Link href={
                        (totalItemsInCart === 0 && loaded)
                            ? '/empty'
                            : '/cart'
                    }
                        className="mx-2 rounded-md relative group">
                        <div className="relative">
                            {(loaded && totalItemsInCart > 0) && (
                                <span className="fade-in absolute text-xs rounded-full px-1 font-bold -top-2 bg-blue-700 text-white -right-2">
                                    {totalItemsInCart}
                                </span>
                            )}

                            <IoCartOutline className="w-6 h-6" />
                        </div>

                       
                            {(loaded && totalItemsInCart > 0) && (
                                <ul className="z-10 absolute w-72 p-2 bg-slate-200 dark:bg-gray-900 shadow-[rgba(0,_0,_0,_0.24)_0px_0px_40px] shadow-slate-400 dark:shadow-slate-700 hidden md:group-hover:flex flex-col -left-[8em] rounded-xl ">
{                                productsInCart.map((item) => (

                                    <li
                                        key={item.title}
                                        className="flex items-center justify-start h-16 font-bold cursor-pointer hover:bg-slate-400 dark:hover:bg-slate-800 rounded-xl"
                                    >
                                        <ProductImage
                                            src={item.image}
                                            width={100}
                                            height={100}

                                            alt={item.title}
                                            className="h-10 w-10"
                                        />

                                        <p className="ml-5 text-gray-600 dark:text-gray-200">
                                            {item.title.slice(0, 15)}...
                                        </p>




                                    </li>
                                ))}
                        </      ul>

                            )}
                    </Link>
                    {
                        isAuthenticated && loaded && (
                            <div className="relative group">
                                <div className="flex items-center h-10 gap-3 rounded-lg cursor-pointer w-fit hover:bg-slate-400 dark:hover:bg-slate-800">
                                    {/* <Image
                                width={150}
                                height={150}
                                alt="profile"
                                src={`https://api.dicebear.com/9.x/identicon/svg`}
                                className="my-auto ml-3 rounded-full w-7 h-7 bg-gray-600"
                                /> */}
                                    <p className="mr-3 font-bold text-gray-200">{(user) ? user.fullName : 'Inicia Sesion'}</p>
                                </div>
                                <ul className="z-10 absolute w-72 p-2 bg-slate-200 dark:bg-gray-900 shadow-[rgba(0,_0,_0,_0.24)_0px_0px_40px] shadow-slate-400 dark:shadow-slate-700 hidden md:group-hover:flex flex-col -left-[8em] rounded-xl ">
                                    {items.map((item) => (
                                        <li
                                            key={item.title}
                                            className="flex items-center justify-start h-16 font-bold cursor-pointer hover:bg-slate-400 dark:hover:bg-slate-800 rounded-xl"
                                            onClick={item.onclick}
                                        >
                                            <div
                                                className={`h-10 w-10 ml-5 flex items-center justify-center rounded-lg ${item.color}`}
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
                            </div>
                        )
                    }
                    {
                        !isAuthenticated && loaded && (
                            <div className="relative group">
                                <div className="flex items-center h-10 gap-3 rounded-lg curso    const openSideMenu = useUIStore(state => (state.openSideMenu));r-pointer w-fit hover:bg-slate-400 dark:hover:bg-slate-800">
                                    <IoLogInOutline className="text-2xl" />
                                    <p className="mr-3 font-bold text-white dark:text-gray-200">Log in</p>
                                </div>
                                <ul className="z-10 absolute w-72 p-2 bg-slate-50 dark:bg-gray-900 shadow-[rgba(0,_0,_0,_0.24)_0px_0px_40px] shadow-slate-400 dark:shadow-slate-700 hidden md:group-hover:flex flex-col -left-[8em] rounded-xl ">
                                    {itemsNoAuth.map((item) => (
                                        <li
                                            key={item.title}
                                            className="flex items-center justify-start h-16 font-bold cursor-pointer hover:bg-slate-400 dark:hover:bg-slate-800 rounded-xl"
                                            onClick={item.onclick}
                                        >
                                            <div className={`h-10 w-10 ml-5 flex items-center justify-center rounded-lg ${item.color}`}>
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
                            </div>
                        )
                    }

                </div >
            </nav >

            {/* <ListCategory/> */}

            <nav className="flex xl:pl-[150px] 2xl:pl-[300px] w-full dark:bg-gray-700 shadow-custom-bottom shadow-slate-200 dark:shadow-slate-800">

                <div className="relative group">
                    <div className="flex items-center h-10 pl-3 cursor-pointer w-fit hover:bg-slate-200 dark:hover:bg-slate-800">
                        <p className="mr-3 text-gray-800 dark:text-gray-200">Categorias</p>
                    </div>
                    <ul className="z-10 absolute w-72 p-2 bg-slate-50 dark:bg-gray-900 shadow-[rgba(0,_0,_0,_0.24)_0px_0px_40px] shadow-slate-400 dark:shadow-slate-700 hidden md:group-hover:flex flex-col -left-[8em] rounded-xl ">
                        {categorias.map((categoria) => (
                            <li
                                key={categoria.title}
                                className="flex items-center justify-start h-12 font-bold cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl"
                            >
                                <Link className="ml-5 text-gray-600 dark:text-gray-200" href={`/category/${categoria.title}`}>
                                    {categoria.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex items-center h-10 pl-3 cursor-pointer w-fit hover:bg-slate-200 dark:hover:bg-slate-800">
                    <Link className="mr-3 text-gray-800 dark:text-gray-200" href={'/category/all'}>Todos los productos</Link>
                </div>
                <div className="flex items-center h-10 pl-3 cursor-pointer w-fit hover:bg-slate-200 dark:hover:bg-slate-800">
                    <IoPricetag className="text-bold text-red-600" />
                    <Link className="mr-3 text-red-600" href={'/category/ofertas'}>Ofertas</Link>
                </div>


            </nav >

        </div >
    )
}
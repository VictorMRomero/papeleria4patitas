'use client';


import { User } from "@/interfaces";
import {  useSession } from "next-auth/react";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";





export const SearchBar = () => {
    const router = useRouter()
    const {data: session} = useSession();
    const isAdmin = (session?.user && (session.user as User).role === 'admin');
    
    let path = 'search';


    if(isAdmin){
        path = 'admin/ventas'
    }
    

    const [searchText, setSearchText] = useState('');

    // Función para manejar cambios en el campo de búsqueda
    const handleSearchChange = (event:any) => {
        setSearchText(event.target.value);
    };

    // Función para manejar el envío del formulario
    
    const handleSubmit = (event:any) => {
        event.preventDefault();



        
        // Puedes usar searchText aquí para realizar la búsqueda o cualquier otra acción
        
    };
    




    return (
        <form className="w-full pt-3 pb-3 sm:pl-10 sm:pr-10" onSubmit={handleSubmit}>
            <label className="mb-2 p-6 text-sm font-medium text-gray-900 sr-only">Buscar</label>
            <div className="relative">
                <div className="text-gray-400 absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input 
                    value={searchText} 
                    onChange={handleSearchChange} 
                    type="search" id="default-search" 
                    pattern=".{3,}"  // Expresión regular que requiere al menos 3 caracteres
                    title="Ingresa al menos 3 letras"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Buscar..." required>
                </input>
                <Link href={`/${path}?productSearch=${searchText}`}>
                    <button type="submit" className="text-gray-200 absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-4 py-2">Ir</button>
                </Link>
            </div>
        </form>
    )
}

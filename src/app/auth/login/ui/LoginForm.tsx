'use client'

import { authenticate } from "@/actions"
import clsx from "clsx"
import { setCookie } from 'cookies-next';
import { useEffect } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { IoInformationOutline } from "react-icons/io5"




export const LoginForm = () => {


    const [state, dispatch] = useFormState(authenticate, undefined);


    
    useEffect(() => {
        if (state && state.status === 'Success' && state.user && state.token) {
            setCookie('token', state.token, { maxAge: 24 * 60 * 60 }); // 1 día
            setCookie('user', JSON.stringify(state.user), { maxAge: 24 * 60 * 60 });
            window.location.replace('/');
        }

    },[state])

    return (
        <>
            <form action={dispatch} className="grid grid-cols-1 gap-4 mb-4">

                <label htmlFor="email" className="dark:text-cyan-400">Correo electrónico</label>

                <input
                    className={`w-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    type="email"
                    name="email" />


                <label htmlFor="password" className="dark:text-cyan-400">Contraseña</label>


                <input
                    className="w-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="password"
                    name="password" />

                <div
                    className="flex h-8 items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {state?.status === 'CredentialsSignin' && (
                        <div className="flex flex-row mb-2">
                            <IoInformationOutline className="h-5 w-5 text-red-500" />
                            <p className="text-sm  text-red-500">Credenciales incorrectas</p>
                        </div>
                    )

                    }
                </div>

                    <LoginButton />

            </form>

        </>
    )
}

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            className={clsx({
                "bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500":!pending,
                "btn-disabled": pending
            })}
            disabled={pending}

            
        >
            {(pending === false) 
            ? "Ingresar"
            : "Cargando..."
        }
        </button>
    )
}
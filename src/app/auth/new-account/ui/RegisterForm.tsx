
"use client";

import clsx from 'clsx';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';

import { registerUser } from '@/actions';
import { useState } from 'react';
import { setCookie } from 'cookies-next';


type FormInputs = {
  name: string;
  email: string;
  password: string;  
  passwordVerified: string;
}



export const RegisterForm = () => {

  const [errorMessage, setErrorMessage] = useState('')
  const { register, handleSubmit, formState: {errors} } = useForm<FormInputs>();
  const [status, setStatus] = useState(false);
  const onSubmit: SubmitHandler<FormInputs> = async(data) => {
    setStatus(true)
    setErrorMessage('');
    const { name, email, password, passwordVerified } = data;

    if(password != passwordVerified){
      setErrorMessage('Por favor, verifica que coincidan las contraseñas')
      setStatus(false)
      return
    }
    
    // Server action

    const {ok, user, message} = await registerUser( name, email, password );


    if ( !ok ) {
      setErrorMessage(message);
      setStatus(false)
      return;
    }

    setCookie('token', user.token, { maxAge: 24 * 60 * 60 }); // 1 día
    setCookie('user', JSON.stringify(user), { maxAge: 24 * 60 * 60 });


    window.location.replace('/');


  }


  return (
    <form onSubmit={ handleSubmit( onSubmit ) }  className="grid grid-cols-1 gap-4 mb-4">

      {/* {
        errors.name?.type === 'required' && (
          <span className="text-red-500">* El nombre es obligatorio</span>
        )
      } */}


      <label htmlFor="name" className='dark:text-cyan-400'>Nombre completo</label>
      <input
        className={
          clsx(
            "w-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500",
            {
              'border-red-500': errors.name
            }
          )
        }
        type="text"
        autoFocus
        { ...register('name', { required: true }) }
      />

      <label htmlFor="email" className="dark:text-cyan-400">Correo electrónico</label>
      <input
        className={
          clsx(
            "w-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500",
            {
              'border-red-500': errors.email
            }
          )
        }
        type="email"
        { ...register('email', { required: true, pattern: /^\S+@\S+$/i }) }
      />

      <label htmlFor="password" className="dark:text-cyan-400">Contraseña</label>
      <input
        className={
          clsx(
            "w-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500",
            {
              'border-red-500': errors.password
            }
          )
        }
        type="password"
        { ...register('password', { required: true, minLength: 6 }) }
      />

      <label htmlFor="verifiedPassword" className="dark:text-cyan-400">Repite la contraseña</label>
      <input
        className={
          clsx(
            "w-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500",
            {
              'border-red-500': errors.passwordVerified
            }
          )
        }
        type="password"
        { ...register('passwordVerified', { required: true, minLength: 6, }) }
      />

      
      <span className="text-red-500">{ errorMessage } </span>
      
    

      <button
          type="submit"
          className={clsx({
              "bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500":!status,
              "btn-disabled": status
          })}
          disabled={status}

          
      >
          {(status === false) 
          ? "Crear Cuenta"
          : "Cargando..."
      }
      </button>

    </form>
  );
};
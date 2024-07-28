'use client'

import Link from 'next/link';
import { LoginForm } from './ui/LoginForm';
import { useEffect, useState } from 'react';
import { Loader } from '@/components/ui/loader/Loader';

export default function login() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);
  
  if (!mounted) return <Loader/>;
  
  return (

    <div className="bg-gray-300 dark:bg-gray-700 p-8 max-w-md mx-auto rounded-lg transition-colors duration-300">

      <h1 className={`text-sm sm:text-2xl font-bold text-gray-800 dark:text-white mb-2`}>COMIENZA A GANAR</h1>
      <h2 className={`text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4`}>Crea una nueva cuenta<span className="text-blue-500">.</span></h2>
      <p className={`text-gray-600 dark:text-gray-400 mb-6`}>A&uacute;n no tienes una cuenta? <Link href="/auth/new-account" className="text-blue-500 hover:underline">Registrate</Link></p>

    
      <LoginForm />


    </div>
  );
}
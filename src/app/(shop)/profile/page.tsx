'use client'

import { auth } from "@/auth.config";
import { Title } from "@/components";
import { titleFont } from "@/config/fonts";
import { getUser } from "@/config/token";
import { User } from "@/interfaces";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = () => {
      const storedUser = getUser();
      if (storedUser) {
        setUser(storedUser);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }


  if (!user) {
    redirect('/auth/login?returnTo=/perfil');
    //redirect("/");
  }



  return (
    <>
      <Title title="Perfil" />
      <div className="w-full flex flex-col 2xl:w-1/3">
      <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                    <h4 className="text-xl text-gray-900 font-bold">Tus datos</h4>
                    <ul className="mt-2 text-gray-700">
                        <li className="flex border-y py-2">
                            <span className="font-bold w-24">Nombre:</span>
                            <span className="text-gray-700">{user.fullName}</span>
                        </li>
                        <li className="flex border-b py-2">
                            <span className="font-bold w-24">Email:</span>
                            <span className="text-gray-700">{user.email}</span>
                        </li>
                        <li className="flex border-b py-2">
                            <span className="font-bold w-24">Fecha de Creacion:</span>
                            <span className="text-gray-700">{user.createAt}</span>
                        </li>



                    </ul>
                </div>
       </div>
    </>
  );
}
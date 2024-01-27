import { auth } from "@/auth.config";
import { Title } from "@/components";
import { titleFont } from "@/config/fonts";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
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
                            <span className="text-gray-700">{session.user.name}</span>
                        </li>
                        <li className="flex border-b py-2">
                            <span className="font-bold w-24">Email:</span>
                            <span className="text-gray-700">{session.user.email}</span>
                        </li>


                    </ul>
                </div>
       </div>
    </>
  );
}
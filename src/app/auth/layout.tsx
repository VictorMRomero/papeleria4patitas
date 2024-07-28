
import { TopMenuCredentials } from "@/components/ui/top-menu/TopMenuCredentials";
import { titleFont } from "@/config/fonts";
import { getUser } from "@/config/token";
import { User } from "@/interfaces";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ShopLayout({
    children
}:{
    children:React.ReactNode;
}){
    const cookieStore = cookies();
    const userCookie = cookieStore.get('user');

    if(userCookie){
        redirect('/')
    }


    return(
        <main className={`${titleFont.className} min-w-screen min-h-screen flex flex-col`}>
            <TopMenuCredentials/>
            <div className="flex-grow bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4 py-8 sm:py-12 md:py-16 lg:py-20">
                <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-4xl">
                {children}
                </div>
            </div>
        </main>
    )
}
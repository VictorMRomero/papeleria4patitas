
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { User } from "@/interfaces";



export default async function AdminLayout({children}:{
    children: React.ReactNode;
}){

    const cookieStore = cookies();
    const userCookie = cookieStore.get('user');

    if(!userCookie){
        redirect('/auth/login')
    }

    const user: User = JSON.parse(userCookie.value);

    if(!user.roles.includes('admin')){
        redirect('/auth/login')
    }

    return(
        <>
            {children}
        </>
    )
}
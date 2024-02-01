import { auth } from "@/auth.config";
import { User } from "@/interfaces";

import { redirect } from "next/navigation";
import { Children } from "react";

export default async function AdminLayout({children}:{
    children: React.ReactNode;
}){

    const session = await auth();

    if(!session){
        redirect('/auth/login')
    }

    if((session?.user as User).role !== 'admin'){
        redirect('/auth/login')
    }

    return(
        <>
            {children}
        </>
    )
}
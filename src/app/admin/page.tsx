'use server'

import { InterfazPuntoVenta } from "@/components/PuntoVenta/InterfazPuntoVenta";
import { SideMenu } from "@/components/ui/side-menu/SideMenu";




export default async function AdminPage() {

 


    return (
        <div className="bg-blue-gray-50">
            <div className="hide-print flex flex-row h-screen antialiased text-black dark:text-white">
                <SideMenu />
                <InterfazPuntoVenta />
            </div>
        </div>
    )
}


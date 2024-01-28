import { Footer, Sidebar, TopMenu } from "@/components";
import { TopMenuMobile } from "@/components/ui/top-menu/TopMenuMobile";

export default function ShopLayout({
    children
}:{
    children:React.ReactNode;
}){
    return(
        <main className="min-w-screen bg-white">
            <TopMenu className="hidden md:block"/>
            <TopMenuMobile className="block md:hidden" />
            <Sidebar />
            <div className="sm:pl-[300px] sm:pr-[300px] ml-2 mr-2 sm:px-10">
            
                {children}

            </div>
            <Footer/>
        </main>
    )
}
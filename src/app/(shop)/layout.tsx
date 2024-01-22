import { Footer, Sidebar, TopMenu } from "@/components";

export default function ShopLayout({
    children
}:{
    children:React.ReactNode;
}){
    return(
        <main className="min-h-screen bg-white">
            <TopMenu />
            <Sidebar />
            <div className="sm:pl-[300px] sm:pr-[300px] ml-2 mr-2 sm:px-10">
            
                {children}

            </div>
            <Footer/>
        </main>
    )
}
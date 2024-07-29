import { getCategories } from "@/actions";
import { Footer, Sidebar, TopMenu } from "@/components";
import { TopMenuMobile } from "@/components/ui/top-menu/TopMenuMobile";
import { titleFont } from "@/config/fonts";

export default async function ShopLayout({
    children
}:{
    children:React.ReactNode;
}){

    const categorias = await getCategories();

    return(
        <main className={`${titleFont.className} min-w-screen bg-neutral-100 dark:bg-gray-900`}>
            <TopMenu className="hidden xl:block" categorias={categorias}/>
            <TopMenuMobile className="block xl:hidden" categorias={categorias}/>
            <div className="xl:pl-[300px] xl:pr-[300px] ml-2 mr-2 sm:px-10 ">
            
                {children}

            </div>
            <Footer/>
        </main>
    )
}
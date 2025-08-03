import { getCategories } from "@/actions";
import { Footer,TopMenu, StoreSelector } from "@/components";
import { titleFont } from "@/config/fonts";

export default async function ShopLayout({
    children
}:{
    children:React.ReactNode;
}){

    const categorias = await getCategories();

    return(
        <main className={`${titleFont.className} max-w-screen bg-gray-50`}>
            <TopMenu categorias={categorias} />
            <div className="xl:pl-[150px] xl:pr-[150px] 2xl:pl-[300px] 2xl:pr-[300px] ml-2 mr-2 sm:px-10 ">
            
                {children}

            </div>
            <Footer/>
            <StoreSelector />
        </main>
    )
}
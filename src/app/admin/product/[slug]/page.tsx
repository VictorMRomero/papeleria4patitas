import { getCategories, getProductByTerm } from "@/actions";
import { Breadcrumb, Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";
import { TopMenuCredentials } from "@/components/ui/top-menu/TopMenuCredentials";
import Link from "next/link";

interface Props {
    params: {
        slug: string
    }
}

export default async function ProductPage ({params}: Props) {
    const {slug} = params;
    
    const slugWithAcentos = decodeURIComponent(slug);


    const [ product, categories ] = await Promise.all([
        getProductByTerm(slugWithAcentos),
        getCategories()
      ]);

    if(!product && slug !== 'new'){
        redirect('/admin/products')
    }

    const title = (slug === 'new') ? 'Nuevo' : `Actualizar`

    const bread = [
      {name:'Admin', url:'/admin'},
    ]
    

  return (
    <>
      <TopMenuCredentials />
      <div className="xl:pl-[150px] xl:pr-[150px] 2xl:pl-[300px] 2xl:pr-[300px] p-2 sm:px-10 dark:bg-gray-900 ">
        <Breadcrumb data={bread} actual={title}/>
        <div className="bg-gray-300 dark:bg-gray-700 p-8 mx-auto rounded-lg transition-colors duration-300">
          <h1 className={`text-2xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-2`}>{(slug === 'new') ? 'Crea Producto' : 'Actualiza Producto'}</h1>
          
            {
              (slug === 'new') 
              ? <h2 className={`text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4`}>Asegurate de llenar todos los campos<span className="text-blue-500">.</span></h2>
              : <h2 className={`text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4`}>Quieres crear un nuevo producto?<Link className="hover:text-blue-400" href={"/admin/product/new"}> Click aqui</Link> <span className="text-blue-500">.</span></h2>
            }  
            
          

          <ProductForm product={product ?? {}} categories={categories}/>
        </div>
      </div>
    </>
  )
}

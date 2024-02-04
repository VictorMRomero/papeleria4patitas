import { getCategories } from "@/actions"
import { Title } from "@/components";
import Link from "next/link";


export default async function CategoriasPage() {

    const categorias = await getCategories();

    return(
        <>
        <Title title="Mantenimiento de categorias" />
        <div className="flex justify-end mb-5">
          <Link
            href={'/admin/categoria/new'}
            className='btn-primary'>
            Nuevo Producto
          </Link>
        </div>
  
        <div className="mb-10">
          <table className="min-w-full">
            <thead className="bg-gray-200 border-b">
              <tr>
  

                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Nombre de la categoria
                </th>

              </tr>
            </thead>
            <tbody>
  
  
              {
                categorias?.map((categoria) => ( 
                  <tr key = {categoria.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
  

                    
  
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <Link href={`/admin/categoria/${categoria.id}`}
                            className='hover:underline'>
                        {categoria.name}  
                      </Link>
                    </td>
  

  
                  </tr>
                ))
              }
            </tbody>
          </table>

        </div>
      </>
    )
}
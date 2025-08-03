// import { getCategoriesById} from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { CategoriaForm } from "./CategoriaForm";


interface Props {
    params: Promise<{
        id: string
    }>
}

export default async function ProductPage ({params}: Props) {
    const {id} = await params;


    // const categoria = await getCategoriesById(id);

    // if(!categoria && id !== 'new'){
    //     redirect('/admin/categorias')
    // }

    const title = (id === 'new') ? 'Nueva Categoria' : 'Editar Categoria'


  return (
    <>
        <h1>page category</h1>
        {/* <Title title={title}/>
        <CategoriaForm categoria={categoria ?? {}}/> */}
    </>
  )
}
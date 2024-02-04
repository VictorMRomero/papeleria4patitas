import { getCategoriesById} from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { CategoriaForm } from "./CategoriaForm";


interface Props {
    params: {
        id: string
    }
}

export default async function ProductPage ({params}: Props) {
    const {id} = params;


    const categoria = await getCategoriesById(id);

    if(!categoria && id !== 'new'){
        redirect('/admin/categorias')
    }

    const title = (id === 'new') ? 'Nueva Categoria' : 'Editar Categoria'


  return (
    <>
        <Title title={title}/>
        <CategoriaForm categoria={categoria ?? {}}/>
    </>
  )
}
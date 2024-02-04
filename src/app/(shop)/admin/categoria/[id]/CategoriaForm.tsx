"use client";


import { Category} from "@/interfaces";



import { useRouter } from 'next/navigation';
import { useState } from "react";
import { createOrReplaceCategoria } from "@/actions/categories/create-or-replace-category.ts";
import clsx from "clsx";


interface Props {

  categoria: Partial<Category>;

}



export const CategoriaForm = ({ categoria }: Props) => {

  const [searchText, setSearchText] = useState(`${categoria.name}`);
  const [loaded, setLoaded] = useState(false);


  const router = useRouter();
  const handleSearchChange = (event:any) => {
    setSearchText(event.target.value);
};

const onSubmit = async () => {
    setLoaded(true)

    const { ok, categoriaUpdated} = await createOrReplaceCategoria(categoria.id ?? '', searchText);


    if (!ok) {
      alert('Producto no se pudo actualizar');
      return;
    }

    setLoaded(false)
    
    router.replace(`/admin/categoria/${categoriaUpdated?.id}`)

    
}





  return (


    <form onSubmit={(onSubmit)} className="form grid grid-cols-3 gap-4">

    <div className="grid-cols-2">
      <label className="text-sm font-medium text-gray-700">Nombre</label>
      <input type="name" value={searchText} onChange={handleSearchChange}  id="descuento" className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500" />
    </div>



    <div className="col-span-3 flex justify-end">
      <button className={clsx(
        "bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md py-2 px-4",
        {
        'disabled': loaded
      })}>Guardar</button>

    </div>
  </form>



  );
};
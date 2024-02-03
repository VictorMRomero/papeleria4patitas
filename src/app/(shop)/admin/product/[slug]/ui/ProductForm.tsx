"use client";

import { useForm } from "react-hook-form";
import { Category, Product, ProductImage as ProductWithImage } from "@/interfaces";
import './style.css'
import clsx from "clsx";

import { useRouter } from 'next/navigation';
import { ProductImage } from '@/components';
import { createOrReplaceDescuento, createUpdateProduct, deleteDescuento, deleteProductImage } from "@/actions";
import { useState } from "react";
import { Descuento } from "@prisma/client";

interface Props {
  product: Partial<Product> & { ProductImage?: ProductWithImage[] } ;
  categories: Category[];
  descuentoProducto: number;
}



interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;

  tags: string;

  categoryId: string;

  images?: FileList;
}

export const ProductForm = ({ product, categories , descuentoProducto}: Props) => {
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState(`${descuentoProducto}`);

  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { isValid },

  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(", "),
      //sizes: product.sizes ?? [],

      images: undefined,
    },
  });





  const onSubmit = async (data: FormInputs) => {
    setLoaded(true)
    const formData = new FormData();


    const { images, ...productToSave } = data;

    if (product.id) {
      formData.append("id", product.id ?? "");
    }

    formData.append("title", productToSave.title);
    formData.append("slug", productToSave.slug);
    formData.append("description", productToSave.description);
    formData.append("price", productToSave.price.toString());
    formData.append("inStock", productToSave.inStock.toString());

    formData.append("tags", productToSave.tags);
    formData.append("categoryId", productToSave.categoryId);





    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
    }


    const { ok, product: updatedProduct } = await createUpdateProduct(formData);






    if (!ok) {
      alert('Producto no se pudo actualizar');
      return;
    }
    setLoaded(false)
    router.replace(`/admin/product/${updatedProduct?.slug}`)

  };

  const handleSearchChange = (event:any) => {
    setSearchText(event.target.value);
};



  return (


    <div className="mb-5 mt-5">
      <h2>
        <button type="button" onClick={() => setOpen(!open)} className="flex items-center justify-between w-full p-5 text-xl rounded-t-xl bg-gray-600 focus:bg-gray-800 border-gray-700 text-gray-200  hover:bg-gray-500 gap-3" >
          <span>Producto</span>
        </button>
      </h2>
      <div className={clsx({ 'hidden': open, })}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid px-5 mb-16 grid-cols-1 sm:px-0  gap-3"
        >
          {/* Textos */}
          <div className="w-full sm:grid sm:gap-3 sm:grid-cols-2">
            <div className="flex flex-col mb-2">
              <span>Título</span>
              <input
                type="text"
                className="p-2 border rounded-md bg-gray-200"
                {...register("title", { required: true })}
              />
            </div>

            <div className="flex flex-col mb-2">
              <span>Slug</span>
              <input
                type="text"
                className="p-2 border rounded-md bg-gray-200"
                {...register("slug", { required: true })}
              />
            </div>

            <div className="flex flex-col mb-2">
              <span>Descripción</span>
              <textarea
                rows={5}
                className="p-2 border rounded-md bg-gray-200"
                {...register("description", { required: true })}
              ></textarea>
            </div>
            <div className="flex flex-col mb-2">
              <span>Tags</span>
              <input
                type="text"
                className="p-2 border rounded-md bg-gray-200"
                {...register("tags", { required: true })}
              />
            </div>


            <div className="flex flex-col mb-2">
              <span>Price</span>
              <input
                type="number"
                className="p-2 border rounded-md bg-gray-200"
                {...register("price", { required: true, min: 0 })}
              />
            </div>



            <div className="flex flex-col mb-2">
              <span>Categoria</span>
              <select
                className="p-2 border rounded-md bg-gray-200"
                {...register("categoryId", { required: true })}
              >
                <option value="">[Seleccione]</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col mb-2">
              <span>Inventario</span>
              <input
                type="number"
                className="p-2 border rounded-md bg-gray-200"
                {...register("inStock", { required: true, min: 0 })}
              />
            </div>



            <div className="flex flex-col  p-2 rounded-md">
              <div className="flex flex-col mb-2">
                <span>Fotos</span>
                <input
                  type="file"
                  {...register('images')}
                  multiple
                  className="p-2 border rounded-md bg-gray-200"
                  accept="image/png, image/jpeg, image/avif"
                />
              </div>

              <div className="grid grid-cols-2 p-2 rounded-md bg-gray-200 sm:grid-cols-3 gap-3">
                {product.ProductImage?.map((image) => (
                  <div key={image.id}>
                    <ProductImage
                      alt={product.title ?? ""}
                      src={image.url}
                      width={300}
                      height={300}
                      className="rounded-t shadow-md"
                    />

                    <button
                      type="button"
                      onClick={() => deleteProductImage(image.id, image.url)}
                      className="btn-danger w-full rounded-b-xl"
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>
            </div>



            <button
              className={
                clsx(
                  "flex justify-center w-full mt-4",
                  {

                    'btn-primary': !loaded,
                    'btn-disabled': loaded
                  })
              }

            >
              <span className={
                clsx(
                  {
                    'hidden': loaded
                  }
                )
              }>Guardar</span>
              <div className={
                clsx(
                  " justify-center w-full mt-4 loader",
                  {

                    'hidden': !loaded,

                  })
              }></div>
            </button>
          </div>
        </form>
      </div>
      <h2>
        <button type="button" onClick={() => setOpen(!open)} className="flex items-center justify-between w-full p-5 twxt-xl  bg-gray-600 focus:bg-gray-800 border-gray-700 text-gray-200  hover:bg-gray-500 gap-3">
          <span>Descuento</span>
        </button>
      </h2>
      <div id="accordion-collapse-body-2" className={clsx({ 'hidden': !open, })} aria-labelledby="accordion-collapse-heading-2">
        <form className="form grid grid-cols-3 gap-4">

          <div className="grid-cols-2">
            <label className="text-sm font-medium text-gray-700">% de descuento</label>
            <input type="number" value={searchText} onChange={handleSearchChange}  id="descuento" className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500" />
          </div>



          <div className="col-span-3 flex justify-end">
            <button onClick={() => createOrReplaceDescuento(product.id ?? '', searchText)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md py-2 px-4">Guardar</button>
            <button onClick={() => deleteDescuento(product.id ?? '')} className={
                clsx(
                  "bg-red-600 hover:bg-red-700 text-white font-medium rounded-md py-2 px-4",
                  {
                    'btn-disabled': !descuentoProducto
                  })
              }
            >Eliminar</button>
          </div>
        </form>
      </div>

    </div>



  );
};
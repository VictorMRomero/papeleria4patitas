"use client";

import { Category, Product, ProductImage as ProductWithImage } from "@/interfaces";
import { useRouter } from 'next/navigation';
import { ProductImage } from '@/components';
import { updateProduct, deleteProductImage, createProduct } from "@/actions";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import './style.css'
import clsx from "clsx";
import AddCategoryModal from "./AddCategoryModal";
import { createCategory } from "@/actions/categories/create-category";

interface Props {
  product: Partial<Product> & { ProductImage?: ProductWithImage[] };
  categories: Category[];
}

interface FormInputs {
  title: string;
  description: string;
  inStock: number;
  price: number;
  tags: string;  // Cambiado a string para manejar como texto inicialmente
  discount: number;
  isActive: boolean;
  categories: string;  // Cambiado a array de strings
  images?: FileList;
}

interface NewCategory {
  title: string;
  description: string;
}

export const ProductForm = ({ product, categories }: Props) => {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(', ') || '',  // Convertir array a string
      categories: '',
      images: undefined,
    },
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  const handleAddCategory = async(newCategory: NewCategory) => {
    setLoaded(true)
    const {categoria, ok} = await createCategory(newCategory);
    if(!ok) alert('No se pudo crear la categoria.')
    setLoaded(false);
    window.location.reload()
    
  };

  const onSubmit = async (data: FormInputs) => {
    setLoaded(true);
    const formData = new FormData();

    let { images, tags, categories, ...productToSave } = data;

    if (product.id) {
      formData.append("id", product.id);
    }

    // se appende los datos del producto
    (Object.keys(productToSave) as Array<keyof typeof productToSave>).forEach(key => {
      formData.append(key, productToSave[key].toString());
    });

    // Se guarda el array de tags como string
    if (tags) {
      const tagsArray = tags.toLowerCase().split(',').map(tag => tag.trim());
      formData.append('tags', JSON.stringify(tagsArray));
    }

    // Se guarda el array de categories como string
    if (categories) {
      formData.append('categories', JSON.stringify(categories));
    }

    // Si hay imagenes se guardan
    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
    }

    let result
    if (product.id) {
      result = await updateProduct(formData);
    } else {
      result = await createProduct(formData);
    }


    if (result?.ok) {
      setLoaded(false);
      router.replace(`/admin/product/${result.product?.slug}`);
    } else {
      setLoaded(false);
      alert('Producto no se pudo actualizar');
    }
  };





  return (
    <div>
        <div className="flex justify-end">

          <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="hidden lg:block mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Agregar Categoría
        </button>
        </div>

      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCategory={handleAddCategory}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid  grid-cols-1 gap-3 mb-2"
      >
        {/* Textos */}
        <div className="w-full sm:grid sm:gap-3 sm:grid-cols-2">
          <div className="flex flex-col mb-2">
            <span className="dark:text-cyan-400 text-lg sm:text-xl">Título</span>
            <input
              type="text"
              className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("title", { required: true })}
            />
          </div>

          <div className="flex flex-col mb-2">
            <span className="dark:text-cyan-400 text-lg sm:text-xl">Descripción</span>
            <textarea
              rows={5}
              className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("description", { required: true })}
            ></textarea>
          </div>

          <div className="flex flex-col mb-2">
            <span className="dark:text-cyan-400 text-lg sm:text-xl">Inventario</span>
            <input
              type="number"
              className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("inStock", { required: true, min: 0 })}
            />
          </div>

          <div className="flex flex-col mb-2">
            <span className="dark:text-cyan-400 text-lg sm:text-xl">Price</span>
            <input
              type="number"
              className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("price", { required: true, min: 0 })}
            />
          </div>

          <div className="flex flex-col mb-2">
            <span className="dark:text-cyan-400 text-lg sm:text-xl">Tags</span>
            <input
              type="text"
              className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("tags", { required: true })}
            />
          </div>

          <div className="flex flex-col mb-2">
            <span className="dark:text-cyan-400 text-lg sm:text-xl">Descuento</span>
            <input
              type="number"
              className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("discount")}
            />
          </div>

          <div className="flex flex-col mb-2">
            <span className="dark:text-cyan-400 text-lg sm:text-xl">Categorías</span>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-3">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`category-${category.id}`}
                    value={category.id}
                    {...register("categories", {
                      setValueAs: (v) => {
                        const currentValue = Array.isArray(v) ? v : v.split(',').filter(Boolean);
                        return currentValue.includes(category.id.toString())
                          ? currentValue.join(',')
                          : [...currentValue, category.id].join(',');
                      }
                    })}
                    defaultChecked={product.categories?.some(cat => cat.id === category.id)}
                    className="mr-2 form-checkbox h-5 w-5 text-blue-600"
                  />
                  <label
                    htmlFor={`category-${category.id}`}
                    className="text-gray-800 dark:text-white"
                  >
                    {category.title}
                  </label>
                </div>
              ))}

            </div>
          </div>





          <div className="flex flex-col  p-2 rounded-md">
            <div className="flex flex-col mb-2">
              <span className="dark:text-cyan-400 text-lg sm:text-xl">Fotos</span>
              <input
                type="file"
                {...register('images')}
                multiple
                className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                accept="image/png, image/jpeg, image/avif"
              />
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white grid grid-cols-2 p-2 rounded-md sm:grid-cols-3 lg:grid-cols-3 gap-3">
              {product.images?.map((image) => (
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
                    onClick={() => deleteProductImage(image.url)}
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

  );
};
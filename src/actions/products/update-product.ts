'use server'
import { z } from "zod"
import { getUserServer } from "../user/get-user";
import api from "@/config/api";
import { updateImage } from "../images/update-image";
import { revalidatePath } from "next/cache";

const productSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    title: z.string().min(3).max(255),
    description: z.string(),
    inStock: z.coerce.number().min(0).transform(val => Number(val.toFixed(0))),
    price: z.coerce.number().min(0).transform(val => Number(val.toFixed(2))),
    discount: z.coerce.number().min(0).transform(val => Number(val.toFixed(0))),
    tags: z.string(),
    categories: z.string(),
})

export const updateProduct = async(formData: FormData ) => {
    const data = Object.fromEntries(formData);
    const productParsed = productSchema.safeParse(data);
    if (!productParsed.success) {
        return { ok: false }
    }
    
    const product = productParsed.data;
    product.tags = JSON.parse(product.tags)
    product.categories = JSON.parse(product.categories)
    const { id, ...rest } = product;

    
    
    
    try {
        const {token} = await getUserServer();

        const response = await api.patch(`/products/${id}`, JSON.stringify(rest), {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        const {ok, product} = response.data;

        if(!ok){
            throw new Error
        }

        if ((formData.getAll('images')).length > 0) {
            const images = formData.getAll('images') as File[];
            
            if (!images || images.length === 0) {
                alert('No se pudieron cargar las imágenes');
            }

            const {ok} = await updateImage(product, images)
            
            if(!ok) alert('Error al subir la imagen');

        }
        revalidatePath('/admin/products');
        revalidatePath(`/admin/products/${product.slug}`);
        revalidatePath(`products/${product.slug}`);

        return{ok, product}

      } catch (error) {
          return{
            ok: false,
            message: 'error en el catch'
          }
      }
}
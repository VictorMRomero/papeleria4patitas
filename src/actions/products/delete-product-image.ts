'use server';

import api from '@/config/api';
import { revalidatePath } from 'next/cache';
import { getUserServer } from '../user/get-user';




export const deleteProductImage = async( imageUrl: string) => {
    if(!imageUrl.startsWith('http')){
        return{
            ok: false,
            error: 'No se pueden eliminar'
        }
    }    
    
    try {
        const {token} = await getUserServer();

        const cadena = imageUrl.split('/');
        const publicId = cadena[cadena.length - 1].split('.')[0]
        const response = await api.delete(`/files/product/${publicId}`,{
            headers: { 'Authorization': `Bearer ${token}` }
          });

        const {ok, product} = response.data;
        if(!ok){
            throw new Error
        }
        //revalidar los paths
        revalidatePath(`/admin/products`);
        revalidatePath(`/admin/product/${product.slug}`);
        revalidatePath(`/product/${product.slug}`);

    } catch (error) {
        return{
            ok: false,
            message: 'no se pudo eliminar'
        }


    }


}
'use server'

import api from "@/config/api";
import { getUserServer } from "../user/get-user";
import { Product } from "@/interfaces";

export const updateImage = async(product: Product, images: File[]) => {
    if (!images || images.length === 0) {
        throw new Error('No se pudieron cargar las imágenes');
    }

    try {
        const {token} = await getUserServer();

        const imageFormData = new FormData();
        
        // Añadir cada imagen al FormData con el mismo nombre de campo
        images.forEach((image, index) => {
            imageFormData.append('files', image);
        });

        // Enviar la solicitud con el FormData
        const response = await api.patch(`/files/product/${product.id}`, imageFormData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        return{
            ok: true
        }
        
    } catch(error) {
        return {
            ok: false
        }
    }
}
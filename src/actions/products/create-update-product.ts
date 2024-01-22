'use server'

import prisma from '@/lib/prisma';
import { Product } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import {v2 as cloudinary} from 'cloudinary'

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

const productSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    title: z.string().min(3).max(255),
    slug: z.string().min(3).max(255),
    description: z.string(),
    price: z.coerce.number().min(0).transform(val => Number(val.toFixed(2))),
    inStock: z.coerce.number().min(0).transform(val => Number(val.toFixed(0))),
    categoryId: z.string().uuid(),
    tags: z.string(),


})


export const createUpdateProduct = async (formData: FormData) => {
    const data = Object.fromEntries(formData);
    const productParsed = productSchema.safeParse(data);

    if (!productParsed.success) {
        console.log(productParsed.error);
        return { ok: false }
    }

    const product = productParsed.data;

    product.slug = product.slug.toLowerCase().replace(/ /g, '_').trim();

    const { id, ...rest } = product;


    try {

        const prismaTx = await prisma.$transaction(async (tx) => {
            let product: Product;

            const tagsArray = rest.tags.split(',').map(tag => tag.trim().toLowerCase());

            if (id) {
                //actualizar
                product = await prisma.product.update({
                    where: { id },
                    data: {
                        ...rest,

                        tags: {
                            set: tagsArray
                        }
                    },
                })



            } else {
                //crear
                product = await prisma.product.create({
                    data: {
                        ...rest,
                        tags: {
                            set: tagsArray
                        }
                    }
                
                
                })
                
            }

            //proceso de carga y guardado
            //recorrerr u guardar
            if(formData.getAll('images')){
                //https://url.jpg
                const images = await uploadImages(formData.getAll('images') as File[]);
                if(!images){
                    throw new Error('No se pudieron cargar las imageness')
                }

                await prisma.productImage.createMany({
                    data: images.map(image => ({
                        url: image!,
                        productId: product.id
                    }))
                });
            }


            return{
                product
            }

        });


        revalidatePath('/admin/products');
        revalidatePath(`/admin/products/${product.slug}`);
        revalidatePath(`products/${product.slug}`);
        
        
        return {
            ok: true,
            product: prismaTx.product,

        }

    } catch (error) {
        return {
            ok: false,
            message: error
        }
    }

}

const uploadImages = async(images: File[] ) => {

    try {
        const uploadPromises = images.map(async(image) =>{
        
            try{

                const buffer = await image.arrayBuffer();
                const base64Image = Buffer.from(buffer).toString('base64');
                return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`)
                .then(r => r.secure_url);
    
            } catch (error){
                console.log(error);
                return null;
            }
        })


        const uploadedImages = await Promise.all(uploadPromises);
        
        return uploadedImages;

    } catch (error) {
        console.log(error);
        return null;
    }


    
}                                                            

'use server';

import { auth } from "@/auth.config";
import type { Address } from "@/interfaces";
import prisma from "@/lib/prisma";
import { error } from "console";


interface ProductToOrder {
    productId: string;
    quantity: number;
    descuento: number;

}


export const placeOrder = async (productsIds: ProductToOrder[], address: Address) => {

    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        return {
            ok: false,
            message: 'no hay sesion de usuario'
        }
    }

    //Obtener la informacion de los productos
    const products = await prisma.product.findMany({
        where: {
            id: {
                in: productsIds.map(p => p.productId)
            }
        },
        include:{
          descuento:{
            select:{
              valor: true
            }
          }
        }
    })

    //calcular montos
    const itemsInOrder = productsIds.reduce((count, p) => count + p.quantity, 0);

    //total
    const { total } = productsIds.reduce((totals, item) => {

        const productQuantity = item.quantity;
        const product = products.find(p => p.id === item.productId);

        if (!product) throw new Error(`${item.productId} no existe - 500`)

        const totalQuantity = product.price *((100 - (product.descuento?.valor ?? 0))/100) *productQuantity;
        
        
        totals.total += totalQuantity;

        return totals
    }, { total: 0 });

    //transaccion

    try {

        const prismaTx = await prisma.$transaction(async (tx) => {
            // 1. Actualizar el stock de los productos
            const updatedProductsPromises = products.map((product) => {
              //  Acumular los valores
              const productQuantity = productsIds
                .filter((p) => p.productId === product.id)
                .reduce((acc, item) => item.quantity + acc, 0);
      
              if (productQuantity === 0) {
                throw new Error(`${product.id} no tiene cantidad definida`);
              }
      
              return tx.product.update({
                where: { id: product.id },
                data: {
                  // inStock: product.inStock - productQuantity // no hacer
                  inStock: {
                    decrement: productQuantity,
                  },
                },
              });
            });
      
            const updatedProducts = await Promise.all(updatedProductsPromises);
      
            // Verificar valores negativos en las existencia = no hay stock
            updatedProducts.forEach((product) => {
              if (product.inStock < 0) {
                throw new Error(`${product.title} no tiene inventario suficiente`);
              }
            });
            
            // 2. Crear la orden - Encabezado - Detalles
            const order = await tx.order.create({
              data: {
                subTotal: total,
                itemsInOrder: itemsInOrder,
                userId: userId,
                total: total,
              },
            });
            
            const orderItem = await tx.orderItem.createMany({
              data: productsIds.map((p) => ({
                orderId: order.id,
                quantity: p.quantity,
                productId: p.productId,
                price: products.find((product) => product.id === p.productId)
                ?.price ?? 0,
              }))
            })
          
          if(order.subTotal === 0){
            throw new Error('El total no puede ser cero')
          }
            
            // Validar, si el price es cero, entonces, lanzar un error
      
            // 3. Crear la direccion de la orden
            // Address
            
            const { estado, detalle, referencia,  ...restAddress } = address;
            const orderAddress = await tx.orderAddress.create({
              
              data: {
                firstName: restAddress.firstName,
                lastName: restAddress.lastName,
                calle: restAddress.calle,
                detalle: detalle ?? '',
                localidad: restAddress.localidad,
                postalCode: restAddress.postalCode,
                phone: restAddress.phone,
                referencia: referencia,
                estadoId: estado,
                orderId: order.id,
              },
            });

      
            return {
              updatedProducts: updatedProducts,
              order: order,
              orderAddress: orderAddress,
            };
          });
      
      
          return {
            ok: true,
            order: prismaTx.order,
            prismaTx: prismaTx,
          }
      


    } catch (error: any) {

        return {
            ok: false,
            message: error.message,
        }
    }





}
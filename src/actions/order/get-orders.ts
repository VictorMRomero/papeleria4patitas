'use server'

import api from "@/config/api";
import { User } from "@/interfaces";
import { cookies } from "next/headers";



export const getOrdersByUser = async () => {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('user');
  const tokenCookie = cookieStore.get('token');

  if (!userCookie || !tokenCookie) {
    return {
      ok: false,
      message: 'Debe de estar autenticado'
    }
  }

  const user = JSON.parse(userCookie.value);
  const token = tokenCookie.value;


  try {
    const response = await api.get(`orders/user/${user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const { orders } = response.data;


    return {
      ok: true,
      orders
    }
  } catch (error) {
    throw new Error('error al obtener las ordenes')
  }
}


export const getOrderById = async (id: string) => {

  const cookieStore = await cookies();
  const userCookie = cookieStore.get('user');
  const tokenCookie = cookieStore.get('token');

  if (!userCookie || !tokenCookie) {
    return {
      ok: false,
      message: 'Debe de estar autenticado'
    }
  }

  const user = JSON.parse(userCookie.value);
  const token = tokenCookie.value;

  if (!user) {
    return {
      ok: false,
      message: 'Debe de estar autenticado'
    }
  }


  try {

    const response = await api.get(`orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const order = response.data;

    if (!order) throw `${id} no existe`;

    if (!((user as User).roles.includes('admin'))) {
      if (user.id !== order.userId) {
        throw `${id} no es de ese usuario`
      }
    }



    return {
      ok: true,
      order: order,
    }


  } catch (error) {
    return {
      ok: false,
      message: 'Orden no existe'
    }


  }




}
'use server'


import api from "@/config/api";
import { cookies } from "next/headers";

export const getPaginationUsers = async({
    page = 1,
    limit = 20,
    offset = 0
}) => {
    
    if(isNaN(Number(page))) page = 1;
    if(page < 1) page = 1;
    
    
    if(page > 1){
      offset = limit * page - limit;
    };

    const {token} = await getUserServer();


    const response = await api.get(`/auth/all?limit=${limit}&offset=${offset}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    const {users, total} = response.data;

    const totalPages = Math.ceil(total/limit);


    return {
        currenPage: page,
        totalPages,
        users,
        total
      }

} 


export const getUserServer = async() => {
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

    return{
      user,
      token
    }
}

'use server';

import api from "@/config/api";



export const registerUser = async(name: string, email:string, password:string) => {

    try{
        const response = await api.post('auth/register', {email: email, password, fullName:name})
        const user = response.data;

        if(!user){
            throw new Error('algo salio mal')
        }

        return{
            ok: true,
            user
        }

    }catch(error: any){

        return{
            ok: false,
            message: error.response.data.message
        }
    }

}
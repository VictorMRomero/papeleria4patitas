'use server'
import api from '@/config/api';
import { getAllProducts, getNewProducts } from '../products/get-products';
import { User } from '@/interfaces';


interface AuthState {
  status: 'Success' | 'MissingCredentials' | 'CredentialsSignin';
  user?: User;
  token?: string;
}

 
 
export async function authenticate(
  prevState: AuthState | undefined,
  formData: FormData,
) : Promise<AuthState> {
  try {

    const {email, password} = Object.fromEntries(formData)

    if (!email || !password) {
      return {status: 'MissingCredentials'};
    }
    const response = await api.post(`auth/login`, { email, password });
    const {ok, user, token} = response.data;


    if(!ok){
      return {status: 'CredentialsSignin'} 
    }


    return { status: 'Success', user, token };


  } catch (error) {

      return {status: 'CredentialsSignin' }   
  }
}


// export async function getUserInfo() {

//   const token = getToken();
//   if (!token) throw new Error('No token found');
  
//   const response = await api.get(`/auth/private`, {
//     headers: { Authorization: `Bearer ${token}` }
//   });
//   return response.data;
// }
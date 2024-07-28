import { deleteCookie } from "cookies-next";


export const logout = async() => {

    deleteCookie('user');
    deleteCookie('token');
} 
import api from "@/config/api";
import { getUserServer } from "../user/get-user";
import { Category } from "@/interfaces";

interface NewCategory {
    title: string;
    description: string;
  }
export const createCategory = async(newCategory: NewCategory) => {

    try {
        const {token} = await getUserServer();
        let response = await api.post('/category', JSON.stringify(newCategory), {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const categoria:Category = response.data;
        return {
            categoria,
            ok: true
        }
    } catch (error) {
        return {
            ok: false
        }
    }



}
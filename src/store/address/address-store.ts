import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {

    address: {
        firstName: string;
        lastName: string;
        calle: string;
        detalle?: string;
        localidad: string;
        postalCode: string;
        phone: string;
        referencia?: string;
        rememberAddress: boolean;
        estado: string;
    }

    //methos
    setAddres: (address: State['address']) => void;
}

export const useAddressStore = create<State>()(
    persist(

        (set, get) => ({

            address: {
                firstName: '',
                lastName: '',
                calle: '',
                detalle: '',
                postalCode: '',
                localidad: '',
                estado: '',
                phone: '',
                referencia: '',
                rememberAddress: false,
            },
            setAddres: (address) => {
                set({ address })
            },
        }),
        {
            name: 'address-storage'
        }
    )




)
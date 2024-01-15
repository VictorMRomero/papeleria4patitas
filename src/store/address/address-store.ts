import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {

    address: {
        firstName: string;
        lastName: string;
        address: string;
        address2?: string;
        postalCode: string;
        city: string;
        country: string;
        phone: string;
        rememberAddress: boolean;
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
                address: '',
                address2: '',
                postalCode: '',
                city: '',
                country: '',
                phone: '',
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
import { CartProduct } from "@/interfaces";


import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    cart: CartProduct[];

    getTotalItems: () => number;

    getSumaryInformation: () => {
        total: number;
        subTotal: number;
        itemInCart: number;
    }

    //add product
    addProductToCart: (Product: CartProduct) => void;
    //update
    updateProductQuantity: (Product: CartProduct, quantity: number) => void;
    // remove   
    removeProduct: (Product: CartProduct) => void;

    clearCart: () => void;
}

export const useCartStore = create<State>()(

    persist(


        (set, get) => ({

            cart: [],

            getTotalItems: () => {
                const { cart } = get();
                return cart.reduce((total, item) => total + item.quantity, 0);
            },

            getSumaryInformation: () => {

                const { cart } = get();

                const subTotal = cart.reduce((subTotal, product) => product.quantity * product.price + subTotal, 0)
                const total = subTotal; //todo, aqui se agregan otros datos
                const itemInCart = cart.reduce((total, item) => total + item.quantity, 0);

                return {
                    subTotal,
                    total,
                    itemInCart
                }

            },


            addProductToCart: (product: CartProduct) => {
                const { cart } = get();


                //verificar si ya existe
                const productInCart = cart.some(
                    (item) => item.id === product.id
                );

                if (!productInCart) {
                    set({ cart: [...cart, product] });
                    return;
                }

                //actualizar cantidad
                const updatedCartProducts = cart.map((item) => {
                    if (item.id === product.id) {
                        return { ...item, quantity: item.quantity + product.quantity }
                    }
                    return item;
                });

                set({ cart: updatedCartProducts });
            },

            updateProductQuantity: (product: CartProduct, quantity: number) => {
                const { cart } = get();

                const updatedCartProducts = cart.map(item => {
                    if (item.id === product.id) {
                        return { ...item, quantity: quantity };
                    }
                    return item;
                });
                set({ cart: updatedCartProducts })
            },
            removeProduct: (product: CartProduct) => {
                const { cart } = get();
                const removeProduct = cart.filter(
                    (item) => item.id !== product.id
                );
                set({ cart: removeProduct });
            },

            clearCart: () => {
                set({ cart: [] })
            },
        })


        , {
            name: 'shoping-card',

        }
    )

)




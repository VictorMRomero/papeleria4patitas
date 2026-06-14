export interface Order {
    id: string;
    itemsInOrder: number,
    createAt: string,
    status: string,
    isPaid: boolean,
    manipulacion: number,
    discount: number,
    subTotal: number,
    total: number,
  }

export interface OrderItem {
    id: string;
    title: string;
    slug: string;
    price: number;
    discount: number;
    quantity: number;
  }
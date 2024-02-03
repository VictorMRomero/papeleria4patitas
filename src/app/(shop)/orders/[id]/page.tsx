
import { OrderStatus, ProductImage, Title } from "@/components";

import Image from "next/image";
import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";
import { getOrderById } from "@/actions";

import { redirect } from "next/navigation";
import { currencyFormat } from "@/utils";
import { TiendaButton } from "@/components/order/TiendaButton";





interface Props {
  params: {
    id: string;
  };
}


export default async function OrdersByIdPage({ params }: Props) {



  const { id } = params;

  const { ok, order } = await getOrderById(id);

  if (!ok) {
    redirect("/");
  }


  const address = order!.OrderAddress;


  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${id.split("-").at(-1)}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">

            {
              (order?.isPaid)
                ? (<div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 " role="alert">
                  <span className="font-medium">Tu pedido ha sido entregado!</span> Gracias por tu preferencia.
                </div>)
                : (<div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 " role="alert">
                  <span className="font-medium">Pedido Creado!</span> Ya puedes pasar a Tienda a recoger tus articulos.
                </div>)

            }

            {/* Items */}
            {order!.OrderItem.map((item) => (
              <div
                key={item.product.slug}
                className="flex mb-5"
              >
                <ProductImage
                  src={item.product.ProductImage[0].url}
                  width={100}
                  height={100}
                  style={{
                    width: '100px',
                    height: '100px'
                  }}
                  alt={item.product.title}
                  className="mr-5 rounded"
                />

                <div>
                  <p>{item.product.title}</p>
                  <p>
                    ${item.price * ((100 - (item.product.descuento?.valor ?? 0))/100) } x {item.quantity}
                  </p>
                  <p className="font-bold">
                    Subtotal: {currencyFormat(item.price * ((100 - (item.product.descuento?.valor ?? 0))/100) * item.quantity)}
                  </p>
                </div>
              </div>
            ))}


          </div>

          {/* Checkout - Resumen de orden */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">
                {address!.firstName} {address!.lastName}
              </p>
              <p>{address!.calle}</p>
              <p>{address!.detalle}</p>
              <p>{address!.localidad}</p>
              <p>
                {address!.estadoId}
              </p>
              <p>{address!.postalCode}</p>
              <p>{address!.phone}</p>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Resumen de orden</h2>

            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">
                {order?.itemsInOrder === 1
                  ? "1 artículo"
                  : `${order?.itemsInOrder} artículos`}
              </span>

              <span>Subtotal</span>
              <span className="text-right">
                {currencyFormat(order!.subTotal)}
              </span>



              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">
                {currencyFormat(order!.total)}
              </span>
            </div>

            <div className="mt-5 mb-2 w-full">

              <OrderStatus isPaid={order?.isPaid ?? false} />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
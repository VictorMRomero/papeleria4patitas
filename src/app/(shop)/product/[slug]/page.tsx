export const revalidate = 604800; //7 dias


import { notFound } from "next/navigation";
import { titleFont } from "@/config/fonts";
import { ProductGrid, ProductMobileSlideShow, ProductSlideShow, QuantitySelector, Title } from "@/components";
import { getProductByTerm, getProductsByText } from "@/actions";
import { Metadata, ResolvingMetadata } from "next";
import { AddtoCart } from "./ui/AddtoCart";
import Image from "next/image";
import { currencyFormat } from "@/utils";
import { Product } from "@/interfaces";


interface Props {
  params: Promise<{
    slug: string;
  }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {

  const { slug } = await params;

  const product: Product = await getProductByTerm(slug);

  return {
    title: (product?.title ?? 'Producto no encontrado'),
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? '',
      images: [`${product?.images}`]
    }
  }
}

export default async function ProductBySlugPage({ params }: Props) {

  const { slug } = await params;
  const product = await getProductByTerm(slug);


  if (!product) { notFound(); }

  const products = await getProductsByText(product.tags[0])

  const filteredProducts = products.filter((productResult: Product) => productResult.id !== product.id);



  return (
    <>
      <Title title="Informacion del producto" />
      <div className="mt-2 mb-20 grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="col-span-1 ">
          <ProductMobileSlideShow
            title={product?.title as string}
            images={product?.images as string[]}
            className="block md:hidden"
          />


          <ProductSlideShow
            title={product?.title as string}
            images={product?.images as string[]}
            className="hidden md:block"
          />


        </div>


        {/* del otro lado */}
        <div className="col-span-1">
          <h2 className="text-2xl font-bold mb-2 text-black dark:text-white">{product.title}<span className="text-blue-500">.</span></h2>
          <p className="text-blue-400 text-sm mb-4">Para recoger en tienda</p>

          {
            (product.discount && product.discount > 1)
              ? <>
                <span className="text-base sm:text-xl lg:text-3xl font-bold text-red-500">{currencyFormat((product.price - (product.discount * product.price) / 100))}</span>
                <span className="ml-2 text-sm line-through text-gray-600 dark:text-gray-500">{currencyFormat(product.price)}</span>
              </>
              : <span className="dark:text-base text-gray-600 sm:text-xl lg:text-2xl font-bold">{currencyFormat(product.price)}</span>
          }

          <p className="text-sm text-gray-400 mb-4">El precio podria variar al de tienda.</p>

          <div className=" mb-4">
            <h3 className="text-black dark:text-white font-semibold">Metodo de entrega</h3>
            <div className="flex items-center text-gray-400">
              <p className="mr-2 ">Para recoger en tienda, los pedidos suelen tardar de 5 a 30 minutos en estar listos.</p>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-black dark:text-white">Detalles del producto</h3>
            </div>
            <p className="text-gray-400 text-sm">{product.description}</p>
          </div>
          <div className="flex items-center">
            <AddtoCart product={product} />
          </div>



        </div>
      </div>
      <Title title="Productos Relacionados" />
      <ProductGrid
        products={filteredProducts}
      />
    </>
    // <>
    // <Title title={product.title}/>
    // <div className="mt-2 mb-20 grid md:grid-cols-3 gap-3">

    //   <div className="col-span-1 md:col-span-2">

    //     <ProductMobileSlideShow
    //       title={product?.title as string}
    //       images={product?.images as string[]}
    //       className="block md:hidden"
    //     />


    //     <ProductSlideShow
    //       title={product?.title as string}
    //       images={product?.images as string[]}
    //       className="hidden md:block"
    //     />
    //   </div>

    //   <div className="mt-auto mb-auto col-span-1 px-5 ">
    //     {/* <StockLabel slug={product?.slug ?? ''} /> */}


    //     <h3 className="font-bold text-3xl mb-4">Descripci&oacute;n</h3>
    //     <p className="font-light text-xl mb-4">{product?.description}</p>
    //     {
    //                 (!!product.descuento) 
    //                 ? <>
    //                     <span className={`text-xl text-center font-bold cursor-auto line-through text-gray-400 mb-2`}>{currencyFormat(product.price) }</span> 
    //                     <br />
    //                     <span className={`text-3xl text-center font-bold cursor-auto text-red-500 `}>{currencyFormat(Math.round(product.price * (100 - product.descuento)/100)) }</span>
    //                 </>

    //                 :<span className={`text-xl font-bold cursor-auto `}>{currencyFormat(product.price) }</span>
    //     }


    //     <p className="text-sm opacity-50 mb-10">*Precio exclusivo por internet</p>

    //     <AddtoCart product={product} />



    //   </div>

    // </div>


    // </>
  );
}


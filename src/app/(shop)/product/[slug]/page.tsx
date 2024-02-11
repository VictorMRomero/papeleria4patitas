export const revalidate = 604800; //7 dias


import { notFound } from "next/navigation";
import { titleFont } from "@/config/fonts";
import { ProductGrid, ProductMobileSlideShow, ProductSlideShow, QuantitySelector, StockLabel, Title } from "@/components";
import { getProductBySlug, getProductByText } from "@/actions";
import { Metadata, ResolvingMetadata } from "next";
import { AddtoCart } from "./ui/AddtoCart";
import Image from "next/image";
import { currencyFormat } from "@/utils";


interface Props {
  params: {
    slug: string;
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {

  const slug = params.slug;

  const product = await getProductBySlug(slug);

  return {
    title: (product?.title ?? 'Producto no encontrado'),
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? '',
      images: [`${product?.images[1]}`]
    }
  }
}

export default async function ProductBySlugPage({ params }: Props) {

  const { slug } = params;
  const product = await getProductBySlug(slug);


  if (!product) { notFound(); }

  const {products} = await getProductByText(product.tags[0]);
  const filteredProducts = products.filter((productResult) => productResult.id !== product.id);



  return (
    <>
    <Title title={product.title}/>
    <div className="mt-2 mb-20 grid md:grid-cols-3 gap-3">

      <div className="col-span-1 md:col-span-2">

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

      <div className="mt-auto mb-auto col-span-1 px-5 ">
        {/* <StockLabel slug={product?.slug ?? ''} /> */}
       

        <h3 className="font-bold text-3xl mb-4">Descripci&oacute;n</h3>
        <p className="font-light text-xl mb-4">{product?.description}</p>
        {
                    (!!product.descuento) 
                    ? <>
                        <span className={`text-xl text-center font-bold cursor-auto line-through text-gray-400 mb-2`}>{currencyFormat(product.price) }</span> 
                        <br />
                        <span className={`text-3xl text-center font-bold cursor-auto text-red-500 `}>{currencyFormat(Math.round(product.price * (100 - product.descuento)/100)) }</span>
                    </>
                    
                    :<span className={`text-xl font-bold cursor-auto `}>{currencyFormat(product.price) }</span>
        }

        
        <p className="text-sm opacity-50 mb-10">*Precio exclusivo por internet</p>

        <AddtoCart product={product} />



      </div>

    </div>
    <Title title="Productos Relacionados" />
      <ProductGrid
        products={filteredProducts}
      />
    
    </>
  );
}


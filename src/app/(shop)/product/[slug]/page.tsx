export const revalidate = 604800; //7 dias


import { notFound} from "next/navigation";
import { titleFont } from "@/config/fonts";
import { ProductMobileSlideShow, ProductSlideShow, QuantitySelector, StockLabel } from "@/components";
import { getProductBySlug } from "@/actions";
import { Metadata, ResolvingMetadata } from "next";
import { AddtoCart } from "./ui/AddtoCart";


interface Props{
  params: {
    slug:string;
  }
}

export async function generateMetadata(
  {params}: Props,
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
      images:[`/products/${product?.images[1]}`]
    }
  }
}

export default async function ProductBySlugPage({params}:Props) {

    const {slug} = params;
    const product = await getProductBySlug(slug);
    
    
    if(!product){notFound();}


    return (
      <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">
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
          <StockLabel slug={product?.slug ?? ''} />
          <h1 className={`antialiased text-xl`}>{product?.title}</h1>
          <p className="text-lg mb-5">$ {product?.price}</p>

          <AddtoCart product={product}/>

          <h3 className="font-bold text-sm">Descripcion</h3>

          <p className="font-light">{product?.description}</p>

        </div>
      </div>
    );
  }
  

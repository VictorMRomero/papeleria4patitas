import { initialData } from "@/seed/seed";
import notFound from "../not-found";
import { titleFont } from "@/config/fonts";
import { ProductMobileSlideShow, ProductSlideShow, QuantitySelector } from "@/components";

interface Props{
    params: {
        slug:string;
    }
}

function ProductPage({params}:Props) {

    const {slug} = params;
    const product = initialData.products.find(producto => producto.slug === slug);
    if(!product){

        notFound();
    }


    return (
      <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">
        <div className="col-span-1 md:col-span-2 ">

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
          <h1 className={`${titleFont.className} antialiased text-xl`}>{product?.title}</h1>
          <p className="text-lg mb-5">$ {product?.price}</p>


          <QuantitySelector 
            quantity={1}
          />

          <button className="btn-primary my-5">
            Agregar al carrito
          </button>

          <h3 className="font-bold text-sm">Descripcion</h3>

          <p className="font-light">{product?.description}</p>

        </div>
      </div>
    );
  }
  
export default ProductPage;
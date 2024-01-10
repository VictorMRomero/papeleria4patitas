import { initialData } from "@/seed/seed";
import notFound from "../not-found";
import { titleFont } from "@/config/fonts";

interface Props{
    params: {
        slug:string;
    }
}

function ProductPage({params}:Props) {

    const {slug} = params;
    const product = initialData.products.find(product => product.slug === slug);
    if(product.lenght === 0){

        notFound();
    }


    return (
      <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">
        <div className="col-span-1 md:col-span-2 ">
          <h1>Hola</h1>
        </div>

        <div className="col-span-1 px-5 ">
          <h1 className={`${titleFont.className} antialiased text-xl`}>${product?.title}</h1>
          <p className="text-lg mb-5">${product?.price}</p>




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
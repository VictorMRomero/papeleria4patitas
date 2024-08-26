
export const revalidate = 60;
import { getNewProducts, getProductsWithOffer } from '@/actions';
import { AdsImages, ProductGrid, Title } from '@/components'

import Image from 'next/image';





export default async function Home() {

    const {newProducts} = await getNewProducts({});
    const {productsWithOffer} = await getProductsWithOffer({});



  //todo: cambiar por base de datos
  const images = [
    'https://res.cloudinary.com/dog6zhxr8/image/upload/v1724635287/Ads/RegresoClases/wins7ztoh9t49vf6mzby.png',
    'https://res.cloudinary.com/dog6zhxr8/image/upload/v1724636184/Ads/RegresoClases/eo8ecmcmqk1vw3lqddnj.png'
  ];


  return (
    <div className=''>
      <AdsImages images={images} />


      <Title
        title="Principales Novedades.."
        className='mb-2 '
      />

      <ProductGrid
        products={newProducts}
      />

      <Image

        width={1500}
        height={320}
        src='https://res.cloudinary.com/dog6zhxr8/image/upload/v1706840583/Ads/nvtb8hupokpljvf624z6.png'
        alt='imagen busqueda'
        className="object-fill mt-2 mb-2"

      />
      
      <Title
        title="Principales Descuentos.."
        
        className='mb-2'
      />

      <ProductGrid
        products={productsWithOffer}
      />


      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

        <Image

          width={1500}
          height={320}
          src='https://res.cloudinary.com/dog6zhxr8/image/upload/v1706763865/Ads/nwvp7tcc9y3n7v1yxxew.png'
          alt='imagen busqueda'
          className="object-fill mb-4"
          

        />
        <Image

          width={1500}
          height={320}
          src='https://res.cloudinary.com/dog6zhxr8/image/upload/v1706763865/Ads/qqxiz2ltpd90iddupie8.png'
          alt='imagen busqueda'
          className="object-fill mb-4"

        />
      </div>




    </div>
  )
}

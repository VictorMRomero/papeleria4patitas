
export const revalidate = 60;
import { getNewProducts, getProductsWithOffer } from '@/actions';
import { AdsImages, ProductGrid, Title } from '@/components'

import Image from 'next/image';





export default async function Home() {

  const { newProducts } = await getNewProducts({});
  const { productsWithOffer } = await getProductsWithOffer({});



  //todo: cambiar por base de datos
  const images = [
    'https://res.cloudinary.com/dog6zhxr8/image/upload/v1724904800/Ads/t4lovcsysc0u8hggaufw.png',
    'https://res.cloudinary.com/dog6zhxr8/image/upload/v1724903954/Ads/fxuqaxyodqr4worgfvbj.png'
  ];


  return (
    <div className=''>
      <AdsImages images={images} />


      <Title
        title="Principales Novedades"
        className='mb-2 '
      />

      <ProductGrid
        products={newProducts}
      />

      <Image

        width={1500}
        height={320}
        src='https://res.cloudinary.com/dog6zhxr8/image/upload/v1724638054/Ads/RegresoClases/dihakxceey6vlyyteycz.png'
        alt='imagen busqueda'
        className="object-fill  mt-2 mb-2"

      />

      <Title
        title="Principales Descuentos"

        className='mb-2'
      />

      <ProductGrid
        products={productsWithOffer}
      />
    </div>
  )
}


export const revalidate = 60;
import { getNewProducts, getProductsWithOffer } from '@/actions';
import { AdsImages, ProductGrid, Title } from '@/components'

import Image from 'next/image';
import { redirect } from 'next/navigation';


interface Props {
  searchParams: {
    page: string;
  }
}


export default async function Home({ searchParams }: Props) {

    const {newProducts} = await getNewProducts();
    const {productsWithOffer} = await getProductsWithOffer();



  //todo: cambiar por base de datos
  const images = [

    'https://res.cloudinary.com/dog6zhxr8/image/upload/f_auto,q_100/v1/Ads/dmc8axuimnvb9ms7c8xr',
    'https://res.cloudinary.com/dog6zhxr8/image/upload/v1706763865/Ads/noyqdsawx5a2l6o11a30.png'
  ];

  if (newProducts.length === 0) {
    redirect('/');
  }


  return (
    <div className=''>
      <AdsImages images={images} />

      {/* //<CategoriaGrid /> */}

      <Title
        title="Principales Novedades..."
        
        className='mb-2'
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
        title="Principales Descuentos..."
        
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

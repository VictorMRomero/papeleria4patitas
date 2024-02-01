
export const revalidate = 60;
import { getPaginatedProductsWithImages } from '@/actions';
import { AdsImages, Pagination, ProductGrid, Title } from '@/components'
import { redirect } from 'next/navigation';


interface Props {
  searchParams: {
    page:string;
  }
}


export default async function Home({searchParams}: Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const {products, totalPages} = await getPaginatedProductsWithImages({page});
  
  

  //todo: cambiar por base de datos
  const images = [
    
    'https://res.cloudinary.com/dog6zhxr8/image/upload/f_auto,q_100/v1/Ads/dmc8axuimnvb9ms7c8xr',
    'https://res.cloudinary.com/dog6zhxr8/image/upload/v1706763865/Ads/noyqdsawx5a2l6o11a30.png'
  ];

  if(products.length === 0) {
    redirect('/');
  }

  
  return (
    <div className=''>
      <AdsImages images={images}/>

      <Title 
        title="Principal"
        subtitle='Productos mas vendidos'
        className='mb-2'
      />

      <ProductGrid 
        products={products.slice(0,10)}
      />

      {/* <Pagination 
        totalPages={totalPages}
      /> */}


    </div>
  )
}

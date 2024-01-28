
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
    '/imgs/screen1.svg',
    


  ];

  if(products.length === 0) {
    redirect('/');
  }

  
  return (
    <div className=''>
      <AdsImages images={images}/>

      <Title 
        title="Tienda"
        subtitle='Todos los productos'
        className='mb-2'
      />

      <ProductGrid 
        products={products}
      />

      <Pagination 
        totalPages={totalPages}
      />


    </div>
  )
}

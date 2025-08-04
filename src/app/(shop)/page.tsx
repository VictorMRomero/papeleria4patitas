
export const revalidate = 60;
import { getNewProducts, getProductsWithOffer } from '@/actions';
import { AdsImages, ProductCarousel, Title, BrandsCarousel } from '@/components'
import { StoreProductsSection } from '@/components/home/StoreProductsSection'
import { StoreProductsWithDiscount } from '@/components/home/StoreProductsWithDiscount';
import Image from 'next/image';

export default async function Home() {

  const { newProducts } = await getNewProducts({});
  const { productsWithOffer } = await getProductsWithOffer({});


  //todo: cambiar por base de datos
  const images = [
    'https://res.cloudinary.com/dog6zhxr8/image/upload/v1754251023/Ads/Bienvenida_xf4prw.svg',
    'https://res.cloudinary.com/dog6zhxr8/image/upload/v1754251105/Ads/Lista_jvranr.svg'
  ];
  const brandsImages = [
    {
      id: '1',
      name: 'Scribe',
      logo: 'https://res.cloudinary.com/dog6zhxr8/image/upload/v1754282080/Ads/ScribeLogo_hhamnl.svg',
      slug: 'scribe'
    },
    {
      id: '2',
      name: 'Dixon',
      logo: 'https://res.cloudinary.com/dog6zhxr8/image/upload/v1754282842/Ads/Dixon_Logo_hnzb1y.svg',
      slug: 'Dixon'
    },
    {
      id: '3',
      name: 'Staedtler',
      logo: 'https://res.cloudinary.com/dog6zhxr8/image/upload/v1754281500/Brands/staedtler-logo.png',
      slug: 'staedtler'
    },
    {
      id: '4',
      name: 'Faber-Castell',
      logo: 'https://res.cloudinary.com/dog6zhxr8/image/upload/v1754281500/Brands/faber-castell-logo.png',
      slug: 'faber-castell'
    },
    {
      id: '5',
      name: 'Sharpie',
      logo: 'https://res.cloudinary.com/dog6zhxr8/image/upload/v1754281500/Brands/sharpie-logo.png',
      slug: 'sharpie'
    },
    {
      id: '6',
      name: 'Crayola',
      logo: 'https://res.cloudinary.com/dog6zhxr8/image/upload/v1754281500/Brands/crayola-logo.png',
      slug: 'crayola'
    }
  ]


  return (
    <div className=''>
      <AdsImages images={images} />



      {/* Sección de productos específicos de la tienda seleccionada */}
      <StoreProductsSection />

      {/* Banner de descuentos */}
      <Image
        width={1500}
        height={320}
        src='https://res.cloudinary.com/dog6zhxr8/image/upload/v1754281309/Ads/BannerDescueto_mfogtr.svg'
        alt='imagen busqueda'
        className="object-fill  mt-2 mb-2"

      /> 

      {/* Sección de productos con descuentos */}
      <StoreProductsWithDiscount />

      {/* Carrusel de marcas */}
      <div className="py-8">
        <Title
          title="Nuestras Marcas"
          className='mb-4'
        />
        <BrandsCarousel 
          brands={brandsImages}
          autoPlay={true}
          speed={40}
        />
      </div>



    </div>
  )
}

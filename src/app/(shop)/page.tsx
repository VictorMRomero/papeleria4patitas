
export const revalidate = 60;
import { AdsImages, Title, BrandsCarousel } from '@/components'
import { StoreProductsSection, StoreProductsNewest, StoreProductsWithDiscount, StoreProductsPopular, BenefitsSection, CardsGrid } from '@/components/home'
import Image from 'next/image';

export default async function Home() {

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
      name: 'Crayola',
      logo: 'https://res.cloudinary.com/dog6zhxr8/image/upload/v1754359196/Ads/crayola_vcnokt.svg',
      slug: 'Crayola'
    },
    {
      id: '4',
      name: 'Maped',
      logo: 'https://res.cloudinary.com/dog6zhxr8/image/upload/v1754359251/Ads/1_ygzgxf.svg',
      slug: 'Maped'
    },
    {
      id: '5',
      name: 'Azor',
      logo: 'https://res.cloudinary.com/dog6zhxr8/image/upload/v1754359282/Ads/3_qghqtq.svg',
      slug: 'Azor'
    },
    {
      id: '6',
      name: 'Norma',
      logo: 'https://res.cloudinary.com/dog6zhxr8/image/upload/v1754359405/Ads/Norma_do7alr.svg',
      slug: 'Norma'
    },
    {
      id: '7',
      name: 'Shely',
      logo: 'https://res.cloudinary.com/dog6zhxr8/image/upload/v1754359443/Ads/Shely_qjvv3p.svg',
      slug: 'Shely'
    },
    {
      id: '8',
      name: 'Paper-Mate',
      logo: 'https://res.cloudinary.com/dog6zhxr8/image/upload/v1754359492/Ads/Paper_jlvet9.svg',
      slug: 'Paper-Mate'
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

        {/* Sección de productos mas recientes */}
        <StoreProductsNewest />

      {/* Sección de beneficios */}
      <BenefitsSection />

      {/* Sección de productos mas populares */}
      <StoreProductsPopular />

      {/* Sección de tarjetas */}
      <CardsGrid />


    </div>
  )
}

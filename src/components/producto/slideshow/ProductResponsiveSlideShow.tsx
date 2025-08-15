'use client'

import { useState } from 'react'
import { Swiper as SwiperObject } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import 'swiper/css/pagination'

import './slideshow.css'
import { Autoplay, FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules'
import { ProductImage } from '../product-image/ProductImage'

interface Props {
  images: string[]
  title: string
  className?: string
}

export const ProductResponsiveSlideShow = ({ images, title, className }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>()

  return (
    <div className={className}>
      {/* Main gallery */}
      <Swiper
        style={{
          // Swiper CSS variables for arrows/pagination colors
          '--swiper-navigation-color': '#1f2937',
          '--swiper-pagination-color': '#6b7280',
        } as React.CSSProperties}
        spaceBetween={10}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500 }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay, Pagination]}
        className="w-full h-[220px] sm:h-[300px] md:h-[420px] lg:h-[500px]"
     >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <ProductImage
              width={800}
              height={800}
              src={image}
              alt={title}
              className="rounded-lg w-full h-full object-contain bg-white"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails (desktop only) */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper3 mt-3 hidden md:block h-24"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <ProductImage
              width={200}
              height={200}
              src={image}
              alt={`${title} miniatura`}
              className="w-full h-full object-contain bg-white"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}



'use client'

import Image from "next/image";
import { SwiperSlide, Swiper } from "swiper/react"
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';


import './slideshow.css';
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { ProductImage } from "../product-image/ProductImage";


interface Props {
    images: string[];
    title: string;
    className?: string;
}



export const ProductMobileSlideShow = ({ images, title, className }: Props) => {




    return (
        <div className={className}>

            <Swiper
                style={{
                    width: '95vw',
                    height: '400px'
                }}
                pagination
                autoplay={{
                    delay: 2500
                }}

                modules={[FreeMode, Autoplay, Pagination]}
                className="mySwiper2"
            >
                {
                    images.map(image => (

                        <SwiperSlide key={image}>   
                            <ProductImage

                                width={380}
                                height={380}
                                src={image}
                                alt={title}
                                className="rounded-lg object-fill w-full"
                            />
                        </SwiperSlide>

                    ))

                }



            </Swiper>

        </div>
    )
}   
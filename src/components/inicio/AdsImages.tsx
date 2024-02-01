'use client'

import { Swiper, SwiperSlide } from "swiper/react";
//import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "./styles.css";
import Image from "next/image";
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';

interface Props {
    images: string[];

}

export const AdsImages = ({ images }: Props) => {
    return (

        <div className="w-[95vw] h-[300px] lg:w-full sm:h-auto">
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',

                } as React.CSSProperties}
                spaceBetween={30}
                effect={'fade'}
                navigation={true}
                autoplay={{
                    delay: 4500
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[EffectFade, Navigation, Pagination, Autoplay]}
                className="mySwiperPrincipal"
            >
                {
                    images.map(image => (

                        <SwiperSlide key={image} className="mySwiperPrincipal-slide">
                            <Image

                                width={1500}
                                height={500}
                                src={image}
                                alt={image}
                                className="myImagen rounded-lg object-fill"

                            />
                        </SwiperSlide>

                    ))

                }


            </Swiper>
        </div>





    )
}

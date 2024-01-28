'use client'

import { Swiper, SwiperSlide } from "swiper/react";
//import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "./styles.css";
import Image from "next/image";
import { EffectFade, Navigation, Pagination } from 'swiper/modules';

interface Props {
    images: string[];

}

export const AdsImages = ({ images }: Props) => {
    return (

        <div className="w-[100vw] h-[300px] sm:w-full sm:h-auto">
            <Swiper

                spaceBetween={30}
                effect={'fade'}
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                modules={[EffectFade, Navigation, Pagination]}
                className="mySwiperPrincipal"
            >
                {
                    images.map(image => (

                        <SwiperSlide key={image} className="mySwiperPrincipal-slide">
                            <Image

                                width={600}
                                height={600}
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

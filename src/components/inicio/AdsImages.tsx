'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "./styles.css";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';

interface Props {
    images: string[];
}

export const AdsImages = ({ images }: Props) => {
    return (
        // Contenedor principal que se convierte en un grid en pantallas grandes
        <div className="container mx-auto px-2 sm:px-4 mt-6">
            <div className="w-full lg:grid lg:grid-cols-3 lg:gap-4 flex flex-col space-y-4 lg:space-y-0">
                {/* Carrusel Principal */}
                <div className="lg:col-span-2 rounded-xl shadow-lg overflow-hidden">
                    <Swiper
                        style={{
                            '--swiper-navigation-color': '#000',
                            '--swiper-pagination-color': '#000',
                        } as React.CSSProperties}
                        spaceBetween={30}
                        effect={'fade'}                    
                        autoplay={{
                            delay: 5500
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[EffectFade, Navigation, Pagination, Autoplay]}
                        className="mySwiperPrincipal"
                    >
                        {
                            images.map((image) => (
                                <SwiperSlide key={image} className="mySwiperPrincipal-slide">
                                    <div className="relative w-full">
                                        <Image
                                            width={1000}
                                            height={600}
                                            src={image}
                                            alt="Banner publicitario"
                                            className="w-full h-auto object-contain"
                                            priority
                                        />
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>

                {/* Banners Secundarios - Se apilan en móvil y se colocan a la derecha en desktop */}
                <div className="flex flex-col space-y-2 lg:space-y-4">
                    {/* Banner Superior */}
                    <Link href="/category/ofertas" className="block group">
                        <div className="relative rounded-xl overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl">
                            <Image
                                src="https://res.cloudinary.com/dog6zhxr8/image/upload/v1754252321/Ads/oferta_articulos_jphp9n.svg" // Reemplaza con tu imagen
                                alt="Banner celulares y accesorios"
                                width={500}
                                height={300}
                                className="w-auto h-[80px] lg:h-auto object-contain"
                                priority
                            />
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 lg:hidden flex items-center justify-center p-4">
                                <div className="text-center text-white">
                                    <div className="flex items-center justify-center gap-2 mb-1">
                                        <span className="text-xs font-medium opacity-90">Hasta</span>
                                        <div className="bg-white text-red-600 font-bold text-lg px-3 py-1 rounded-full shadow-lg transform -rotate-2 group-hover:rotate-0 transition-transform duration-300">
                                            15%
                                        </div>
                                        <span className="text-xs font-medium opacity-90">OFF</span>
                                    </div>
                                    <p className="text-xs font-medium leading-tight">
                                        Mochilas y lapiceras
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Banner Inferior */}
                    <Link href="/category/ofertas" className="block group">
                        <div className="relative rounded-xl overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl">
                            <Image
                                src="https://res.cloudinary.com/dog6zhxr8/image/upload/v1754252321/Ads/oferta_articulos_jphp9n.svg" // Reemplaza con tu imagen
                                alt="Banner looks juveniles"
                                width={500}
                                height={300}
                                className="w-full h-[80px] lg:h-auto object-contain"
                                priority
                            />
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 lg:hidden flex items-center justify-center p-4">
                                <div className="text-center text-white">
                                    <div className="flex items-center justify-center gap-2 mb-1">
                                        <span className="text-xs font-medium opacity-90">Hasta</span>
                                        <div className="bg-white text-orange-600 font-bold text-lg px-3 py-1 rounded-full shadow-lg transform rotate-2 group-hover:rotate-0 transition-transform duration-300">
                                            40%
                                        </div>
                                        <span className="text-xs font-medium opacity-90">OFF</span>
                                    </div>
                                    <p className="text-xs font-medium leading-tight">
                                        Celulares y accesorios
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

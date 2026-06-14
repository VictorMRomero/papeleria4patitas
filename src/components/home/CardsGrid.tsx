import Image from 'next/image';
import Link from 'next/link';
import { whatsappUrl } from '@/config/contact';

export const CardsGrid = () => {
    // Definir las imágenes y sus enlaces en un array de objetos
    const cards = [
        {
            src: 'https://res.cloudinary.com/dog6zhxr8/image/upload/v1754364532/Ads/1_wzjmnq.svg', // Reemplaza con la URL de tu imagen
            alt: 'Decoraciones',
            link: '/category/all',
        },
        {
            src: 'https://res.cloudinary.com/dog6zhxr8/image/upload/v1754364535/Ads/3_jc6fvv.svg', // Reemplaza con la URL de tu imagen
            alt: 'Obten los beneficios',
            link: '/category/ofertas',
        },
        {
            src: 'https://res.cloudinary.com/dog6zhxr8/image/upload/v1754364533/Ads/2_rp5ky9.svg', // Reemplaza con la URL de tu imagen
            alt: 'Nuestros Servicios',
            link: whatsappUrl('Hola 👋, quiero información sobre sus servicios.'),
        },
        {
            src: 'https://res.cloudinary.com/dog6zhxr8/image/upload/v1754364537/Ads/4_zpcmov.svg', // Reemplaza con la URL de tu imagen
            alt: 'Crea tu cuenta',
            link: '/auth/new-account',
        },
    ];

    return (
        <div className="container mx-auto my-10 md:my-16 lg:my-20 px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6 md:gap-8">
                {cards.map((card, index) => {
                    const isExternal = card.link.startsWith('http');
                    const inner = (
                        <div className="group relative rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer">
                            <Image
                                src={card.src}
                                alt={card.alt}
                                width={500}
                                height={500}
                                // La clase object-cover asegura que la imagen cubra todo el contenedor sin distorsionarse
                                className="w-full h-full object-cover aspect-square"
                            />
                        </div>
                    );
                    return isExternal ? (
                        <a key={index} href={card.link} target="_blank" rel="noopener noreferrer">
                            {inner}
                        </a>
                    ) : (
                        <Link key={index} href={card.link}>
                            {inner}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};
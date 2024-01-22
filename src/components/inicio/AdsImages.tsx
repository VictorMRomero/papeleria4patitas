'use client'



import { useState } from 'react';
import Image from 'next/image';


export const AdsImages = ({ images }: any) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        const newIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(newIndex);
    };

    

    return (

        <div className="flex items-center justify-center  w-full mt-4">
            {/* {/* <div className="flex items-center justify-center h-[500px]">  */}
                {images.map((image, index) => (
                    <Image
                        key={index}
                        src={image}
                        alt={`Slide ${index + 1}`}
                        onClick={nextSlide}
                        width={800}
                        height={600} // Define a fixed height for images
                        // Ensure images fill the container width
                        className={`w-full transition-opacity duration-300 ${index === currentIndex ? 'opacity-100' : 'hidden'}`}
                    />
                ))}
            {/* </div>  */}

        </div>

    )
}

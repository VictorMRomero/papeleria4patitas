'use client'

import { Product, ProductStore } from "@/interfaces"
import { ProductCarouselItem } from "./ProductCarouselItem"
import { ViewMoreCard } from "./ViewMoreCard"
import { useState } from "react"
import { IoChevronBack, IoChevronForward } from "react-icons/io5"

type CarouselItem = ProductStore | { type: 'viewMore'; link: string; text: string };

interface Props {
  storeProducts: ProductStore[]
  viewMoreLink?: string
  viewMoreText?: string
}

export const ProductCarousel = ({
  storeProducts,
  viewMoreLink = "/category/all",
  viewMoreText = "Ver más productos"
}: Props) => {
  const [currentPage, setCurrentPage] = useState(0);

  // Limitar a un máximo de 9 productos para la paginación
  const displayProducts = storeProducts.slice(0, 9);
  const hasMultiplePages = displayProducts.length > 5;

  // Definir los items para cada página
  const pageOneItems: CarouselItem[] = displayProducts.slice(0, 5);
  const pageTwoItems: CarouselItem[] = [
    ...displayProducts.slice(5, 9),
    { type: 'viewMore', link: viewMoreLink, text: viewMoreText }
  ];

  const itemsToShow = currentPage === 0 ? pageOneItems : pageTwoItems;

  const goToPreviousPage = () => {
    setCurrentPage(0);
  }

  const goToNextPage = () => {
    setCurrentPage(1);
  }

  return (
    <div className="relative group">
      {/* Botones de navegación para desktop - Solo si hay más de 5 productos */}
      {hasMultiplePages && (
        <>
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 0}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-blue-100 hover:scale-125 shadow-lg rounded-full p-2  transition-opacity duration-300 hidden lg:flex items-center justify-center disabled:hidden disabled:cursor-not-allowed"
          >
            <IoChevronBack className="w-8 h-8 text-gray-700" />
          </button>

          <button
            onClick={goToNextPage}
            disabled={currentPage === 1}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-blue-100  hover:scale-125 shadow-lg rounded-full p-2  transition-opacity duration-300 hidden lg:flex items-center justify-center disabled:hidden disabled:cursor-not-allowed"
          >
            <IoChevronForward className="w-8 h-8 text-gray-700" />
          </button>
        </>
      )}

      {/* --- Comportamiento para Móvil y Tablet (Scroll) --- */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 px-2 scroll-smooth lg:hidden">
        {displayProducts.map((productStore) => (
          <div key={productStore.product.slug} className="flex-none">
            <ProductCarouselItem productStore={productStore} />
          </div>
        ))}
        <div className="flex-none">
          <ViewMoreCard link={viewMoreLink} text={viewMoreText} />
        </div>
      </div>
      
      {/* --- Comportamiento para Desktop (Grid Paginado) --- */}
      <div className="hidden lg:grid grid-cols-5 gap-4 px-2">
        {itemsToShow.map((item) => {
          const isViewMore = 'type' in item && item.type === 'viewMore';
          return (
            <div key={isViewMore ? 'viewMoreCard' : (item as ProductStore).product.slug}>
              {isViewMore ? (
                <ViewMoreCard link={item.link} text={item.text} />
              ) : (
                <ProductCarouselItem productStore={item as ProductStore} />
              )}
            </div>
          );
        })}
      </div>

      {/* --- Indicadores --- */}
      <div className="flex justify-center mt-4">
        {/* Indicador de scroll para móvil */}
        <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full lg:hidden">
          Desliza para ver más →
        </div>

        {/* Indicadores de página para desktop */}
        {hasMultiplePages && (
          <div className="hidden lg:flex justify-center space-x-2">
            {Array.from({ length: 2 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentPage ? 'bg-blue-500' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
'use client'
import { getProductFuzzySearch } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { NoEncontrado } from "./ui/NoEncontrado";
import Image from "next/image";
import { useStoreStore } from "@/store";
import { useEffect, useState } from "react";
import { ProductStore } from "@/interfaces";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SearchContent() {
    const searchParams = useSearchParams();
    const productSearch = searchParams.get('productSearch') || '';
    const pageParam = searchParams.get('page') || '1';
    const page = parseInt(pageParam);

    const { selectedStore } = useStoreStore()
    const [storeProducts, setStoreProducts] = useState<ProductStore[]>([])
    const [loading, setLoading] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
  
    useEffect(() => {
      const fetchStoreProducts = async () => {
        if (selectedStore?.id && productSearch.trim()) {
          setLoading(true)
          try {
            const result = await getProductFuzzySearch(selectedStore.id, productSearch)
            if (result && Array.isArray(result)) {
              setStoreProducts(result)
              setTotalPages(Math.ceil(result.length / 20)) // Asumiendo 20 productos por página
            } else {
              setStoreProducts([])
              setTotalPages(0)
            }
          } catch (error) {
            console.error('Error fetching store products:', error)
            setStoreProducts([])
            setTotalPages(0)
          } finally {
            setLoading(false)
          }
        } else {
          setStoreProducts([])
          setTotalPages(0)
        }
      }
  
      fetchStoreProducts()
    }, [selectedStore?.id, productSearch])
  
    // No mostrar nada si no hay tienda seleccionada
    if (!selectedStore) {
      return null
    }

    // No mostrar nada si no hay término de búsqueda
    if (!productSearch || productSearch.trim() === '') {
        return <NoEncontrado />
    }
  
    // Mostrar loading state
    if (loading) {
      return (
        <div className="py-8">
          <Title
            title={`Buscando productos...`}
            className='mb-2'
          />
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        </div>
      )
    }
  
    // No mostrar nada si no hay productos
    if (storeProducts.length === 0) {
      return (
        <div className="mt-6">
          <div className="rounded-xl overflow-hidden">
            <Image
              width={1500}
              height={320}
              src='https://res.cloudinary.com/dog6zhxr8/image/upload/v1706763864/Ads/bu0xxz15orrumrqsukzs.png'
              alt='imagen busqueda'
              className="w-full h-40 sm:h-56 lg:h-72 object-cover"
            />
          </div>
          <div className="mt-6">
            <Title
              title={`No se encontraron productos para: ${productSearch}`}
              subtitle='Intenta con otros términos de búsqueda'
            />
          </div>
        </div>
      )
    }

    return (
        <div className="mt-6">
            <div className="rounded-xl overflow-hidden">
                <Image
                    width={1500}
                    height={320}
                    src='https://res.cloudinary.com/dog6zhxr8/image/upload/v1706763864/Ads/bu0xxz15orrumrqsukzs.png'
                    alt='imagen busqueda'
                    className="w-full h-40 sm:h-56 lg:h-72 object-cover"
                />
            </div>

            <div className="mt-6 flex items-end justify-between gap-4">
                <Title
                    title={`Resultados para: ${productSearch}`}
                    subtitle=''
                />
                <span className="text-sm text-gray-500 mb-2">Página {page} de {totalPages}</span>
            </div>

            <ProductGrid products={storeProducts} />
            <Pagination totalPages={totalPages} />
        </div>
    )
}

export default function Search() {
    return (
        <Suspense fallback={null}>
            <SearchContent />
        </Suspense>
    )
}
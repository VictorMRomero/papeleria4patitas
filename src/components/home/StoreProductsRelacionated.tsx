'use client'

import { useEffect, useState } from 'react'
import { useStoreStore } from '@/store'
import { getProductFuzzySearch } from '@/actions'
import { ProductStore } from '@/interfaces'
import { ProductCarousel, Title } from '@/components'

export const StoreProductsRelacionated = ({ term, currentProductId }: { term: string, currentProductId: string }) => {
  const { selectedStore } = useStoreStore()
  const [storeProducts, setStoreProducts] = useState<ProductStore[]>([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchStoreProducts = async () => {
      if (selectedStore?.id) {
        setLoading(true)
        try {

          const result = await getProductFuzzySearch(selectedStore.id, term)
          setStoreProducts(result.filter((product: ProductStore) => product.product.id !== currentProductId))
        } catch (error) {
          console.error('Error fetching store products:', error)
          setStoreProducts([])
        } finally {
          setLoading(false)
        }
      } else {
        setStoreProducts([])
      }
    }

    fetchStoreProducts()
  }, [selectedStore?.id])

  // No mostrar nada si no hay tienda seleccionada
  if (!selectedStore) {
    return null
  }

  // Mostrar loading state
  if (loading) {
    return (
      <div className="py-8">
        <Title
          title={`Productos que te pueden interesar`}
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
    return null
  }
  
  return (
    <div className="py-4">
      <Title
        title={`Productos que te pueden interesar`}
        className='mb-2'
      />
      <ProductCarousel
        storeProducts={storeProducts}
        viewMoreLink={`/store/${selectedStore.id}/products`}
        viewMoreText={`Ver todos los productos de ${selectedStore.name}`}
      />
    </div>
  )
}
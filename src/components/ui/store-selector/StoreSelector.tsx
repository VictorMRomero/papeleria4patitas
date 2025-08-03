'use client'

import { getAllStoresActive } from "@/actions"
import { Store } from "@/interfaces"
import { useStoreStore } from "@/store"
import { useEffect, useState } from "react"
import {
  IoStorefrontOutline,
  IoLocationOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline
} from "react-icons/io5"

export const StoreSelector = () => {
  const [stores, setStores] = useState<Store[]>([])
  const [loading, setLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  
  const { selectedStore, setSelectedStore, isStoreSelected, clearSelectedStore } = useStoreStore()

  useEffect(() => {
    // Si no hay tienda seleccionada, mostrar el modal
    if (!isStoreSelected()) {
      setIsVisible(true)
      fetchStores()
    }
  }, [isStoreSelected])

  // Exponer función para uso global
  useEffect(() => {
    // @ts-ignore - Agregar función global para debuggear
    ;(window as any).openStoreSelector = openSelector
    ;(window as any).clearStore = handleClearStore
  }, [])

  // También escuchar evento personalizado para abrir selector
  useEffect(() => {
    const handleOpenSelector = () => {
      setIsVisible(true)
      fetchStores()
    }

    window.addEventListener('openStoreSelector', handleOpenSelector)
    return () => window.removeEventListener('openStoreSelector', handleOpenSelector)
  }, [])

  const fetchStores = async () => {
    setLoading(true)
    
    try {
      // Primero probar con tiendas activas
      let result = await getAllStoresActive()
      
      // Si no hay tiendas activas, probar con todas las tiendas
      if (!result.stores || result.stores.length === 0) {
        const { getAllStores } = await import('@/actions')
        result = await getAllStores()
      }
      
      if (result.stores && result.stores.length > 0) {
        setStores(result.stores)
      } else {
        // Usar datos de ejemplo si no hay tiendas de la API
        const fallbackStores = [
          {
            id: 'fallback-1',
            name: 'Papelería 4 Patitas Centro',
            address: 'Av. Principal 123, Centro',
            phone: '+52 123 456 7890',
            isActive: true
          },
          {
            id: 'fallback-2', 
            name: 'Papelería 4 Patitas Norte',
            address: 'Blvd. Norte 456, Col. Norte',
            phone: '+52 123 456 7891',
            isActive: true
          },
          {
            id: 'fallback-3',
            name: 'Papelería 4 Patitas Sur',
            address: 'Calle Sur 789, Col. Sur',
            phone: '+52 123 456 7892',
            isActive: true
          }
        ]
        setStores(fallbackStores)
      }
    } catch (error) {
      console.error('Error fetching stores:', error)
      
      // Datos de ejemplo si falla la API completamente
      const fallbackStores = [
        {
          id: 'error-1',
          name: 'Papelería Centro',
          address: 'Av. Principal 123, Centro',
          phone: '+52 123 456 7890',	
          isActive: true
        },
        {
          id: 'error-2', 
          name: 'Papelería Norte',
          address: 'Blvd. Norte 456, Col. Norte',
          phone: '+52 123 456 7891',
          isActive: true
        }
      ]
      setStores(fallbackStores)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectStore = (store: Store) => {
    setSelectedStore(store)
    setIsVisible(false)
  }

  const handleChangeStore = () => {
    setIsVisible(true)
    if (stores.length === 0) {
      fetchStores()
    }
  }

  const handleClearStore = () => {
    clearSelectedStore()
    setIsVisible(true)
    fetchStores()
  }

  // Función pública para abrir el selector desde cualquier parte
  const openSelector = () => {
    setIsVisible(true)
    if (stores.length === 0) {
      fetchStores()
    }
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
          <div className="flex items-center gap-3">
            <IoStorefrontOutline className="w-8 h-8" />
            <div>
              <h2 className="text-2xl font-bold">Selecciona tu Tienda</h2>
              <p className="text-green-100 mt-1">
                Elige la sucursal más cercana a tu ubicación
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
              <span className="ml-3 text-gray-600 dark:text-gray-300">
                Cargando tiendas...
              </span>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {stores.map((store) => (
                <button
                  key={store.id}
                  onClick={() => handleSelectStore(store)}
                  className="w-full p-4 rounded-lg border-2 border-gray-200 dark:border-gray-600 hover:border-green-500 dark:hover:border-green-500 transition-all duration-200 text-left group hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors">
                      <IoStorefrontOutline className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                        {store.name}
                      </h3>
                      
                      <div className="flex items-start gap-1 mt-1">
                        <IoLocationOutline className="w-4 h-4 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {store.address}
                        </p>
                      </div>
                      
                      
                      {store.phone && (
                        <p className="text-sm text-green-600 dark:text-green-400 mt-1 font-medium">
                          {store.phone}
                        </p>
                      )}
                    </div>

                    <div className="flex-shrink-0">
                      <IoCheckmarkCircleOutline className="w-6 h-6 text-gray-300 group-hover:text-green-500 transition-colors" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {!loading && stores.length === 0 && (
            <div className="text-center py-12">
              <IoCloseCircleOutline className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No hay tiendas disponibles
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Por favor, intenta de nuevo más tarde
              </p>
              <button
                onClick={fetchStores}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Reintentar
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 dark:bg-gray-900 px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Puedes cambiar de tienda en cualquier momento
            </p>
            
            {selectedStore && (
              <button
                onClick={handleClearStore}
                className="text-xs text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 underline"
              >
                Limpiar selección
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
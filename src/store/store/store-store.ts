import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Store } from '@/interfaces/store.interface'

interface StoreState {
  selectedStore: Store | null
  setSelectedStore: (store: Store) => void
  clearSelectedStore: () => void
  isStoreSelected: () => boolean
}

export const useStoreStore = create<StoreState>()(
  persist(
    (set, get) => ({
      selectedStore: null,

      setSelectedStore: (store: Store) => {
        set({ selectedStore: store })
      },

      clearSelectedStore: () => {
        set({ selectedStore: null })
      },

      isStoreSelected: () => {
        const { selectedStore } = get()
        return selectedStore !== null && selectedStore.id !== ''
      },
    }),
    {
      name: 'selected-store-storage',
    }
  )
)
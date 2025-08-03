export interface Store {
  id: string
  name: string
  address: string
  phone?: string
  email?: string
  isActive: boolean
}

export interface StoreState {
  selectedStore: Store | null
  setSelectedStore: (store: Store) => void
  clearSelectedStore: () => void
  isStoreSelected: () => boolean
}
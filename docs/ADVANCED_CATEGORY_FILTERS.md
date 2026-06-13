# Sistema de Filtros Avanzados para Categorías

## 🚀 Características

Este sistema implementa un sidebar completo de filtros que aprovecha todas las funcionalidades de tu backend `searchStoreProducts`.

### ✨ Filtros Disponibles

#### 1. **Categorías y Navegación**
- ✅ Navegación inteligente entre categorías y subcategorías
- ✅ Opción "Todos los productos" 
- ✅ Opción "Ofertas"
- ✅ Categorías hermanas (si estás en una subcategoría)
- ✅ Subcategorías (si estás en una categoría principal)

#### 2. **Filtros de Precio**
- ✅ **Slider dual** con controles de precio mínimo y máximo
- ✅ **Inputs numéricos** como alternativa
- ✅ **Formato de moneda** ($1,000 - $50,000)
- ✅ **Validación automática** (mínimo ≤ máximo)

#### 3. **Stock y Disponibilidad**
- ✅ **Estado del stock**: Cualquier stock, Solo en stock, Stock bajo, Sin stock
- ✅ **Stock mínimo personalizable**
- ✅ **Solo productos online**

#### 4. **Descuentos**
- ✅ **Tipo de descuento**: Cualquier descuento, Solo con descuento, Mínimo descuento
- ✅ **Porcentaje mínimo** personalizable (0-100%)

#### 5. **Características Especiales**
- ✅ **Productos nuevos** (días personalizables)
- ✅ **Vistas mínimas** (popularidad)
- ✅ **Stock mínimo** personalizable

#### 6. **Ordenamiento**
- ✅ **Nombre**: A-Z, Z-A
- ✅ **Precio**: Menor a Mayor, Mayor a Menor
- ✅ **Fecha**: Más Recientes, Más Antiguos
- ✅ **Popularidad**: Más Vistos
- ✅ **Descuento**: Mayor Descuento

## 🛠️ Componentes Principales

### 1. **AdvancedCategorySidebar**
```tsx
import { AdvancedCategorySidebar } from '@/components/categorias'

<AdvancedCategorySidebar
  categories={categories}
  currentCategory={currentCategory}
  onFiltersChange={handleFiltersChange}
  onCategoryChange={handleCategoryChange}
  initialFilters={filters}
/>
```

### 2. **AdvancedCategoryLayout**
```tsx
import { AdvancedCategoryLayout } from '@/components/categorias'

<AdvancedCategoryLayout 
  categories={allCategories} 
  currentCategory={category}
  images={categoryImages}
>
  {/* Contenido de la página */}
</AdvancedCategoryLayout>
```

### 3. **useProductSearch Hook**
```tsx
import { useProductSearch } from '@/hooks'

const {
  products,
  total,
  totalPages,
  loading,
  error,
  filters,
  updateFilters,
  clearFilters
} = useProductSearch({
  storeId,
  categorySlug: currentCategory?.slug,
  page: currentPage,
  limit: 20
})
```

## 🔧 Implementación

### 1. **Configurar la Acción del Backend**
```typescript
// src/actions/store/products-store/search-store-products.ts
export const searchStoreProducts = async (
  storeId: string,
  searchDto: SearchProductsDto
) => {
  // Implementa la llamada a tu endpoint /store/${storeId}/products/search
}
```

### 2. **Usar en la Página de Categorías**
```tsx
// src/app/(shop)/category/[nameCategory]/page.tsx
import { AdvancedCategoryLayout } from '@/components/categorias'

export default async function categoryPage({ params, searchParams }: Props) {
  // ... lógica existente ...
  
  return (
    <AdvancedCategoryLayout 
      categories={allCategories} 
      currentCategory={category}
      images={categoryImages}
    >
      <CategoryBreadcrumb categoryName={category.title} />
      <Title title={category.title} />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </AdvancedCategoryLayout>
  )
}
```

### 3. **Manejar Cambios de Filtros**
```tsx
const handleFiltersChange = (newFilters: SearchFilters) => {
  // Los filtros se aplican automáticamente
  // La URL se actualiza con los parámetros
  // Los productos se refrescan en tiempo real
}
```

## 🌐 URL Parameters

El sistema mantiene automáticamente los filtros en la URL:

```
/category/electronics?minPrice=1000&maxPrice=5000&inStock=true&sortBy=price&sortOrder=ASC
```

**Parámetros soportados:**
- `minPrice`, `maxPrice` - Rango de precios
- `inStock` - Solo productos en stock
- `hasDiscount` - Solo con descuento
- `minDiscount` - Descuento mínimo (%)
- `newProductsDays` - Productos nuevos (días)
- `minViews` - Vistas mínimas
- `onlineOnly` - Solo productos online
- `minStock` - Stock mínimo
- `sortBy` - Campo de ordenamiento
- `sortOrder` - Dirección (ASC/DESC)

## 🎨 Personalización

### **Estilos CSS**
```css
/* src/components/categorias/CategorySidebar.module.css */
.priceSlider {
  /* Personalizar apariencia de sliders */
}

.sidebarSection {
  /* Personalizar secciones del sidebar */
}
```

### **Opciones de Filtros**
```typescript
// Modificar en AdvancedCategorySidebar.tsx
const SORT_OPTIONS = [
  { value: 'custom-field', label: 'Campo Personalizado' }
]

const STOCK_OPTIONS = [
  { value: 'custom-stock', label: 'Stock Personalizado' }
]
```

## 📱 Responsive Design

- ✅ **Sidebar fijo** en desktop (320px)
- ✅ **Controles táctiles** optimizados para móvil
- ✅ **Secciones colapsibles** para ahorrar espacio
- ✅ **Adaptativo** a diferentes tamaños de pantalla

## 🔄 Estado y Persistencia

- ✅ **Estado local** con React hooks
- ✅ **URL sync** automático
- ✅ **Persistencia** entre navegaciones
- ✅ **Reset automático** de página al cambiar filtros

## 🚀 Ventajas del Sistema

1. **Completo**: Aprovecha todas las funcionalidades de tu backend
2. **Intuitivo**: UI clara y fácil de usar
3. **Responsive**: Funciona en todos los dispositivos
4. **Eficiente**: Actualización en tiempo real
5. **Persistente**: Mantiene estado en URL
6. **Extensible**: Fácil agregar nuevos filtros
7. **Accesible**: Navegación por teclado y screen readers

## 🔍 Debugging

### **Ver Filtros Activos**
```tsx
console.log('Filtros actuales:', filters)
```

### **Ver Parámetros de URL**
```tsx
console.log('URL params:', searchParams.toString())
```

### **Ver Respuesta del Backend**
```tsx
// En searchStoreProducts
console.log('Backend response:', response.data)
```

## 📚 Ejemplos de Uso

### **Filtro Básico de Precio**
```tsx
updateFilters({ 
  minPrice: 1000, 
  maxPrice: 5000 
})
```

### **Filtro de Stock y Descuento**
```tsx
updateFilters({ 
  inStock: true, 
  hasDiscount: true, 
  minDiscount: 20 
})
```

### **Ordenamiento Personalizado**
```tsx
updateFilters({ 
  sortBy: 'createdAt', 
  sortOrder: 'DESC' 
})
```

## 🎯 Próximos Pasos

1. **Integrar con tu backend** existente
2. **Personalizar estilos** según tu marca
3. **Agregar filtros adicionales** si es necesario
4. **Implementar cache** para mejor rendimiento
5. **Agregar analytics** de uso de filtros

---

¿Necesitas ayuda con alguna implementación específica? ¡Estoy aquí para ayudarte! 🚀

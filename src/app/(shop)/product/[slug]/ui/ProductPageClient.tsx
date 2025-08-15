'use client'

import { useEffect, useState } from 'react';
import { ProductGrid, ProductResponsiveSlideShow, Title } from "@/components";
import { AddtoCart } from "./AddtoCart";
import { currencyFormat } from "@/utils";
import { Product, ProductStore } from "@/interfaces";
import { getProductStoreBySlug } from "@/actions/store/products-store/get-product-store";
import {
  IoCheckmarkCircleOutline,
  IoStorefrontOutline,
  IoPricetagOutline,
  IoAlertCircleOutline,
  IoTimeOutline,
  IoCubeOutline
} from 'react-icons/io5'
import { StoreProductsRelacionated } from '@/components/home/StoreProductsRelacionated';

interface ProductPageClientProps {
  productStore: ProductStore;

  slug: string;
}

export function ProductPageClient({
  productStore: initialProductStore,

  slug
}: ProductPageClientProps) {
  const [productStore, setProductStore] = useState<ProductStore>(initialProductStore);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función para recargar el producto (útil si cambia la tienda)
  const reloadProduct = async () => {
    setLoading(true);
    setError(null);

    try {
      // Obtener storeId del localStorage (ya que estamos en cliente)
      const storeId = localStorage.getItem('selected-store-storage')
        ? JSON.parse(localStorage.getItem('selected-store-storage')!).state.selectedStore?.id
        : null;

      if (storeId) {
        const newProductStore = await getProductStoreBySlug(storeId, slug);
        setProductStore(newProductStore);
      } else {
        // Si no hay tienda, redirigir al home
        window.location.href = '/';
        return;
      }
    } catch (err) {
      setError('Error al cargar el producto');
      console.error('Error reloading product:', err);
    } finally {
      setLoading(false);
    }
  };

  // Escuchar cambios en la tienda seleccionada
  useEffect(() => {
    const handleStoreChange = () => {
      reloadProduct();
    };

    // Escuchar el evento personalizado cuando cambia la tienda
    window.addEventListener('storeChanged', handleStoreChange);

    return () => {
      window.removeEventListener('storeChanged', handleStoreChange);
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-lg font-semibold text-gray-700">
            Cargando producto...
          </h2>
          <p className="text-gray-500 mt-1">
            Estamos obteniendo la información más actualizada
          </p>
        </div>
      </div>
    );
  }

  if (error || !productStore) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <IoAlertCircleOutline className="text-red-500 text-6xl mx-auto mb-3" />
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            {error || 'Producto no encontrado'}
          </h2>
          <button
            onClick={reloadProduct}
            className="mt-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  const currentProduct = productStore.product;
  const basePrice = productStore.price;
  const discount = productStore.discount || 0;
  const finalPrice = discount > 0 ? basePrice - (discount * basePrice) / 100 : basePrice;
  const savings = discount > 0 ? (discount * basePrice) / 100 : 0;

  // Preparar imágenes para los slideshows
  const productImages = productStore.product.images?.map(img => img.url) || [];

  return (
    <>
      <div className="mb-2 flex items-center gap-2">
        <span className="inline-flex items-center gap-1 text-green-700 bg-green-100 mt-2 px-2 py-0.5 rounded-full text-xs font-medium">
          <IoCheckmarkCircleOutline className="h-4 w-4" /> Disponible en tienda
        </span>
        {discount > 0 && (
          <span className="inline-flex items-center gap-1 text-red-700 bg-red-100 px-2 py-0.5 rounded-full text-xs font-medium">
            <IoPricetagOutline className="h-4 w-4" /> {discount}% OFF
          </span>
        )}
      </div>

      <div className="mt-2 mb-16 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Galería de imágenes */}
        <div className="col-span-1">
          <div className="rounded-xl border bg-gray-50 p-2 shadow-sm">
            <ProductResponsiveSlideShow
              title={currentProduct.title}
              images={productImages as string[]}
            />
          </div>
        </div>

        {/* Información del producto */}
        <div className="col-span-1 lg:sticky lg:top-24 space-y-5">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {currentProduct.title}
              <span className="text-blue-500">.</span>
            </h1>
            <p className="text-blue-500 text-sm mt-1 inline-flex items-center gap-1">
              <IoStorefrontOutline className="h-4 w-4" /> Recoge en tienda
            </p>
          </div>

          {/* Precio */}
          <div className="rounded-xl border bg-white p-4 shadow-sm">
            {discount > 0 ? (
              <div className="flex items-end gap-3">
                <span className="text-3xl font-bold text-red-600">
                  {currencyFormat(finalPrice)}
                </span>
                <span className="text-sm line-through text-gray-500">
                  {currencyFormat(basePrice)}
                </span>
                <span className="ml-auto text-xs text-red-700 bg-red-100 px-2 py-0.5 rounded-full font-medium">
                  Ahorras {currencyFormat(savings)}
                </span>
              </div>
            ) : (
              <span className="text-2xl md:text-3xl font-bold text-gray-800">
                {currencyFormat(basePrice)}
              </span>
            )}
            <p className="text-xs text-gray-500 mt-2">
              El precio podría variar al de tienda.
            </p>
          </div>

          {/* Datos rápidos */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border bg-white p-3">
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <IoCubeOutline className="h-4 w-4" /> Stock
              </div>
              <div className="mt-1 font-semibold text-gray-800">
                {productStore.stock > 5 ? `Aun hay suficientes unidades` : 'Quedan pocas unidades'}
              </div>
            </div>
            <div className="rounded-lg border bg-white p-3">
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <IoTimeOutline className="h-4 w-4" /> Código
              </div>
              <div className="mt-1 font-semibold text-gray-800 truncate">
                {currentProduct.slug}
              </div>
            </div>
          </div>

          {/* Tags TODO: poder clickear y buscar por tag*/}
          {currentProduct.tags?.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Etiquetas</h3>
              <div className="flex flex-wrap gap-2">
                {currentProduct.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full border">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          {/* Detalles del producto */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Detalles del producto
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {currentProduct.description}
            </p>
          </div>

          {/* Método de entrega */}
          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <h3 className="text-base font-semibold text-gray-900 mb-1">
              Método de entrega
            </h3>
            <p className="text-sm text-gray-600 flex items-start gap-2">
              <IoTimeOutline className="h-5 w-5 mt-0.5 text-gray-500" />
              Para recoger en tienda, los pedidos suelen tardar de 5 a 30 minutos en estar listos.
            </p>
          </div>

          {/* Botón de agregar al carrito */}
          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <AddtoCart
              product={currentProduct}
              productStore={productStore}
            />
          </div>


        </div>
      </div>

      {/* Productos relacionados */}

        <div className="mt-12">
          <StoreProductsRelacionated term={currentProduct.tags[0]} currentProductId={currentProduct.id} />
        </div>
  
    </>
  );
}

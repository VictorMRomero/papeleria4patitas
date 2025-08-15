export const revalidate = 604800; //7 dias

import { notFound, redirect } from "next/navigation";
import { titleFont } from "@/config/fonts";
import { Title } from "@/components";
import { getProductBySlug, getProductByTerm, getProductsByText } from "@/actions";
import { Metadata, ResolvingMetadata } from "next";
import { AddtoCart } from "./ui/AddtoCart";
import { currencyFormat } from "@/utils";
import { Product, ProductStore } from "@/interfaces";
import { getProductStoreBySlug } from "@/actions/store/products-store/get-product-store";
import { cookies } from 'next/headers';
import { ProductPageClient } from "./ui/ProductPageClient";

interface Props {
  params: Promise<{
    slug: string;
  }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const cookieStore = await cookies();
    const storeId = cookieStore.get('storeId')?.value;
    
    if (!storeId) {
      return {
        title: 'Selecciona una tienda',
        description: 'Debes seleccionar una tienda para ver los productos'
      };
    }
    
    const storeProduct = await getProductStoreBySlug(storeId, slug);
    const product = storeProduct?.product;
    
    if (!product) {
      return {
        title: 'Producto no encontrado',
        description: 'El producto solicitado no está disponible en esta tienda'
      };
    }
    
    return {
      title: product.title,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: product.images?.map((img: { url: string }) => img.url) || []
      }
    };
  } catch (error) {
    return {
      title: 'Error al cargar producto',
      description: 'Hubo un problema al cargar la información del producto'
    };
  }
}

export default async function ProductBySlugPage({ params }: Props) {
  const { slug } = await params;
  
  try {
    const cookieStore = await cookies();
    const storeId = cookieStore.get('storeId')?.value;
    
    // Si no hay tienda seleccionada, redirigir al home
    if (!storeId) {
      redirect('/');
    }
    
    // Obtener producto de la tienda
    const productStore = await getProductStoreBySlug(storeId, slug);
    
    if (!productStore) {
      notFound();
    }
    
    // Obtener productos relacionados
    let relatedProducts: Product[] = [];
    try {
      relatedProducts = await getProductsByText(productStore.product.tags[0]);
      relatedProducts = relatedProducts.filter(p => p.id !== productStore.product.id);
    } catch (error) {
      console.warn('Error fetching related products');
    }
    
    return (
      <ProductPageClient 
        productStore={productStore}
        relatedProducts={relatedProducts}
        slug={slug}
      />
    );
    
  } catch (error) {
    console.error('Error in product page:', error);
    notFound();
  }
}


export const revalidate = 60;

import { 
  getAllProducts, 
  getCategoryBySlug, 
  getProductsWithOffer, 
  getProductsByCategoryStore,
} from "@/actions";
import { Pagination, ProductGrid, Title, EmptyCategory, CategoryHeader, CategoryBreadcrumb, CategoryStats } from "@/components";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { cookies } from 'next/headers';

interface Props {
    params: Promise<{
        nameCategory: string;
    }>,
    searchParams: Promise<{
        page?: string;
    }>
}

export default async function categoryPage({ params, searchParams }: Props) {
    try {
        const { nameCategory } = await params;
        const searchParamsResolved = await searchParams;
        const page = searchParamsResolved.page ? parseInt(searchParamsResolved.page) : 1;

        // Caso especial para ofertas
        if (nameCategory === 'ofertas') {
            const { productsWithOffer, totalPages } = await getProductsWithOffer({ page });

            return (
                <div className="mt-10">
                    <Image
                        width={1500}
                        height={320}
                        src='https://res.cloudinary.com/dog6zhxr8/image/upload/v1706763864/Ads/bu0xxz15orrumrqsukzs.png'
                        alt='imagen busqueda'
                        className="object-fill mb-4"
                    />
                    <Title
                        title="Ofertas"
                        subtitle="Productos con descuentos especiales"
                    />
                    <ProductGrid products={productsWithOffer} />
                    <Pagination totalPages={totalPages} />
                </div>
            );
        }

        // Caso especial para todos los productos
        if (nameCategory === 'all') {
            const { products, totalPages } = await getAllProducts({ page });

            return (
                <div className="mt-10">
                    <Image
                        width={1500}
                        height={320}
                        src='https://res.cloudinary.com/dog6zhxr8/image/upload/v1706763864/Ads/bu0xxz15orrumrqsukzs.png'
                        alt='imagen busqueda'
                        className="object-fill mb-4"
                    />
                    <Title
                        title="Todos los Productos"
                        subtitle="Explora nuestra colección completa"
                    />
                    <ProductGrid products={products} />
                    <Pagination totalPages={totalPages} />
                </div>
            );
        }

        // Obtener información de la categoría
        const category = await getCategoryBySlug(nameCategory);
        
        if (!category) {
            notFound();
        }

        // Obtener storeId de las cookies
        const cookieStore = await cookies();
        const storeId = cookieStore.get('storeId')?.value;
        
        // Si no hay tienda seleccionada, redirigir al home
        if (!storeId) {
          redirect('/');
        }
        
        // Obtener productos de la categoría (puede retornar null)
        const response = await getProductsByCategoryStore(storeId, nameCategory, page);

        // Normalizar respuesta nula a estructura vacía
        const products = response?.products ?? [];
        const total = response?.total ?? 0;
        const totalPages = response?.totalPages ?? 1;

        // Si no hay productos, mostrar componente EmptyCategory
        if (!products || products.length === 0) {
            return (
                <div className="mt-10">
                    <Image
                        width={1500}
                        height={320}
                        src='https://res.cloudinary.com/dog6zhxr8/image/upload/v1706763864/Ads/bu0xxz15orrumrqsukzs.png'
                        alt='imagen busqueda'
                        className="object-fill mb-4"
                    />
                    <CategoryBreadcrumb categoryName={category.title} />
                    <Title
                        title={category.title}
                        subtitle={`Productos de ${category.title}`}
                        className='mb-2'
                    />
                    <EmptyCategory category={category} />
                </div>
            );
        }

        // Mostrar productos de la categoría
        return (
            <div className="mt-10">
                <Image
                    width={1500}
                    height={320}
                    src='https://res.cloudinary.com/dog6zhxr8/image/upload/v1706763864/Ads/bu0xxz15orrumrqsukzs.png'
                    alt='imagen busqueda'
                    className="object-fill mb-4"
                />
                <CategoryBreadcrumb categoryName={category.title} />
                <Title
                    title={category.title}
                    subtitle={`${total} productos en ${category.title}`}
                    className='mb-2'
                />
                
                {category.description && (
                    <div className="mb-6 text-center">
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            {category.description}
                        </p>
                    </div>
                )}

                <CategoryStats 
                    totalProducts={total}
                    currentPage={page}
                    totalPages={totalPages}
                />

                <ProductGrid products={products} />
                
                {totalPages > 1 && (
                    <Pagination totalPages={totalPages} />
                )}
            </div>
        );

    } catch (error) {
        console.error('Error in category page:', error);
        notFound();
    }
}


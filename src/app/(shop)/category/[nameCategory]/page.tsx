export const revalidate = 60;

import { 
  getAllProducts, 
  getCategoryBySlug, 
  getProductsWithOffer, 
  getProductsByCategoryStore,
  getCategories,
  searchStoreProducts
} from "@/actions";
import { 
  Pagination, 
  ProductGrid, 
  Title, 
  EmptyCategory, 
  CategoryHeader, 
  CategoryBreadcrumb, 
  CategoryStats,
  AdvancedCategoryLayout
} from "@/components";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { cookies } from 'next/headers';

interface Props {
    params: Promise<{
        nameCategory: string;
    }>,
    searchParams: Promise<{
        page?: string;
        minPrice?: string;
        maxPrice?: string;
        sort?: string;
        inStock?: string;
        hasDiscount?: string;
        minDiscount?: string;
        newProductsDays?: string;
        minViews?: string;
        onlineOnly?: string;
        minStock?: string;
    }>
}

export default async function categoryPage({ params, searchParams }: Props) {
    try {
        const { nameCategory } = await params;
        const searchParamsResolved = await searchParams;
        const page = searchParamsResolved.page ? parseInt(searchParamsResolved.page) : 1;
        
        // Obtener filtros de los parámetros de búsqueda
        const filters = {
            minPrice: searchParamsResolved.minPrice ? parseInt(searchParamsResolved.minPrice) : undefined,
            maxPrice: searchParamsResolved.maxPrice ? parseInt(searchParamsResolved.maxPrice) : undefined,
            inStock: searchParamsResolved.inStock ? searchParamsResolved.inStock === 'true' : undefined,
            hasDiscount: searchParamsResolved.hasDiscount ? searchParamsResolved.hasDiscount === 'true' : undefined,
            minDiscount: searchParamsResolved.minDiscount ? parseInt(searchParamsResolved.minDiscount) : undefined,
            newProductsDays: searchParamsResolved.newProductsDays ? parseInt(searchParamsResolved.newProductsDays) : undefined,
            minViews: searchParamsResolved.minViews ? parseInt(searchParamsResolved.minViews) : undefined,
            onlineOnly: searchParamsResolved.onlineOnly ? searchParamsResolved.onlineOnly === 'true' : undefined,
            minStock: searchParamsResolved.minStock ? parseInt(searchParamsResolved.minStock) : undefined,
            sortBy: searchParamsResolved.sort ? searchParamsResolved.sort.split('-')[0] as 'title' | 'price' | 'createdAt' | 'views' | 'discount' : 'title',
            sortOrder: searchParamsResolved.sort ? searchParamsResolved.sort.split('-')[1] as 'ASC' | 'DESC' : 'ASC'
        };

        // Obtener todas las categorías para el sidebar
        const allCategories = await getCategories();
        
        // Definir imágenes para el carrusel
        const categoryImages = [
            'https://res.cloudinary.com/dog6zhxr8/image/upload/v1706763864/Ads/bu0xxz15orrumrqsukzs.png'
            // Aquí puedes agregar más imágenes según la categoría
        ];

        // Obtener storeId de las cookies (necesario para todos los casos)
        const cookieStore = await cookies();
        const storeId = cookieStore.get('storeId')?.value;
        
        // Si no hay tienda seleccionada, redirigir al home
        if (!storeId) {
          redirect('/');
        }

        // Caso especial para ofertas
        if (nameCategory === 'ofertas') {
            const searchDto = {
                limit: 20,
                offset: (page - 1) * 20,
                hasDiscount: true,
                sortBy: 'createdAt' as const,
                sortOrder: 'DESC' as const
            };
            
            const response = await searchStoreProducts(storeId, searchDto);
            const products = response?.products ?? [];
            const total = response?.total ?? 0;
            const totalPages = response?.totalPages ?? 1;
            const highestPrice = response?.highestPrice ?? 100000;

            return (
                <AdvancedCategoryLayout 
                    categories={allCategories} 
                    images={categoryImages}
                    highestPrice={highestPrice}
                >
                    <Title
                        title="Ofertas"
                        subtitle="Productos con descuentos especiales"
                    />
                    <ProductGrid products={products} />
                    <Pagination totalPages={totalPages} />
                </AdvancedCategoryLayout>
            );
        }

        // Caso especial para todos los productos
        if (nameCategory === 'all') {
            const searchDto = {
                limit: 20,
                offset: (page - 1) * 20,
                sortBy: 'title' as const,
                sortOrder: 'ASC' as const
            };
            
            const response = await searchStoreProducts(storeId, searchDto);
            const products = response?.products ?? [];
            const total = response?.total ?? 0;
            const totalPages = response?.totalPages ?? 1;
            const highestPrice = response?.highestPrice ?? 100000;

            return (
                <AdvancedCategoryLayout 
                    categories={allCategories} 
                    images={categoryImages}
                    highestPrice={highestPrice}
                >
                    <Title
                        title="Todos los Productos"
                        subtitle="Explora nuestra colección completa"
                    />
                    <ProductGrid products={products} />
                    <Pagination totalPages={totalPages} />
                </AdvancedCategoryLayout>
            );
        }

        // Caso especial para productos más nuevos
        if (nameCategory === 'newest') {
            const searchDto = {
                limit: 20,
                offset: (page - 1) * 20,
                sortBy: 'createdAt' as const,
                sortOrder: 'DESC' as const
            };
            
            const response = await searchStoreProducts(storeId, searchDto);
            const products = response?.products ?? [];
            const total = response?.total ?? 0;
            const totalPages = response?.totalPages ?? 1;
            const highestPrice = response?.highestPrice ?? 100000;

            return (
                <AdvancedCategoryLayout 
                    categories={allCategories} 
                    images={categoryImages}
                    highestPrice={highestPrice}
                >
                    <Title
                        title="Productos Más Nuevos"
                        subtitle="Descubre nuestras últimas incorporaciones"
                    />
                    <ProductGrid products={products} />
                    <Pagination totalPages={totalPages} />
                </AdvancedCategoryLayout>
            );
        }

        // Obtener información de la categoría
        const category = await getCategoryBySlug(nameCategory);
        
        if (!category) {
            notFound();
        }


        
        // Obtener productos de la categoría con filtros (puede retornar null)
        const searchDto = {
            limit: 20,
            offset: (page - 1) * 20,
            categorySlug: category.slug,
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
            inStock: filters.inStock,
            hasDiscount: filters.hasDiscount,
            minDiscount: filters.minDiscount,
            newProductsDays: filters.newProductsDays,
            minViews: filters.minViews,
            onlineOnly: filters.onlineOnly,
            minStock: filters.minStock,
            sortBy: filters.sortBy,
            sortOrder: filters.sortOrder
        };
        
        
        const response = await searchStoreProducts(storeId, searchDto);

        // Normalizar respuesta nula a estructura vacía
        const products = response?.products ?? [];
        const total = response?.total ?? 0;
        const totalPages = response?.totalPages ?? 1;
        const highestPrice = response?.highestPrice ?? 100000;

        // Si no hay productos, mostrar componente EmptyCategory
        if (!products || products.length === 0) {
            return (
                <AdvancedCategoryLayout 
                    categories={allCategories} 
                    currentCategory={category}
                    images={categoryImages}
                    highestPrice={highestPrice}
                >
                    <CategoryBreadcrumb categoryName={category.title} />
                    <Title
                        title={category.title}
                        subtitle={`Productos de ${category.title}`}
                        className='mb-2'
                    />
                    <EmptyCategory category={category} />
                </AdvancedCategoryLayout>
            );
        }

        // Mostrar productos de la categoría
        return (
            <AdvancedCategoryLayout 
                categories={allCategories} 
                currentCategory={category}
                images={categoryImages}
                highestPrice={highestPrice}
            >
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



                <ProductGrid products={products} />
                
                {totalPages > 1 && (
                    <Pagination totalPages={totalPages} />
                )}

<CategoryStats 
                    totalProducts={total}
                    currentPage={page}
                    totalPages={totalPages}
                />
            </AdvancedCategoryLayout>
        );

    } catch (error) {
        console.error('Error in category page:', error);
        notFound();
    }
}
import { Category } from '@/interfaces';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  category: Category;
}

export const EmptyCategory = ({ category }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-6">
        <Image
          src="/imgs/placeholder.jpg"
          alt="Categoría vacía"
          width={200}
          height={200}
          className="rounded-lg opacity-50"
        />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        No hay productos en {category.title}
      </h2>
      
      <p className="text-gray-600 mb-6 max-w-md">
        Por el momento no tenemos productos disponibles en esta categoría. 
        Te invitamos a explorar otras categorías o volver más tarde.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/category/all"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Ver todos los productos
        </Link>
        
        <Link
          href="/category/ofertas"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Ver ofertas
        </Link>
        
        <Link
          href="/"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

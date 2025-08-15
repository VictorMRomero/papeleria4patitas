import Link from 'next/link';
import { IoChevronForward, IoHomeOutline } from 'react-icons/io5';

interface Props {
  categoryName: string;
}

export const CategoryBreadcrumb = ({ categoryName }: Props) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      <Link 
        href="/" 
        className="flex items-center hover:text-blue-600 transition-colors"
      >
        <IoHomeOutline className="w-4 h-4 mr-1" />
        Inicio
      </Link>
      
      <IoChevronForward className="w-4 h-4" />
      
      <Link 
        href="/category/all" 
        className="hover:text-blue-600 transition-colors"
      >
        Categorías
      </Link>
      
      <IoChevronForward className="w-4 h-4" />
      
      <span className="text-gray-800 font-medium">
        {categoryName}
      </span>
    </nav>
  );
};

import Link from 'next/link';
import React from 'react';
import { IoAddCircleOutline, IoCreateOutline } from 'react-icons/io5';

interface ContextMenuProps {
  x: number;
  y: number;
  urlProduct: string;
  // opcionUrl: string;
  onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, urlProduct, onClose }) => {
  return (
    <div 
      className="fixed bg-white dark:text-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-lg rounded-md py-2 z-50"
      style={{ top: y, left: x }}
    >
      <ul className='text-sm'>
        <Link href={`/admin/product/${urlProduct}`} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer flex items-center"><IoCreateOutline className="w-5 h-5 mr-3"/> Editar Producto</Link>
        <Link href={'/admin/product/new'} className="px-4 py-2 hover:bg-gray-100  dark:hover:bg-gray-600 cursor-pointer flex items-center"><IoAddCircleOutline className="w-5 h-5 mr-3"/>Agregar un nuevo producto</Link>
      </ul>
    </div>
  );
};

export default ContextMenu;
import { IoStatsChartOutline, IoGridOutline, IoEyeOutline } from 'react-icons/io5';

interface Props {
  totalProducts: number;
  currentPage: number;
  totalPages: number;
}

export const CategoryStats = ({ totalProducts, currentPage, totalPages }: Props) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="flex flex-col items-center">
          <IoGridOutline className="w-8 h-8 text-blue-500 mb-2" />
          <span className="text-2xl font-bold text-gray-800">{totalProducts}</span>
          <span className="text-sm text-gray-600">Productos totales</span>
        </div>
        
        <div className="flex flex-col items-center">
          <IoStatsChartOutline className="w-8 h-8 text-green-500 mb-2" />
          <span className="text-2xl font-bold text-gray-800">{currentPage}</span>
          <span className="text-sm text-gray-600">Página actual</span>
        </div>
        
        <div className="flex flex-col items-center">
          <IoEyeOutline className="w-8 h-8 text-purple-500 mb-2" />
          <span className="text-2xl font-bold text-gray-800">{totalPages}</span>
          <span className="text-sm text-gray-600">Páginas totales</span>
        </div>
      </div>
    </div>
  );
};

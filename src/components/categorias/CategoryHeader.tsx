import { Category } from '@/interfaces';
import { Title } from '@/components';

interface Props {
  category: Category;
  productCount: number;
}

export const CategoryHeader = ({ category, productCount }: Props) => {
  return (
    <div className="text-center mb-8">
      <Title
        title={category.title}
        subtitle={`${productCount} producto${productCount !== 1 ? 's' : ''} en ${category.title}`}
        className="mb-4"
      />
      
      {category.description && (
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-600 text-lg leading-relaxed">
            {category.description}
          </p>
        </div>
      )}
      
      {category.subcategories && category.subcategories.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-500 mb-3">
            Subcategorías disponibles:
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {category.subcategories.map((subcategory) => (
              <span
                key={subcategory.id}
                className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm transition-colors"
              >
                {subcategory.title}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

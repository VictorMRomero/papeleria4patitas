import React, { useState } from 'react';

interface NewCategory {
  title: string;
  description: string;
}

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCategory: (category: NewCategory) => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ isOpen, onClose, onAddCategory }) => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Previene el envío del formulario
    e.stopPropagation(); // Detiene la propagación del evento


    if (categoryName.trim()) {
      onAddCategory({ title: categoryName.trim(), description: categoryDescription.trim() });
      setCategoryName('');
      setCategoryDescription('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (

    



    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl text-black dark:text-white" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Agregar Nueva Categoría</h2>
        <form onSubmit={handleSubmit}>
          {/* ... (resto del formulario sin cambios) ... */}
          <div className="mb-4">
          <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Nombre
          </label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="categoryDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Descripción
          </label>
          <textarea
            id="categoryDescription"
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            rows={3}
          ></textarea>
        </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Agregar Categoría
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
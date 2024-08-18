'use client'
import { getProductsByText, getViewProducts } from "@/actions";
import { Product } from "@/interfaces";
import { useEffect, useState } from "react";



interface BarraBusquedaProps {
    onSearchResults: (results: Product[]) => void;
  }

export const BarraBusqueda: React.FC<BarraBusquedaProps> = ({ onSearchResults }) => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          if (query.length > 2) {
            const data = await getProductsByText(query);
            if (Array.isArray(data)) {
              onSearchResults(data);
            } else {
              onSearchResults([]);
            }
          } else if (query.length < 3) {
            const {products} = await getViewProducts({});
            onSearchResults(products);
          } else {
            onSearchResults([]);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          onSearchResults([]);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [query]);

    return(
        <div className="flex px-2 flex-row relative">
            <input
                type="text"
                className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded-3xl shadow text-lg full w-full h-16 py-4 pl-16 transition-shadow focus:shadow-2xl focus:outline-none"

                placeholder="Buscar..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}

            />
            <div className="absolute left-5 top-3 px-2 py-2 rounded-full text-whitefocus:outline-none bg-indigo-900 hover:bg-blue-600 transition-colors duration-300 ">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
      </div>
    )
}
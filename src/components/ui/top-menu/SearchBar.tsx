'use client';

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export const SearchBar = () => {
    const [searchText, setSearchText] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
  
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
    };
  
    const handleSearch = () => {
      if (searchText.trim().length >= 3) {
        router.push(`/search?productSearch=${encodeURIComponent(searchText.trim())}`);
        setSearchText('');
        
        if (inputRef.current) {
            inputRef.current.blur();
          }
      }
    };
  
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    };
    
    return (
      <div className="flex-grow flex items-center rounded-full overflow-hidden bg-gray-300 dark:bg-gray-700 shadow-md">
        <input
          ref={inputRef}
          value={searchText}
          onChange={handleSearchChange}
          onKeyDown={handleKeyPress}
          type="text"
          className="flex-grow p-2 text-sm dark:text-white placeholder-gray-400 bg-transparent focus:outline-none"
          placeholder="Buscar..."
        />
        <button
          onClick={handleSearch}
          className="p-2 focus:outline-none bg-blue-500 hover:bg-blue-600 transition-colors duration-300 "
          aria-label="Search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    )
}

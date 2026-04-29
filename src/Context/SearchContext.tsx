// context/SearchContext.tsx
import React, { createContext, useContext, useState } from 'react';
import type { SearchFilters } from '../services/dashboardapi';

interface SearchContextValue {
  filters: SearchFilters;
  setFilters: (f: SearchFilters) => void;
}

const SearchContext = createContext<SearchContextValue>({
  filters: {},
  setFilters: () => {},
});

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<SearchFilters>({});
  return (
    <SearchContext.Provider value={{ filters, setFilters }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
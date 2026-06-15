import React, { createContext, useContext, useState, type ReactNode } from 'react';

// Define the shape of the data stored in the cache
interface DataCache {
  experiences?: any[];
  skills?: any[];
  [key: string]: any; // Allows for additional dynamic keys
}

// Define the shape of the context itself
interface DataCacheContextType {
  cache: DataCache;
  updateCache: (key: keyof DataCache, data: any) => void;
}

const DataCacheContext = createContext<DataCacheContextType | undefined>(undefined);

export const DataCacheProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cache, setCache] = useState<DataCache>({});

  const updateCache = (key: keyof DataCache, data: any) => {
    setCache((prev) => ({
      ...prev,
      [key]: data,
    }));
  };

  return (
    <DataCacheContext.Provider value={{ cache, updateCache }}>
      {children}
    </DataCacheContext.Provider>
  );
};

export const useDataCache = () => {
  const context = useContext(DataCacheContext);
  if (!context) {
    throw new Error('useDataCache must be used within a DataCacheProvider');
  }
  return context;
};
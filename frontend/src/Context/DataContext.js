// DataContext.js
import React, { createContext, useState, useContext } from 'react';

// Create the context
const DataContext = createContext();

// Custom hook to use the context
export const useData = () => {
  return useContext(DataContext);
};

// Provider component
export const DataProvider = ({ children }) => {
  // Initial state for the data
  const [data, setData] = useState({
    locationCoor: null,
    spotType: null,
    startTime: null,
    duration: null,
  });

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

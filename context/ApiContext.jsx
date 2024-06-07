import React, { createContext, useContext } from 'react';
import api from "../api"

// Create context
const ApiContext = createContext();

// Provider component
export const ApiProvider = ({ children }) => {
  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  );
};

// Custom hook to use API
export const useApi = () => {
  return useContext(ApiContext);
};

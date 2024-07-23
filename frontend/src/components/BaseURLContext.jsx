// src/components/BaseURLContext.jsx
import React, { createContext, useContext } from 'react';

const BaseURLContext = createContext('http://localhost:5000');

export const BaseURLProvider = ({ children }) => {
  const baseURL = 'http://localhost:5000'; // Your base URL here

  return (
    <BaseURLContext.Provider value={baseURL}>
      {children}
    </BaseURLContext.Provider>
  );
};

export const useBaseURL = () => useContext(BaseURLContext);

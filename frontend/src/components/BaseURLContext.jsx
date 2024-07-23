// src/components/BaseURLContext.jsx
import React, { createContext, useContext } from 'react';

const BaseURLContext = createContext('https://tablesprint-task.onrender.com');

export const BaseURLProvider = ({ children }) => {
  const baseURL = 'https://tablesprint-task.onrender.com'; // Your base URL here

  return (
    <BaseURLContext.Provider value={baseURL}>
      {children}
    </BaseURLContext.Provider>
  );
};

export const useBaseURL = () => useContext(BaseURLContext);

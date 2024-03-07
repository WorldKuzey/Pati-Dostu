
/*
// src/contexts/TokenContext.js
import React, { createContext, useContext, useState } from 'react';

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('accessToken') || '');

  const setAccessToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem('accessToken', newToken);
  };

  const removeAccessToken = () => {
    setToken('');
    localStorage.removeItem('accessToken');
  };

  return (
    <TokenContext.Provider value={{ token, setAccessToken, removeAccessToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  return useContext(TokenContext);
};
 */
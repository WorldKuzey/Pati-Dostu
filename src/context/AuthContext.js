// AuthContext.js

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || null);
  const [userId, setUserId] = useState(localStorage.getItem('userId') || null);


  const login = (token, userId) => { //oradan alınıyor bunlar
    
    setAccessToken(token);
    setUserId(userId);
    localStorage.setItem(userId, token);

    
  };
  
  
  // Örnek bir logout fonksiyonu //userId sine göre silicez ozaman oradan modelin user Idsini alcaz
const logout = () => {
  

  localStorage.removeItem(userId); //BU KISMI YAPIYOR FAKAT BİZİM userId SİLMEMİZ GEREK KEY OLARAK

  };

  return (
    <AuthContext.Provider value={{ accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

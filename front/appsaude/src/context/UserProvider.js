// src/context/UserContext.js
import React, { createContext, useState, useContext } from 'react';

// Criação do Context
const UserContext = createContext();

// Provedor de Contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);  // Salva os dados do usuário após o login
  };

  const logout = () => {
    setUser(null);  // Remove os dados do usuário ao fazer logout
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para consumir os dados do Context
export const useUser = () => {
  return useContext(UserContext);
};

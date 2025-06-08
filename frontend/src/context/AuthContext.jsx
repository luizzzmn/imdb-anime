// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('usuarioLogado');
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    }
  }, []);

  const login = (user, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('usuarioLogado', JSON.stringify(user));
    setUsuario(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioLogado');
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

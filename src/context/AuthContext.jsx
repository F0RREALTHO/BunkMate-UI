import React, { createContext, useState, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [username, setUsername] = useState(
    token ? jwtDecode(token).sub : null
  );

  const login = async (name, password) => {
    const response = await api.post('/student/login', { name, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    const decodedToken = jwtDecode(token);
    setToken(token);
    setUsername(decodedToken.sub);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUsername(null);
  };

  const authContextValue = {
    token,
    username,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
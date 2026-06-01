'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { login as apiLogin, register as apiRegister } from './api';

interface User {
  id: string;
  email: string;
  name: string;
  accountType: string;
  phone?: string;
  location?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    name: string;
    accountType?: string;
    phone?: string;
    location?: string;
  }) => Promise<void>;
  logout: () => void;
  updateAccountType: (type: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load session from localStorage on mount
  useEffect(() => {
    try {
      const savedToken = localStorage.getItem('kl_token');
      const savedUser = localStorage.getItem('kl_user');
      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }
    } catch {
      // Invalid stored data, clear it
      localStorage.removeItem('kl_token');
      localStorage.removeItem('kl_user');
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const response = await apiLogin(email, password);
    const { token: newToken, user: newUser } = response.data;
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('kl_token', newToken);
    localStorage.setItem('kl_user', JSON.stringify(newUser));
  }, []);

  const register = useCallback(async (data: {
    email: string;
    password: string;
    name: string;
    accountType?: string;
    phone?: string;
    location?: string;
  }) => {
    const response = await apiRegister(data);
    const { token: newToken, user: newUser } = response.data;
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('kl_token', newToken);
    localStorage.setItem('kl_user', JSON.stringify(newUser));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('kl_token');
    localStorage.removeItem('kl_user');
  }, []);

  const updateAccountType = useCallback((type: string) => {
    if (user) {
      const updatedUser = { ...user, accountType: type };
      setUser(updatedUser);
      localStorage.setItem('kl_user', JSON.stringify(updatedUser));
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        register,
        logout,
        updateAccountType,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

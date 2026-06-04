'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  login as cognitoLogin,
  register as cognitoRegister,
  logout as cognitoLogout,
  getCurrentUser,
  getAccessToken,
  User,
} from './auth';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  sessionExpired: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    name: string;
    accountType?: string;
    phone?: string;
  }) => Promise<void>;
  logout: () => void;
  updateAccountType: (type: string) => void;
  refreshSession: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionExpired, setSessionExpired] = useState(false);

  // Load session from stored tokens on mount
  useEffect(() => {
    async function restoreSession() {
      try {
        if (typeof window === 'undefined') {
          setIsLoading(false);
          return;
        }

        const currentUser = getCurrentUser();
        if (!currentUser) {
          // No stored user at all — genuinely not logged in
          setIsLoading(false);
          return;
        }

        // User exists in storage — try to get a valid token
        setUser(currentUser);

        // getAccessToken handles refresh internally — give it a chance
        const validToken = await getAccessToken();
        if (validToken) {
          setToken(validToken);
        } else {
          // Token expired and refresh failed — mark session as expired but keep user
          setSessionExpired(true);
        }
      } catch {
        console.warn('Session restore error — marking session expired');
        const currentUser = getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          setSessionExpired(true);
        }
      }
      setIsLoading(false);
    }

    restoreSession();
  }, []);

  // Periodic token refresh — refresh 5 minutes before expiry (every 55 minutes)
  useEffect(() => {
    if (!token || sessionExpired) return;

    const REFRESH_INTERVAL = 55 * 60 * 1000; // 55 minutes

    const interval = setInterval(async () => {
      try {
        const freshToken = await getAccessToken();
        if (freshToken) {
          setToken(freshToken);
        } else {
          setSessionExpired(true);
        }
      } catch {
        setSessionExpired(true);
      }
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [token, sessionExpired]);

  const login = useCallback(async (email: string, password: string) => {
    const result = await cognitoLogin(email, password);
    // Store ID token (used by API Gateway Cognito Authorizer)
    setToken(result.tokens.idToken);
    setUser(result.user);
    setSessionExpired(false);
    await new Promise(resolve => setTimeout(resolve, 100));
  }, []);

  const register = useCallback(async (data: {
    email: string;
    password: string;
    name: string;
    accountType?: string;
    phone?: string;
  }) => {
    const result = await cognitoRegister(data);
    // After registration, auto-login the user
    if (result.userId) {
      try {
        const loginResult = await cognitoLogin(data.email, data.password);
        setToken(loginResult.tokens.idToken);
        setUser(loginResult.user);
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch {
        // If auto-login fails (e.g. email not confirmed), that's ok
        // User will need to login manually
      }
    }
  }, []);

  const logout = useCallback(() => {
    cognitoLogout();
    setToken(null);
    setUser(null);
    setSessionExpired(false);
  }, []);

  const refreshSession = useCallback(async () => {
    try {
      const validToken = await getAccessToken();
      if (validToken) {
        setToken(validToken);
        setSessionExpired(false);
      }
    } catch {
      // Refresh failed — session remains expired
    }
  }, []);

  const updateAccountType = useCallback((type: string) => {
    if (user) {
      const updatedUser = { ...user, accountType: type };
      setUser(updatedUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem('kl_user', JSON.stringify(updatedUser));
      }
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token && !sessionExpired,
        isLoading,
        sessionExpired,
        login,
        register,
        logout,
        updateAccountType,
        refreshSession,
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


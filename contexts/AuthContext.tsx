'use client';
import { createContext, useContext, useState } from 'react';

interface User {
  uid: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>({ uid: 'demo-user', email: 'demo@example.com' });
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    // Simulate login
    setTimeout(() => {
      setUser({ uid: 'demo-user', email });
      setLoading(false);
    }, 1000);
  };

  const register = async (email: string, password: string) => {
    setLoading(true);
    // Simulate registration
    setTimeout(() => {
      setUser({ uid: 'demo-user', email });
      setLoading(false);
    }, 1000);
  };

  const logout = async () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

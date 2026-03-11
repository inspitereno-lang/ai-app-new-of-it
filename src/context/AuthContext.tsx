import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = localStorage.getItem('youlearn_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, _password: string): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          id: '1',
          name: email.split('@')[0],
          email,
          avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`,
        };
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('youlearn_user', JSON.stringify(mockUser));
        resolve(true);
      }, 1000);
    });
  };

  const signup = async (name: string, email: string, _password: string): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          id: '1',
          name,
          email,
          avatar: `https://ui-avatars.com/api/?name=${name}&background=random`,
        };
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('youlearn_user', JSON.stringify(mockUser));
        resolve(true);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('youlearn_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
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

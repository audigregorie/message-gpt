import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { checkAuthStatus, loginUser } from '../helpers/api-communicator';
import { User, UserAuth } from '../interface/common.interface';

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkStatus() {
      try {
        const data = await checkAuthStatus();
        if (data) {
          setUser({ name: data.name, email: data.email });
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Failed to check auth status:', error);
      }
    }

    checkStatus();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await loginUser(email, password);
      if (data) {
        setUser({ name: data.name, email: data.email });
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // Not implemented
  const signup = async (name: string, email: string, password: string) => {
    console.log('Signup called with:', { name, email, password });
  };

  // Not implemented
  const logout = async () => {
    console.log('Logout called');
    setUser(null);
    setIsLoggedIn(false);
  };

  const value: UserAuth = {
    user,
    isLoggedIn,
    login,
    logout,
    signup
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

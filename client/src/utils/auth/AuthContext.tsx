import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { checkAuthStatus, loginUser, logoutUser, signupUser } from '../api/api-communicator';
import { User, UserAuth } from '../common.interface';

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
      } catch (err) {
        console.error('Failed to check auth status:', err);
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
    } catch (err: any) {
      console.error('Failed to login user:', err);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const data = await signupUser(name, email, password);
      if (data) {
        setUser({ name: data.name, email: data.email });
        setIsLoggedIn(true);
      }
    } catch (err: any) {
      console.error('Failed to login user:', err);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setIsLoggedIn(false);
      setUser(null);
    } catch (err: any) {
      console.error('Failed to logout user:', err);
    }
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

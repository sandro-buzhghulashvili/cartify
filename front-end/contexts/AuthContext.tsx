'use client';
import { createContext, ReactNode, useContext } from 'react';
import Cookies from 'js-cookie';

interface AuthContextType {
  login: (data: any) => void;
  logout: () => void;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const authContext = createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const login = (data: any) => {
    if (!data || !data.success) return;
    console.log(data);
    if (data.token) {
      Cookies.set('token', data.token, {
        expires: 7,
      });
    }
    if (data.user) {
      const userData = Object.keys(data.user).map((prop: any) => {
        if (
          prop === 'email' ||
          prop === 'username' ||
          prop === 'phoneNumber' ||
          prop === 'lastLogin' ||
          prop === 'companyName'
        ) {
          return prop;
        } else {
          return null;
        }
      });
      userData.forEach((prop: string) => {
        if (prop) {
          Cookies.set(prop, data.user[prop], {
            expires: 7,
          });
        }
      });
    }
  };
  const logout = () => {};

  const contextValue: AuthContextType = {
    login,
    logout,
  };
  return (
    <authContext.Provider value={contextValue}>{children}</authContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx: AuthContextType = useContext(authContext);

  return ctx;
};

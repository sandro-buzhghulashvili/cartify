'use client';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { revalidateDashboard } from '@/components/auth/revalidateDashboard';
import { useMutation } from 'react-query';
import { logoutFn } from '@/api/auth';
import { revalidateLandingPage } from '@/components/auth/revalidateLandingPage';

interface AuthContextType {
  login: (data: any) => void;
  logout: () => void;
  userData: any;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const authContext = createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
  userData: {},
});

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [userData, setUserData] = useState<any>(null);

  const router = useRouter();

  const { mutate: signOut } = useMutation({
    mutationFn: logoutFn,
    onSuccess: () => {
      revalidateLandingPage();
      router.push('/');
      setUserData(null);
    },
  });

  const login = (data: any) => {
    if (!data || !data.success) return;
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
          prop === 'companyName' ||
          prop === 'userRole'
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

      const newlyRegistered = data.newlyRegistered || null;

      Cookies.set('newlyRegistered', `${newlyRegistered}`);

      setUserData({
        ...Cookies.get(),
        token: null,
      });

      revalidateDashboard();
      router.push('/dashboard');
    }
  };
  const logout = () => {
    signOut();
  };

  const contextValue: AuthContextType = {
    login,
    logout,
    userData,
  };

  useEffect(() => {
    const userData: any =
      Object.keys(Cookies.get()).length > 0
        ? {
            ...Cookies.get(),
            token: null,
          }
        : null;

    setUserData(userData);
  }, []);
  return (
    <authContext.Provider value={contextValue}>{children}</authContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx: AuthContextType = useContext(authContext);

  return ctx;
};

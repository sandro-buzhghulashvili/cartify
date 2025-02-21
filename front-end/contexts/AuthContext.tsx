'use client';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import Cookies from 'js-cookie';
import { useRouter, usePathname } from 'next/navigation';
import { useMutation } from 'react-query';
import { revalidateDashboard } from '@/components/auth/revalidateDashboard';
import { revalidateLandingPage } from '@/components/auth/revalidateLandingPage';
import { logoutFn } from '@/api/auth';

interface AuthContextType {
  login: (data: any) => void;
  logout: () => void;
  userData: any;
  loading: boolean;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const authContext = createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
  userData: {},
  loading: false,
});

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();

  const { mutate: signOut } = useMutation({
    mutationFn: logoutFn,
    onSuccess: () => {
      setLoading(true);
      revalidateLandingPage();
      revalidateDashboard();
      router.push('/dashboard');
      setUserData(null);
    },
  });

  const login = (data: any) => {
    if (!data || !data.success) return;

    setLoading(true);

    if (data.token) {
      Cookies.set('token', data.token, { expires: 7 });
    }

    console.log('User data : ', data);

    if (data.user) {
      const userProps = [
        'email',
        'username',
        'phoneNumber',
        'lastLogin',
        'companyName',
        'userRole',
        '_id',
        'profileLogo',
      ];

      userProps.forEach((prop) => {
        if (data.user[prop]) {
          Cookies.set(prop, data.user[prop], { expires: 7 });
        }
      });

      // individual check for company profile logo
      if (data.user?.companyDetails?.logo) {
        Cookies.set('profileLogo', data.user.companyDetails.logo, {
          expires: 7,
        });
      }

      Cookies.set('newlyRegistered', `${data.newlyRegistered || false}`);

      setUserData({ ...Cookies.get(), token: null });

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
    loading,
  };

  useEffect(() => {
    // Automatically set loading to false once navigation completes
    setLoading(false);
  }, [pathname]);

  useEffect(() => {
    const userData =
      Object.keys(Cookies.get()).length > 0
        ? { ...Cookies.get(), token: null }
        : null;

    setUserData(userData);
  }, []);

  return (
    <authContext.Provider value={contextValue}>{children}</authContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(authContext);
};

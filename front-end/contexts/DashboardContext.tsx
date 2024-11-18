import { createContext, ReactNode, useContext, useState } from 'react';

interface DashboardContextType {
  userDetails: any | null;
  onSetUserDetails: (userData: any) => void;
}

interface DashboardContextProviderTypes {
  children: ReactNode;
}

const dashboardContext = createContext<DashboardContextType>({
  userDetails: null,
  onSetUserDetails: (userData) => false,
});

export const DashboardContextProvider: React.FC<
  DashboardContextProviderTypes
> = ({ children }) => {
  const [userDetails, setUserDetails] = useState<null | {}>(null);

  const onSetUserDetails = (userData: any) => {
    if (userData) {
      setUserDetails(userData);
    }
  };

  const dashboardContextValue: DashboardContextType = {
    userDetails,
    onSetUserDetails,
  };

  return (
    <dashboardContext.Provider value={dashboardContextValue}>
      {children}
    </dashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  const ctx = useContext(dashboardContext);

  return ctx;
};

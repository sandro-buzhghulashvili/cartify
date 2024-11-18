'use client';

import { ReactNode } from 'react';
import { DashboardContextProvider } from '@/contexts/DashboardContext';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="px-[10%]">
      <DashboardContextProvider>{children}</DashboardContextProvider>
    </div>
  );
};

export default DashboardLayout;

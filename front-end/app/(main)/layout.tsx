import MainLayout from '@/components/layout/MainLayout';
import { ReactNode } from 'react';

interface MainAppLayoutProps {
  children: ReactNode;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default MainAppLayout;

import { ReactNode } from 'react';
import MainNavbar from './MainNavbar';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="relative pt-[110px]">
      <MainNavbar />
      {children}
    </div>
  );
};

export default MainLayout;

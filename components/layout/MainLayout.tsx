import { ReactNode } from 'react';
import MainNavbar from './MainNavbar';
import MainFooter from './MainFooter';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="relative pt-[110px]">
      <MainNavbar />
      {children}
      <MainFooter />
    </div>
  );
};

export default MainLayout;

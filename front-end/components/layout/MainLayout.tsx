import { ReactNode } from 'react';
import MainNavbar from './Navbar/MainNavbar';
import MainFooter from './MainFooter';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="relative pt-[110px] pb-[525px] min-h-screen">
      <MainNavbar />
      {children}
      <MainFooter />
    </div>
  );
};

export default MainLayout;

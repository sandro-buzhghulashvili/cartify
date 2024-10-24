import Sidebar from '@/components/dashboard/company/Sidebar';
import { ReactNode } from 'react';

interface CompanyLayoutProps {
  children: ReactNode;
}

const CompanyLayout: React.FC<CompanyLayoutProps> = ({ children }) => {
  return (
    <div className="flex justify-around py-24">
      <Sidebar />
      {children}
    </div>
  );
};

export default CompanyLayout;

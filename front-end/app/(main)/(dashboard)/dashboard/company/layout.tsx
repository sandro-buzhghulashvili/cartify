import Sidebar from '@/components/dashboard/company/index/Sidebar';
import { ReactNode } from 'react';

interface CompanyLayoutProps {
  children: ReactNode;
}

const CompanyLayout: React.FC<CompanyLayoutProps> = ({ children }) => {
  return (
    <div className="flex py-24">
      <Sidebar />
      {children}
    </div>
  );
};

export default CompanyLayout;

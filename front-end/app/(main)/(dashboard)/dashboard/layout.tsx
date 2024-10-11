import { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return <div className="px-[10%]">{children}</div>;
};

export default DashboardLayout;

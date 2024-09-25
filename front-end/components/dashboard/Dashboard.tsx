'use client';

import Cookies from 'js-cookie';
import CompanyDashboard from './company/CompanyDashboard';
import { useAuthContext } from '@/contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { userData } = useAuthContext();
  const isCompany = userData?.userRole === 'company';

  // loading state
  if (!userData) {
    return <p>Loading ...</p>;
  }

  return (
    <>
      {isCompany ? <CompanyDashboard /> : <p>Here will be client dashboard</p>}
    </>
  );
};

export default Dashboard;

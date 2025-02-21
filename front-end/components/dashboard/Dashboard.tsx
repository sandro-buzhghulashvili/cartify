'use client';

import LoadingScreen from '../shared/loaders/LoadingScreen';
import CompanyDashboard from './company/index/CompanyDashboard';
import { useAuthContext } from '@/contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { userData } = useAuthContext();
  const isCompany = userData?.userRole === 'company';

  // loading state
  if (!userData) {
    return (
      <div className="py-20 flex justify-center items-center">
        <LoadingScreen className="size-[200px]" />
      </div>
    );
  }

  return (
    <>
      {isCompany ? <CompanyDashboard /> : <p>Here will be client dashboard</p>}
    </>
  );
};

export default Dashboard;

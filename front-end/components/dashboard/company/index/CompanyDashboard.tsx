'use client';

import { useQuery } from 'react-query';
import Data from './Data';
import Notifications from './Notifications';
import Sidebar from './Sidebar';
import { getCompanyDetails } from '@/api/company';
import { useEffect } from 'react';
import { useDashboardContext } from '@/contexts/DashboardContext';

const CompanyDashboard: React.FC = () => {
  const { onSetUserDetails } = useDashboardContext();
  const {
    data: companyData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: getCompanyDetails,
  });

  useEffect(() => {
    if (companyData?.companyDetails) {
      onSetUserDetails(companyData.companyDetails);
    }
  }, [companyData]);

  return (
    <>
      {isLoading ? (
        <p>Loading ...</p> // Here we will have loading screen + we will have error screen
      ) : (
        <>
          <div className="flex w-full justify-between">
            <Notifications />
            <Data companyDetails={companyData.companyDetails} />
          </div>
        </>
      )}
    </>
  );
};

export default CompanyDashboard;

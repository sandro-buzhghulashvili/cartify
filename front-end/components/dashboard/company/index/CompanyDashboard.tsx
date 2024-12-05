'use client';

import { useQuery } from 'react-query';
import Data from './Data';
import Notifications from './Notifications';
import { getCompanyDetails } from '@/api/company';
import { useEffect } from 'react';
import { useDashboardContext } from '@/contexts/DashboardContext';
import Cookies from 'js-cookie';

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
      Cookies.set('profile_img', companyData.companyDetails.logo);
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

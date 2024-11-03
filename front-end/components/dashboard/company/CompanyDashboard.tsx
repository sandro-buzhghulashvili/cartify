'use client';

import { useQuery } from 'react-query';
import Data from './Data';
import Notifications from './Notifications';
import Sidebar from './Sidebar';
import { getCompanyDetails } from '@/api/company';

const CompanyDashboard: React.FC = () => {
  const {
    data: companyData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: getCompanyDetails,
  });

  return (
    <>
      {isLoading ? (
        <p>Loading ...</p> // Here we will have loading screen + we will have error screen
      ) : (
        <>
          <div className="flex">
            <Notifications />
            <Data companyDetails={companyData.companyDetails} />
          </div>
        </>
      )}
    </>
  );
};

export default CompanyDashboard;

'use client';

import { useQuery } from 'react-query';
import Data from './Data';
import Notifications from './Notifications';
import { getCompanyDetails } from '@/api/company';
import { useEffect } from 'react';
import { useDashboardContext } from '@/contexts/DashboardContext';
import Cookies from 'js-cookie';
import LoadingScreen from '@/components/shared/loaders/LoadingScreen';
import LottiePopup from '@/components/shared/popups/LottiePopup';
import ErrorLottie from '@/components/lotties/error.json';

const CompanyDashboard: React.FC = () => {
  const {
    data: companyData,
    isLoading: loadingCompanyData,
    isError: couldNotFetchCompanyData,
    error: companyDataError,
  } = useQuery({
    queryFn: getCompanyDetails,
  });

  if (loadingCompanyData) {
    return (
      <div className="w-full py-10 flex justify-center h-[60vh] items-center">
        <LoadingScreen className="size-[100px]" />
      </div>
    );
  }

  if (couldNotFetchCompanyData) {
    return (
      <div className="w-full py-10 flex justify-center h-[60vh] items-center">
        <LottiePopup
          className="flex flex-col items-center"
          lottieData={ErrorLottie}
          text={
            (companyDataError as Error).message ||
            'Could not fetch company details.'
          }
        />
      </div>
    );
  }

  return (
    <div className="flex w-full justify-between">
      <Notifications />
      <Data companyDetails={companyData.companyDetails} />
    </div>
  );
};

export default CompanyDashboard;

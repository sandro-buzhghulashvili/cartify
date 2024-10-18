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

  console.log(companyData);

  return (
    <>
      {isLoading ? (
        <p>Loading ...</p> // Here we will have loading screen + we will have error screen
      ) : (
        <div className="flex gap-10 py-24">
          <Sidebar />
          <Notifications />
          <Data companyDetails={companyData.companyDetails} />
        </div>
      )}
    </>
  );
};

export default CompanyDashboard;

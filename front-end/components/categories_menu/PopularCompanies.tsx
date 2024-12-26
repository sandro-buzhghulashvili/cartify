import { getPopularCompanies } from '@/api/company';
import { useQuery } from 'react-query';
import LoadingScreen from '../shared/loaders/LoadingScreen';
import LottiePopup from '../shared/popups/LottiePopup';
import ErrorLottie from '../lotties/error.json';

import Image from 'next/image';
import Link from 'next/link';

const PopularCompanies: React.FC = () => {
  const {
    data: companiesData,
    isLoading: fetchingPopularCompanies,
    isError: couldNotFetchPopularCompanies,
    error: companiesError,
    isSuccess: fetchedPopularCompanies,
  } = useQuery({
    queryKey: ['popularCompanies'],
    queryFn: getPopularCompanies,
  });

  console.log(companiesData);
  return (
    <div className="px-[10%] py-40 text-primary-black flex flex-col items-center gap-32">
      <div className="flex flex-col gap-5 items-center">
        <h1 className="text-4xl font-medium">Popular Brands</h1>
        <p className="text-primary-gray font-normal">
          Check our best seller products on Elma website right now
        </p>
      </div>

      {fetchingPopularCompanies && (
        <div className="flex justify-center items-center py-10">
          <LoadingScreen className="size-[120px]" />
        </div>
      )}
      {couldNotFetchPopularCompanies && (
        <div className="flex justify-center items-center py-10 bg-[#F9FAFB]">
          <LottiePopup
            className="flex flex-col items-center"
            lottieData={ErrorLottie}
            text={(companiesError as Error).message}
          />
        </div>
      )}
      {fetchedPopularCompanies && (
        <ul className="flex gap-y-20 justify-center flex-wrap gap-x-40">
          {companiesData.companies.map((company: any, index: number) => (
            <li key={index} className="w-1/4 flex justify-center items-center">
              <Link href="#">
                <Image
                  className=" object-contain h-[150px]"
                  src={company.companyDetails.logo}
                  width={150}
                  height={60}
                  alt={`company-${index}`}
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PopularCompanies;

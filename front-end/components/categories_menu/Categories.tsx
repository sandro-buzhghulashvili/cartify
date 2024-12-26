import { useQuery } from 'react-query';
import CategoriesHeader from './CategoriesHeader';
import { getCategories } from '@/api/categories';
import LoadingScreen from '../shared/loaders/LoadingScreen';
import ErrorLottie from '@/components/lotties/error.json';
import LottiePopup from '../shared/popups/LottiePopup';
import CategoriesList from './CategoriesList';
import { ForwardedRef, forwardRef } from 'react';
import PopularCompanies from './PopularCompanies';

interface CategoriesProps {
  closeCategories: () => void;
  closing?: boolean;
}

const Categories = forwardRef<HTMLDivElement, CategoriesProps>(
  ({ closeCategories, closing }, ref) => {
    const {
      data: categoriesData,
      isLoading: fetchingCategories,
      isError: couldNotFetchCategories,
      error: categoriesError,
      isSuccess: fetchedCategories,
    } = useQuery({
      queryKey: ['categories'],
      queryFn: getCategories,
    });

    return (
      <div
        ref={ref as ForwardedRef<HTMLDivElement>}
        className={`absolute text-primary-black top-[110px] left-0 w-full bg-white max-h-[100vh] overflow-y-auto pb-40 ${
          closing ? 'animate-closeDropDown' : 'animate-dropDown'
        }`}
      >
        <CategoriesHeader />
        <div className="px-[10%] bg-[#F9FAFB]">
          {fetchingCategories && (
            <div className="flex justify-center items-center py-10">
              <LoadingScreen className="size-[120px]" />
            </div>
          )}
          {couldNotFetchCategories && (
            <div className="flex justify-center items-center py-10 bg-[#F9FAFB]">
              <LottiePopup
                className="flex flex-col items-center"
                lottieData={ErrorLottie}
                text={(categoriesError as Error).message}
              />
            </div>
          )}
        </div>
        {fetchedCategories && (
          <CategoriesList categories={categoriesData.categories} />
        )}
        <PopularCompanies />
      </div>
    );
  }
);
export default Categories;

import { getPopularSearches } from '@/api/searches';
import { useQuery } from 'react-query';
import LoadingScreen from '../shared/loaders/LoadingScreen';
import Link from 'next/link';

interface PopularSearch {
  beingSearched: number;
  value: string;
  _id: string;
}

interface PopularSearchesProps {
  onClose: () => void;
}

const PopularSearches: React.FC<PopularSearchesProps> = ({ onClose }) => {
  const {
    data: searches,
    isLoading: searchesAreLoading,
    isError: couldNotFetchSearches,
    error: searchesError,
  } = useQuery({
    queryKey: ['popular-searches'],
    queryFn: getPopularSearches,
  });

  if (searchesAreLoading) {
    return (
      <div className="py-5 flex justify-center">
        <LoadingScreen className="size-[50px]" />
      </div>
    );
  }

  if (couldNotFetchSearches) {
    return (
      <div className="py-5 flex items-center gap-3 justify-center">
        <p className="font-medium text-base text-red-500">
          {(searchesError as Error)?.message}
        </p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-base font-medium">Popular Searches</h1>
      {searches?.popularSearches?.length > 0 && (
        <ul className="flex flex-wrap justify-center gap-5 gap-y-8">
          {(searches.popularSearches as PopularSearch[]).map((search) => (
            <li key={search._id}>
              <Link
                className="w-fit px-5 py-2 text-sm font-normal bg-gray-100 rounded-xl cursor-pointer md:hover:text-primary-purple"
                href={`/products?searchTerm=${search.value}`}
                onClick={onClose}
                replace
              >
                {search.value}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default PopularSearches;

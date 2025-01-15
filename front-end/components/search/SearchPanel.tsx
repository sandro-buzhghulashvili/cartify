import { forwardRef, useEffect, useState } from 'react';
import PopularSearches from './PopularSearches';
import SearchedProducts from './SearchedProducts';
import { useMutation } from 'react-query';
import { addSearch } from '@/api/searches';

interface SearchPanelProps {
  closing: boolean;
  onClose: () => void;
  searchTerm: string;
}

const SearchPanel = forwardRef<HTMLDivElement, SearchPanelProps>(
  ({ closing, onClose, searchTerm }, ref) => {
    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      const searchTermTimeout = setTimeout(() => {
        setLocalSearchTerm(searchTerm);
      }, 300);

      return () => clearTimeout(searchTermTimeout);
    }, [searchTerm]);

    useEffect(() => {
      setIsMounted(true);
      return () => {
        if (isMounted) {
        }
      };
    }, [isMounted]);
    return (
      <div
        ref={ref}
        tabIndex={-1}
        className={`absolute text-primary-black top-[110px] left-0 w-full bg-[rgba(0,0,0,0.3)] h-[90vh] overflow-y-auto pb-40 ${
          closing ? 'animate-closeDropDown' : 'animate-dropDown'
        }`}
        onClick={onClose}
      >
        <div className="flex justify-center py-2">
          <section
            className="w-[600px] flex flex-col gap-7 bg-white p-5 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {localSearchTerm.trim().length === 0 ? (
              <PopularSearches onClose={onClose} />
            ) : (
              <SearchedProducts
                searchTerm={localSearchTerm}
                onClose={onClose}
              />
            )}
          </section>
        </div>
      </div>
    );
  }
);

export default SearchPanel;

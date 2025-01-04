import FeaturedCompany from './FeaturedCompany';
import { FeaturedCompany as FeaturedCompanyType } from './ProductsList';
import Image from 'next/image';

interface CompaniesListProps {
  searchTerm: string;
  companies: FeaturedCompanyType[];
  layoutMode: string;
}

const CompaniesList: React.FC<CompaniesListProps> = ({
  searchTerm,
  companies,
  layoutMode,
}) => {
  if (companies.length === 0) {
    return (
      <div className="w-full flex flex-col items-center pt-20 gap-5">
        <Image
          src="/illustrations/not-found.png"
          width={300}
          height={300}
          alt="not-found"
          className="size-[300px]"
        />
        <h1 className="text-xl font-medium">Found no companies</h1>
      </div>
    );
  }

  return (
    <div className="w-4/5 px-10 flex flex-col gap-5">
      <section className="flex items-center justify-between">
        <p className="text-base text-teritary-gray font-normal">
          Shown 1/{companies.length} Companies
          {searchTerm && ` for "${searchTerm}"`}
        </p>
      </section>
      <ul className="flex flex-wrap gap-10 justify-center">
        {companies.map((company) => (
          <FeaturedCompany
            key={company.id}
            company={company}
            layoutMode={layoutMode}
            notFeatured
          />
        ))}
      </ul>
    </div>
  );
};

export default CompaniesList;

import Image from 'next/image';
import { FeaturedCompany as FeaturedCompanyType } from './ProductsList';
import { IconCart, IconFeatured, IconStar } from '../../icons/Icons';
import { formatNumber } from '@/helpers/number_helpers';

interface FeaturedCompanyProps {
  company: FeaturedCompanyType;
  layoutMode: string;
  notFeatured?: boolean;
}

const FeaturedCompany: React.FC<FeaturedCompanyProps> = ({
  company,
  layoutMode,
  notFeatured,
}) => {
  return (
    <li
      className={`flex p-5 ${
        layoutMode === 'grid' ? 'w-[30%]' : 'w-[50%]'
      } text-primary-black flex-col items-center justify-center gap-5 h-[340px] overflow-y-auto`}
    >
      <div className="flex flex-col items-center gap-5">
        <Image
          src={company.logo}
          width={64}
          height={64}
          alt={company.name}
          className="size-8 rounded-md object-contain"
        />
        {!notFeatured && (
          <section className="flex items-center gap-2">
            <IconFeatured />
            <p className="font-normal text-sm text-primary-green">
              Featured store
            </p>
          </section>
        )}
        <h1 className="font-medium text-lg">{company.name}</h1>
      </div>

      <div className="flex items-center gap-5">
        <section className="text-center">
          <p className="font-medium text-sm">{formatNumber(company?.sells)}</p>
          <p className="text-primary-gray font-normal text-sm">Product sold</p>
        </section>
        <section className="text-center">
          <span className="font-medium text-sm flex items-center justify-center gap-1">
            <IconStar className="size-4 fill-primary-yellow" />
            {company?.averageRating?.toFixed(1)}
          </span>
          <p className="text-primary-gray font-normal text-sm">Store rating</p>
        </section>
      </div>

      <div className="py-5">
        <button className="flex items-center gap-2 px-10 py-2 rounded-md bg-primary-indigo text-white text-base font-medium">
          <IconCart className="size-5 fill-white" />
          View Store
        </button>
      </div>
    </li>
  );
};

export default FeaturedCompany;

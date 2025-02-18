import { IconStar } from '@/components/icons/Icons';
import { RatingStats } from '../Product';
import { formatNumber } from '@/helpers/number_helpers';

interface ProductReviewsStatisticsProps {
  stats: RatingStats;
  productName: string;
}

const ProductReviewsStatistics: React.FC<ProductReviewsStatisticsProps> = ({
  stats: ratingStatistics,
  productName,
}) => {
  const parsedStats = JSON.parse(ratingStatistics.stats);
  const totalRating = Object.entries(parsedStats).reduce(
    (acc, x) => acc + Number(x[0]) * Number(x[1]),
    0
  );
  const recomendedRating = Object.entries(parsedStats)
    .slice(2, 6)
    .reduce((acc, x) => acc + Number(x[0]) * Number(x[1]), 0);

  return (
    <div className="py-20 text-primary-black">
      <h1 className="text-[22px] font-medium">Reviews</h1>
      <div className="flex items-center justify-between">
        <section className="py-5 flex flex-col gap-5">
          <p className="text-sm text-secondary-gray font-normal pr-3">
            for {productName}
          </p>
          <div className="flex items-center gap-5">
            <IconStar className="size-7 fill-primary-yellow" />
            <p className="text-[56px] font-normal">
              {ratingStatistics.average} /5.0
            </p>
          </div>
          <div className="py-2 px-3">
            <p className="font-medium text-sm">Recommended</p>
            <p className="text-secondary-gray font-normal text-sm">
              ({Math.round((recomendedRating / totalRating) * 100) || 0}%) Buyer
              recommended this product
            </p>
          </div>
        </section>
        <ul className="w-1/2 flex flex-col gap-6">
          <li className="flex items-center gap-2 w-full">
            <div className="flex items-center gap-1">
              <p className="font-normal text-sm">5.0</p>
              <IconStar className="size-5 fill-primary-yellow" />
            </div>
            <div className="w-4/5 h-[6px] rounded-lg bg-[#F4F6F8]">
              <div
                className="w-0 h-[6px] rounded-lg bg-primary-green"
                style={{
                  width: `${
                    ((Number(parsedStats['5']) * 5) / totalRating) * 100
                  }%`,
                }}
              ></div>
            </div>
            <p className="text-teritary-gray font-normal text-sm">
              {formatNumber(Number(parsedStats['5'])) || 0}
            </p>
          </li>
          <li className="flex items-center gap-2 w-full">
            <div className="flex items-center gap-1">
              <p className="font-normal text-sm">4.0</p>
              <IconStar className="size-5 fill-primary-yellow" />
            </div>
            <div className="w-4/5 h-[6px] rounded-lg bg-[#F4F6F8]">
              <div
                className="w-0 h-[6px] rounded-lg bg-primary-green"
                style={{
                  width: `${
                    ((Number(parsedStats['4']) * 4) / totalRating) * 100
                  }%`,
                }}
              ></div>
            </div>
            <p className="text-teritary-gray font-normal text-sm">
              {formatNumber(Number(parsedStats['4'])) || 0}
            </p>
          </li>
          <li className="flex items-center gap-2 w-full">
            <div className="flex items-center gap-1">
              <p className="font-normal text-sm">3.0</p>
              <IconStar className="size-5 fill-primary-yellow" />
            </div>
            <div className="w-4/5 h-[6px] rounded-lg bg-[#F4F6F8]">
              <div
                className="w-0 h-[6px] rounded-lg bg-primary-green"
                style={{
                  width: `${
                    ((Number(parsedStats['3']) * 3) / totalRating) * 100
                  }%`,
                }}
              ></div>
            </div>
            <p className="text-teritary-gray font-normal text-sm">
              {formatNumber(Number(parsedStats['3'])) || 0}
            </p>
          </li>
          <li className="flex items-center gap-2 w-full">
            <div className="flex items-center gap-1">
              <p className="font-normal text-sm">2.0</p>
              <IconStar className="size-5 fill-primary-yellow" />
            </div>
            <div className="w-4/5 h-[6px] rounded-lg bg-[#F4F6F8]">
              <div
                className="w-0 h-[6px] rounded-lg bg-primary-green"
                style={{
                  width: `${
                    ((Number(parsedStats['2']) * 2) / totalRating) * 100
                  }%`,
                }}
              ></div>
            </div>
            <p className="text-teritary-gray font-normal text-sm">
              {formatNumber(Number(parsedStats['2'])) || 0}
            </p>
          </li>
          <li className="flex items-center gap-2 w-full">
            <div className="flex items-center gap-1">
              <p className="font-normal text-sm">1.0</p>
              <IconStar className="size-5 fill-primary-yellow" />
            </div>
            <div className="w-4/5 h-[6px] rounded-lg bg-[#F4F6F8]">
              <div
                className="w-0 h-[6px] rounded-lg bg-primary-green"
                style={{
                  width: `${
                    ((Number(parsedStats['1']) * 1) / totalRating) * 100
                  }%`,
                }}
              ></div>
            </div>
            <p className="text-teritary-gray font-normal text-sm">
              {formatNumber(Number(parsedStats['1'])) || 0}
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductReviewsStatistics;

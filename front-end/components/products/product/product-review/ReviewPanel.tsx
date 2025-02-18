'use client';

import { IconReport } from '@/components/icons/IconReport';
import { formatNumber } from '@/helpers/number_helpers';
import { RatingStats } from '../Product';

interface ReviewPanelProps {
  rating: RatingStats;
  productId: string;
}

const ReviewPanel: React.FC<ReviewPanelProps> = ({ rating, productId }) => {
  // then I will add functionality to report this product using the productId
  const totalReviews = Object.values(JSON.parse(rating.stats)).reduce(
    (acc: number, count: any) => acc + count,
    0
  );

  const navigateToSection = (sectionId: string) => {
    const sect = window.document.getElementById(sectionId);

    if (sect) {
      sect.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="px-10 flex w-full text-primary-black items-center justify-between">
      <section className="flex items-center gap-10">
        <button className=" font-medium text-base">Description</button>
        <button
          className="text-primary-gray font-normal text-base"
          onClick={() => navigateToSection('reviews')}
        >
          Review ({formatNumber(totalReviews) || 0})
        </button>
        <button
          className="text-primary-gray font-normal text-base"
          onClick={() => navigateToSection('related-products')}
        >
          Related Product
        </button>
      </section>
      <button className="flex font-medium text-sm text-teritary-gray items-center gap-3">
        <IconReport />
        Report Product
      </button>
    </div>
  );
};

export default ReviewPanel;

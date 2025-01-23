import { IconReport } from '@/components/icons/IconReport';
import { formatNumber } from '@/helpers/number_helpers';

interface ReviewPanelProps {
  rating:
    | number
    | {
        total: number;
        average: number;
      };
  productId: string;
}

const ReviewPanel: React.FC<ReviewPanelProps> = ({ rating, productId }) => {
  // then I will add functionality to report this product using the productId
  return (
    <div className="px-10 flex w-full text-primary-black items-center justify-between">
      <section className="flex items-center gap-10">
        <button className=" font-medium text-base">Description</button>
        <button className="text-primary-gray font-normal text-base">
          Review
          {rating !== 0 && typeof rating !== 'number'
            ? ` (${formatNumber(rating.total)})`
            : ' (0)'}
        </button>
        <button className="text-primary-gray font-normal text-base">
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

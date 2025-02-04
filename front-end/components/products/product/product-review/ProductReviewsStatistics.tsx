import { IconStar } from '@/components/icons/Icons';

const ProductReviewsStatistics: React.FC = () => {
  return (
    <div className="py-20 text-primary-black">
      <h1 className="text-[22px] font-medium">Reviews</h1>
      <div className="flex items-center justify-between">
        <section className="py-5 flex flex-col gap-5">
          <p className="text-sm text-secondary-gray font-normal">
            for Sony Alpha Mirrorless 4K Video Camera (Body Only)
          </p>
          <div className="flex items-center gap-5">
            <IconStar className="size-7 fill-primary-yellow" />
            <p className="text-[56px] font-normal">4,6 /5.0</p>
          </div>
          <div className="py-2 px-3">
            <p className="font-medium text-sm">Recommended</p>
            <p className="text-secondary-gray font-normal text-sm">
              (88%) Buyer recommended this product
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
              <div className="w-4/5 h-[6px] rounded-lg bg-primary-green"></div>
            </div>
            <p className="text-teritary-gray font-normal text-sm">1.3k</p>
          </li>
          <li className="flex items-center gap-2 w-full">
            <div className="flex items-center gap-1">
              <p className="font-normal text-sm">4.0</p>
              <IconStar className="size-5 fill-primary-yellow" />
            </div>
            <div className="w-4/5 h-[6px] rounded-lg bg-[#F4F6F8]">
              <div className="w-2/5 h-[6px] rounded-lg bg-primary-green"></div>
            </div>
            <p className="text-teritary-gray font-normal text-sm">1.3k</p>
          </li>
          <li className="flex items-center gap-2 w-full">
            <div className="flex items-center gap-1">
              <p className="font-normal text-sm">3.0</p>
              <IconStar className="size-5 fill-primary-yellow" />
            </div>
            <div className="w-4/5 h-[6px] rounded-lg bg-[#F4F6F8]">
              <div className="w-1/5 h-[6px] rounded-lg bg-primary-green"></div>
            </div>
            <p className="text-teritary-gray font-normal text-sm">1.3k</p>
          </li>
          <li className="flex items-center gap-2 w-full">
            <div className="flex items-center gap-1">
              <p className="font-normal text-sm">2.0</p>
              <IconStar className="size-5 fill-primary-yellow" />
            </div>
            <div className="w-4/5 h-[6px] rounded-lg bg-[#F4F6F8]">
              <div className="w-1/5 h-[6px] rounded-lg bg-primary-green"></div>
            </div>
            <p className="text-teritary-gray font-normal text-sm">1.3k</p>
          </li>
          <li className="flex items-center gap-2 w-full">
            <div className="flex items-center gap-1">
              <p className="font-normal text-sm">1.0</p>
              <IconStar className="size-5 fill-primary-yellow" />
            </div>
            <div className="w-4/5 h-[6px] rounded-lg bg-[#F4F6F8]">
              <div className="w-3/5 h-[6px] rounded-lg bg-primary-green"></div>
            </div>
            <p className="text-teritary-gray font-normal text-sm">1.3k</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductReviewsStatistics;

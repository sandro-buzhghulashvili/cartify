import Image from 'next/image';
import ReviewSort from './ReviewSort';
import { IconStar, IconLike } from '@/components/icons/Icons';
import AddProductReview from './AddProductReview';

interface ProductReviewsProps {
  productId: string;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  return (
    <div className="py-10 flex items-start justify-between text-primary-black">
      <section className="w-[60%] flex flex-col gap-10">
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-lg">All Comments (2,1k)</h1>
          <ReviewSort />
        </div>
        <ul>
          <li className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              {/* // user info */}
              <section className="flex items-center gap-4">
                <Image
                  src="/auth_assets/user.png"
                  alt="review-owner-image"
                  width={48}
                  height={48}
                  className="size-12 object-contain rounded-full"
                />
                <div>
                  <h1 className="font-medium text-sm">Daisy Murphy</h1>
                  <p className="text-sm font-normal text-primary-gray">
                    July, 23 2020
                  </p>
                </div>
              </section>
              {/* // rating info */}
              <section className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span key={index}>
                      <IconStar />
                    </span>
                  ))}
                </div>
                <p className="text-sm text-primary-gray font-normal">
                  83% of users found this review helpful
                </p>
              </section>
              {/* like or dislike options */}
              <section className="flex items-center gap-3">
                <button className="p-2 rounded-lg border-[1px] border-[#F4F6F8]">
                  <IconLike />
                </button>
                <button className="p-2 rounded-lg border-[1px] border-[#F4F6F8]">
                  <IconLike className="fill-[#C4CDD5] size-[22px] rotate-180" />
                </button>
              </section>
            </div>
            {/* review body */}
            <div className="px-1">
              <p className="text-teritary-gray text-base font-normal ">
                Sony α, is a camera system introduced on 5 June 2006. It uses
                and expands upon Konica Minolta camera technologies, including
                the Minolta AF SLR lens mount…
              </p>
            </div>
          </li>
        </ul>
      </section>
      <AddProductReview productId={productId} />
    </div>
  );
};

export default ProductReviews;

'use client';

import ReviewSort from './ReviewSort';
import { IconLoad } from '@/components/icons/Icons';
import AddProductReview from './AddProductReview';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { getReviews } from '@/api/review';
import LoadingScreen from '@/components/shared/loaders/LoadingScreen';
import LottiePopup from '@/components/shared/popups/LottiePopup';
import ErrorLottie from '@/components/lotties/error.json';
import { formatNumber } from '@/helpers/number_helpers';
import Review from './Review';
import { useAuthContext } from '@/contexts/AuthContext';

interface Rating {
  count: number;
  average: number;
}

interface UserDetails {
  name: string;
  reviewedAt: Date;
  userLogo: string;
}

export interface Review {
  _id: string;
  review: string;
  rating: Rating;
  likes: number;
  dislikes: number;
  userDetails: UserDetails;
  productId: string;
  liked?: boolean;
  disliked?: boolean;
}

interface ProductReviewsProps {
  productId: string;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  const { userData } = useAuthContext();
  const [activePage, setActivePage] = useState(1);
  const [sortingOption, setSortingOption] = useState<
    ((reviews: Review[]) => Review[]) | null
  >(null);
  const itemsPerPage = 3;

  const {
    data: reviewsData,
    isLoading: fetchingReviews,
    isError: couldNotFetchReviews,
    error: reviewsError,
    isSuccess: fetchedReviews,
  } = useQuery({
    queryFn: () =>
      getReviews({
        page: activePage,
        itemsPerPage,
        productId,
        username: userData?.username || userData?.companyName,
        userId: userData?._id,
      }),
    queryKey: ['reviews', productId, activePage],
  });

  const handleLoadMore = () => {
    setActivePage((prevPage) => (prevPage += 1));
  };

  if (fetchingReviews) {
    return (
      <div className="py-10 flex items-start justify-center">
        <LoadingScreen className="size-[100px]" />
      </div>
    );
  }

  if (couldNotFetchReviews) {
    return (
      <div className="py-10 flex items-start justify-center">
        <LottiePopup
          lottieData={ErrorLottie}
          text={(reviewsError as Error).message || 'Could not fetch reviews'}
        />
      </div>
    );
  }

  return (
    <div className="py-10 flex items-start justify-between text-primary-black">
      <section className="w-[60%] flex flex-col gap-10">
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-lg">
            {fetchedReviews
              ? `All Comments (${formatNumber(reviewsData?.reviews.length)})`
              : 'All Comments'}
          </h1>
          <ReviewSort onSort={(func: any) => setSortingOption(() => func)} />
        </div>
        {fetchedReviews &&
          (reviewsData?.reviews.length > 0 ? (
            <ul className="flex flex-col gap-y-20">
              {(sortingOption
                ? (sortingOption(reviewsData?.reviews) as Review[])
                : (reviewsData?.reviews as Review[])
              ).map((review, index) => (
                <Review
                  review={review}
                  key={index}
                  productId={productId}
                  activePage={activePage}
                />
              ))}
            </ul>
          ) : (
            <div>
              <p className="text-sm font-medium text-primary-black">
                Nobody reviewed this product yet.
              </p>
            </div>
          ))}
        {activePage < reviewsData?.totalPages && (
          <div className="py-10 flex items-center justify-center">
            <button
              className="flex text-base font-medium text-primary-indigo items-center gap-3"
              onClick={handleLoadMore}
            >
              <IconLoad /> Load more reviews
            </button>
          </div>
        )}
      </section>
      <AddProductReview productId={productId} />
    </div>
  );
};

export default ProductReviews;

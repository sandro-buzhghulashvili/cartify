import { formatDate } from '@/utils/dateFormatting';
import { Review as ReviewType } from './ProductReviews';
import Image from 'next/image';
import { IconStar } from '@/components/icons/Icons';
import { useState } from 'react';
import RateReview from './RateReview';

interface ReviewProps {
  review: ReviewType;
  productId: string;
  activePage: number;
}

const Review: React.FC<ReviewProps> = ({ review, productId, activePage }) => {
  const [showFullReview, setShowFullReview] = useState(false);

  const toggleShowReview = () => {
    setShowFullReview((prevState) => !prevState);
  };

  return (
    <li className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        {/* // user info */}
        <section className="flex items-center gap-4">
          <Image
            src={review.userDetails.userLogo || ''}
            alt="review-owner-image"
            width={48}
            height={48}
            className="size-12 object-contain rounded-full"
          />
          <div>
            <h1 className="font-medium text-sm">{review.userDetails.name}</h1>
            <p className="text-sm font-normal text-primary-gray">
              {formatDate(new Date(review.userDetails?.reviewedAt))}
            </p>
          </div>
        </section>
        {/* // rating info */}
        <section className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={index}>
                <IconStar
                  className={`${
                    index <= review.rating.average - 1
                      ? 'fill-primary-yellow stroke-primary-yellow'
                      : 'fill-white stroke-primary-gray'
                  }`}
                />
              </span>
            ))}
          </div>
          <p className="text-sm text-primary-gray font-normal">
            {`${
              review.likes + review.dislikes >= 1
                ? (
                    (review.likes / (review.likes + review.dislikes)) *
                    100
                  ).toFixed(0)
                : 0
            }% `}
            of users found this review helpful
          </p>
        </section>
        {/* like or dislike options */}
        <RateReview
          review={review}
          productId={productId}
          activePage={activePage}
        />
      </div>
      {/* review body */}
      <div className="px-1">
        <span className="text-teritary-gray text-base font-normal ">
          {review.review.split(' ').length > 50
            ? showFullReview
              ? review.review
              : review.review.split(' ').slice(0, 50).join(' ') + ' ...'
            : review.review}
          {review.review.split(' ').length > 50 && (
            <button
              className="font-medium text-base text-primary-indigo ml-2"
              onClick={toggleShowReview}
            >
              {showFullReview ? 'Read less' : 'Read more'}
            </button>
          )}
        </span>
      </div>
    </li>
  );
};

export default Review;

import { IconLike } from '@/components/icons/Icons';
import { Review } from './ProductReviews';
import { useMutation, useQueryClient } from 'react-query';
import { rateReview } from '@/api/review';
import { useAuthContext } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { useFlashMessagesContext } from '@/contexts/FlashMessagesContext';

interface RateReviewProps {
  review: Review;
  productId: string;
  activePage: number;
}

const RateReview: React.FC<RateReviewProps> = ({
  review,
  productId,
  activePage,
}) => {
  const flashMessageContext = useFlashMessagesContext();
  const { userData } = useAuthContext();
  const queryClient = useQueryClient();

  const {
    mutate: mutateRate,
    isError: couldNotRate,
    error: rateError,
    isSuccess: ratedSuccessfully,
  } = useMutation({
    mutationFn: rateReview,
    onMutate: async (data) => {
      await queryClient.cancelQueries(['reviews', productId, activePage]);

      const prevData = queryClient.getQueryData<any>([
        'reviews',
        productId,
        activePage,
      ]);

      if (!prevData || !Array.isArray(prevData.reviews)) return { prevData };

      const updatedData = {
        ...prevData,
        reviews: (prevData.reviews as Review[]).map((oldReview) => {
          if (oldReview._id === review._id) {
            return {
              ...oldReview,
              liked: data.feedback === 'like' ? !oldReview.liked : false,
              disliked:
                data.feedback === 'dislike' ? !oldReview.disliked : false,
              likes: data.feedback === 'like' && oldReview.likes + 1,
              dislikes: data.feedback === 'dislike' && oldReview.dislikes + 1,
            };
          }
          return oldReview;
        }),
      };

      queryClient.setQueryData(['reviews', productId, activePage], updatedData);

      return { prevData };
    },

    onError: (error, data, context) => {
      if (context?.prevData) {
        queryClient.setQueryData(
          ['reviews', productId, activePage],
          context.prevData
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries(['reviews', productId, activePage]);
    },
  });

  const handleRateReview = (feedback: 'like' | 'dislike') => {
    mutateRate({
      reviewId: review._id,
      feedback,
    });
  };

  useEffect(() => {
    if (ratedSuccessfully) {
      queryClient.invalidateQueries(['reviews', productId, activePage]);
    }
    if (couldNotRate) {
      if (!userData) {
        flashMessageContext?.addFlashMessage({
          message: 'User is not authorized, please sign in.',
          state: 'error',
        });
        return;
      }
      flashMessageContext?.addFlashMessage({
        message: (rateError as Error).message,
        state: 'error',
      });
    }
  }, [couldNotRate, rateError, ratedSuccessfully]);

  return (
    <section className="flex items-center gap-3">
      <button
        className="p-2 disabled:cursor-not-allowed rounded-lg border-[1px] border-[#F4F6F8] group"
        onClick={() => handleRateReview('like')}
      >
        <IconLike
          className={`size-[22px] fill-[#C4CDD5] group-hover:fill-primary-green ${
            review?.liked ? 'fill-primary-green' : null
          }`}
        />
      </button>
      <button
        className="p-2 disabled:cursor-not-allowed rounded-lg border-[1px] border-[#F4F6F8] group"
        onClick={() => handleRateReview('dislike')}
      >
        <IconLike
          className={`fill-[#C4CDD5] size-[22px] rotate-180 group-hover:fill-primary-red  ${
            review?.disliked ? 'fill-primary-red' : null
          }`}
        />
      </button>
    </section>
  );
};

export default RateReview;

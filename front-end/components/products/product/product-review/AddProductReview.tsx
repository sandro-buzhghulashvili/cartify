'use client';
import { addReview } from '@/api/review';
import { IconStar } from '@/components/icons/Icons';
import { useAuthContext } from '@/contexts/AuthContext';
import { useFlashMessagesContext } from '@/contexts/FlashMessagesContext';
import { reviewSchema, ReviewSchemaType } from '@/schemas/ReviewSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';

interface AddProductReviewProps {
  productId: string;
}

const AddProductReview: React.FC<AddProductReviewProps> = ({ productId }) => {
  const { userData } = useAuthContext();
  const flashMessageContext = useFlashMessagesContext();

  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    mutate: reviewMutation,
    isLoading: addingReview,
    isError: couldNotReview,
    error: reviewError,
    isSuccess: reviewSuccess,
  } = useMutation({
    mutationFn: addReview,
  });

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
    reset,
  } = useForm<ReviewSchemaType>({
    resolver: zodResolver(reviewSchema),
  });

  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [rating, setRating] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredStar(index);
  };

  const handleMouseLeave = () => {
    setHoveredStar(null);
  };

  const handleClick = (index: number) => {
    const newRating = index + 1;
    setRating(newRating);
    setValue('rating', newRating);
    trigger('rating');
  };

  const onSubmit = (data: ReviewSchemaType) => {
    if (!userData) {
      console.log('run');
      flashMessageContext?.addFlashMessage({
        message: 'User is not authorized, please sign in.',
        state: 'error',
      });
      router.push('/signin');
    }
    reviewMutation({
      rating: data.rating,
      reviewBody: data.reviewBody,
      productId,
    });
  };

  const starButtons = useMemo(
    () =>
      Array.from({ length: 5 }).map((_, index) => (
        <button
          key={index}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index)}
          type="button"
          aria-label={`Rate ${index + 1} star${index + 1 > 1 ? 's' : ''}`}
        >
          <IconStar
            className={`size-5 ${
              index <= (hoveredStar ?? -1) || (rating && index < rating)
                ? '!fill-primary-yellow'
                : '!fill-white !stroke-primary-yellow'
            }  ${errors.rating ? '!stroke-red-400' : null}`}
          />
        </button>
      )),
    [hoveredStar, rating, errors.rating]
  );

  useEffect(() => {
    if (reviewSuccess) {
      flashMessageContext?.addFlashMessage({
        message: 'Review added successfully',
        state: 'success',
      });
      reset();
      setRating(null);
      queryClient.invalidateQueries(['reviews', productId]);
    }
    if (couldNotReview) {
      if (!userData) return;
      flashMessageContext?.addFlashMessage({
        message: (reviewError as Error).message || 'Could not review product',
        state: 'error',
      });
    }
  }, [reviewSuccess, couldNotReview]);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[30%] flex flex-col gap-5 p-5 bg-[#F9FAFB] text-primary-black"
    >
      <h1 className="font-medium text-lg">Write your review</h1>
      <div className="flex flex-col gap-3">
        <label
          className="text-sm text-teritary-gray font-normal"
          htmlFor="review"
        >
          Your review
        </label>
        <textarea
          placeholder="This product is..."
          rows={5}
          id="review"
          className={`px-5 py-3 focus:outline-none rounded-lg text-sm ${
            errors.reviewBody ? 'border-red-400 border-[1px]' : null
          }`}
          {...register('reviewBody')}
        ></textarea>
        {errors.reviewBody && (
          <span className="text-red-400 text-sm font-normal">
            {errors.reviewBody.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm text-teritary-gray font-normal">
          Your review
        </span>
        <div className="flex items-center gap-1">{starButtons}</div>
        {errors.rating && (
          <span className="text-red-400 text-sm font-normal">
            {errors.rating.message}
          </span>
        )}
      </div>
      <button className="w-full px-5 py-2 text-white rounded-lg bg-primary-indigo">
        {addingReview ? '...' : 'Submit Review'}
      </button>
    </form>
  );
};

export default AddProductReview;

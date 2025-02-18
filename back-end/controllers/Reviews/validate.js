export const validateReview = (reviewObj) => {
  const errors = [];

  const ratingIsValid =
    !isNaN(Number(reviewObj.rating)) &&
    Number(reviewObj.rating) > 0 &&
    Number(reviewObj.rating) <= 5;
  const reviewBodyIsValid = reviewObj.reviewBody.trim().length > 0;
  const reviewDateIsValid =
    reviewObj.reviewedAt.trim().length > 0 &&
    !isNaN(new Date(reviewObj.reviewedAt).getTime());

  if (!ratingIsValid) {
    errors.push('Rating is invalid');
  }
  if (!reviewBodyIsValid) {
    errors.push('Review body is invalid');
  }
  if (!reviewDateIsValid) {
    errors.push('Review date is invalid');
  }

  return {
    success: errors.length === 0,
    errors,
  };
};

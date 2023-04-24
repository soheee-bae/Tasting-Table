export const getCalculatedRating = (reviews) => {
  const sum = reviews.reduce((prevSum, review) => {
    return prevSum + (review.rating || 0);
  }, 0);

  const avg = sum / reviews.length;
  return Math.round(avg * 10) / 10;
};

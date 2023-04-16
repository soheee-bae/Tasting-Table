import React, { useContext, MouseEvent, useState, ChangeEvent, useEffect } from 'react';
import { format } from 'date-fns';

import styles from './RecipeDetailReviews.module.scss';
import AuthContext from 'contexts/authContext';
import { Recipe, Review, editRecipe, getRecipeById } from 'apis/recipe';
import { Toast, ToastSnackbar } from 'components/Toast/toast';
import { Success, Error, StarEmpty, StarFilled } from 'icons/index';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ImageUploader from 'components/ImageUploader/imageUploader';
import ReactStars from 'react-rating-stars-component';
import Button from 'components/Button/button';
import Bio from 'components/Bio/bio';
import BlankProfile from 'image/blankProfile.png';

interface RecipeDetailReviewsProps {
  recipe: Recipe;
}

export default function RecipeDetailReviews(props: RecipeDetailReviewsProps) {
  const { recipe } = props;

  const [prevReview, setPrevReview] = useState<Review[]>([]);

  async function fetchReviews() {
    const recipes = await getRecipeById({ id: recipe?._id || '' });
    setPrevReview(recipes.reviews);
  }

  useEffect(() => {
    fetchReviews();
  }, []);

  const { userId, profileImg, nickname } = useContext(AuthContext);
  const initialReview = {
    review: '',
    dateCreated: new Date(),
    userId,
    profileImg,
    nickname
  };
  const [newReview, setNewReview] = useState<Review>(initialReview);
  const [starsKey, setStarsKey] = useState(Math.random());

  async function onSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const reviews = [...(prevReview ?? []), newReview];

    if (recipe._id) {
      const res = await editRecipe({
        id: recipe?._id,
        data: {
          ...recipe,
          reviews
        }
      });
      if (res?.status === 200) {
        toast(<Toast icon={<Success />} title="리뷰가 등록되었습니다." />);
        setNewReview(initialReview);
        setPrevReview(reviews);
        setStarsKey(Math.random());
      } else {
        toast(
          <Toast icon={<Error />} title="문제가 발생했습니다." subtitle="다시 시도하십시오." />
        );
      }
    }
  }

  return (
    <div className={styles.recipeDetailReviews}>
      <p className={styles.recipeTitle}>리뷰</p>
      <div className={styles.reviewLists}>
        {prevReview?.map((review, i) => (
          <ReviewList key={i} review={review} />
        ))}
      </div>
      <ReviewField
        newReview={newReview}
        setNewReview={setNewReview}
        onSubmit={onSubmit}
        starsKey={starsKey}
      />
      <ToastSnackbar />
    </div>
  );
}

interface ReviewListProps {
  review: Review;
}

function ReviewList(props: ReviewListProps) {
  const { review } = props;

  return (
    <div className={styles.reviewList}>
      <div className={styles.reviewBio}>
        <Bio imgSrc={review?.profileImg || BlankProfile} title={review?.nickname ?? ''} />
      </div>
      <div className={styles.reviewListContent}>
        <div className={styles.reviewListHeader}>
          {review.rating && (
            <ReactStars
              count={5}
              edit={false}
              value={review.rating}
              size={20}
              emptyIcon={<StarEmpty />}
              fullIcon={<StarFilled />}
              activeColor="#563624"
              color="#d0d0d0"
            />
          )}
          <p className={styles.reviewDate}>{format(new Date(review.dateCreated), 'yyyy.MM.d')}</p>
        </div>
        <p className={styles.reviewText}>{review.review}</p>
        {review.img && <img src={review.img} alt={review.img} />}
      </div>
    </div>
  );
}

interface ReviewFieldProps {
  newReview: Review;
  setNewReview: (review: Review) => void;
  onSubmit: (e: MouseEvent<HTMLButtonElement>) => void;
  starsKey: number;
}

function ReviewField(props: ReviewFieldProps) {
  const { newReview, setNewReview, onSubmit, starsKey } = props;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files)
      setNewReview({ ...newReview, img: URL.createObjectURL(e.target?.files[0]) });
  };

  return (
    <div className={styles.reviewField}>
      <div className={styles.reviewFieldContent}>
        <ImageUploader
          imgSrc={newReview.img || ''}
          handleFileChange={handleFileChange}
          className={styles.reviewImageUploader}
          isRecipe
        />
        <ReactStars
          key={starsKey}
          count={5}
          onChange={(newRating: number) => {
            setNewReview({ ...newReview, rating: newRating });
          }}
          value={0}
          size={20}
          emptyIcon={<StarEmpty />}
          fullIcon={<StarFilled />}
          activeColor="#563624"
          color="#d0d0d0"
        />
      </div>
      <div className={styles.reviewFieldText}>
        <textarea
          placeholder="리뷰를 작성해주세요."
          rows={6}
          value={newReview?.review}
          onChange={(e) => {
            setNewReview({ ...newReview, review: e.target.value });
          }}
        />
      </div>
      <Button
        variant="outlined"
        onClick={onSubmit}
        className={styles.reviewButton}
        disabled={newReview?.review === ''}>
        등록
      </Button>
    </div>
  );
}
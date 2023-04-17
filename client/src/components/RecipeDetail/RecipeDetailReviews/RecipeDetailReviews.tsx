import React, { useContext, MouseEvent, useState, ChangeEvent, useEffect } from 'react';
import { format } from 'date-fns';

import styles from './RecipeDetailReviews.module.scss';
import AuthContext from 'contexts/authContext';
import { Recipe, Review, editRecipe, getRecipeById } from 'apis/recipe';
import { Success, Error, StarEmpty, StarFilled } from 'icons/index';
import BlankProfile from 'image/blankProfile.png';

import ReactStars from 'react-rating-stars-component';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Toast, ToastSnackbar } from 'components/Toast/toast';
import ImageUploader from 'components/ImageUploader/imageUploader';
import Button from 'components/Button/button';
import Bio from 'components/Bio/bio';
import { getProfileByUserId } from 'apis/profile';
import LoadingIndicator from 'components/LoadingIndicator/loadingIndicator';
import { blob } from 'node:stream/consumers';

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
  }, [recipe?._id]);

  const { userId } = useContext(AuthContext);
  const initialReview = {
    review: '',
    dateCreated: new Date(),
    userId
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
  const [profile, setProfile] = useState({ profileImg: '', nickname: '', name: '' });
  const [isLoading, setIsLoading] = useState(true);

  async function fetchProfile() {
    const profile = await getProfileByUserId({ id: review?.userId });
    setProfile(profile);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchProfile();
  }, [review?.userId]);

  return (
    <LoadingIndicator isLoading={isLoading}>
      <div className={styles.reviewList}>
        <div className={styles.reviewBio}>
          <Bio
            imgSrc={profile?.profileImg || BlankProfile}
            title={profile?.nickname ?? profile.name}
          />
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
          {review.img && review.img.length > 0 && (
            <div>
              {review.img?.map((img, i) => (
                <img key={i} src={img} alt={img} />
              ))}
            </div>
          )}
        </div>
      </div>
    </LoadingIndicator>
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

  const handleFileChange = (urlLists: string[]) => {
    if (urlLists.length > 0) setNewReview({ ...newReview, img: urlLists });
  };

  return (
    <div className={styles.reviewField}>
      <ReactStars
        key={starsKey}
        count={5}
        onChange={(newRating: number) => {
          setNewReview({ ...newReview, rating: newRating });
        }}
        value={0}
        size={20}
        s
        emptyIcon={<StarEmpty />}
        fullIcon={<StarFilled />}
        activeColor="#563624"
        color="#d0d0d0"
      />

      <div className={styles.reviewFieldContent}>
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
      <ImageUploader
        handleFileChange={handleFileChange}
        className={styles.reviewImageUploader}
        isRecipe
        multiple
      />
    </div>
  );
}

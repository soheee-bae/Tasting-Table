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
      } else {
        toast(
          <Toast icon={<Error />} title="문제가 발생했습니다." subtitle="다시 시도하십시오." />
        );
      }
    }
  }

  return (
    <div className={styles.RecipeDetailReviews}>
      {prevReview?.map((review, i) => (
        <ReviewList key={i} review={review} />
      ))}
      <ReviewField newReview={newReview} setNewReview={setNewReview} onSubmit={onSubmit} />
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
    <div>
      <Bio imgSrc={review?.profileImg || BlankProfile} title={review?.nickname ?? ''} />
      <img src={review.img} alt={review.img} />
      <p>{review.rating}</p>
      <p>{format(new Date(review.dateCreated), 'yyyy년 M월 d일')}</p>
      <p>{review.review}</p>
    </div>
  );
}

interface ReviewFieldProps {
  newReview: Review;
  setNewReview: (review: Review) => void;
  onSubmit: (e: MouseEvent<HTMLButtonElement>) => void;
}

function ReviewField(props: ReviewFieldProps) {
  const { newReview, setNewReview, onSubmit } = props;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files)
      setNewReview({ ...newReview, img: URL.createObjectURL(e.target?.files[0]) });
  };

  return (
    <div>
      <ImageUploader
        imgSrc={newReview.img || ''}
        handleFileChange={handleFileChange}
        className={styles.recipeImageUploader}
        isRecipe
      />
      <textarea
        placeholder="리뷰를 작성해주세요."
        rows={3}
        value={newReview?.review}
        onChange={(e) => {
          setNewReview({ ...newReview, review: e.target.value });
        }}
      />
      <ReactStars
        count={5}
        onChange={(newRating: number) => {
          setNewReview({ ...newReview, rating: newRating });
        }}
        value={0}
        size={24}
        emptyIcon={<StarEmpty />}
        fullIcon={<StarFilled />}
        activeColor="#ffd700"
      />
      <Button variant="outlined" onClick={onSubmit}>
        등록
      </Button>
    </div>
  );
}

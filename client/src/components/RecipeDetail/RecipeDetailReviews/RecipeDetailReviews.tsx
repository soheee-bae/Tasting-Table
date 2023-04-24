import React, { useContext, MouseEvent, useState, useEffect } from 'react';
import { format } from 'date-fns';

import styles from './RecipeDetailReviews.module.scss';
import AuthContext from 'contexts/authContext';
import { Recipe, Review, editRecipe, getRecipeById } from 'apis/recipe';
import { ProfileProps, getProfileByUserId } from 'apis/profile';
import { Success, Error, StarEmpty, StarFilled } from 'icons/index';

import ReactStars from 'react-rating-stars-component';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Toast, ToastSnackbar } from 'components/Toast/toast';
import Button from 'components/Button/button';
import Bio from 'components/Bio/bio';
import LoadingIndicator, { LoadingIcon } from 'components/LoadingIndicator/loadingIndicator';
import ImageUploaderMulti from 'components/ImageUploaderMulti/imageUploaderMulti';
import { uploadImage } from 'helpers/uploadImage';
import { getCalculatedRating } from 'helpers/getCalculatedRating';

interface RecipeDetailReviewsProps {
  recipe: Recipe;
  profile: ProfileProps;
}

export default function RecipeDetailReviews(props: RecipeDetailReviewsProps) {
  const { recipe, profile } = props;

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
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [starsKey, setStarsKey] = useState(Math.random());
  const [isLoading, setIsLoading] = useState(false);

  const getImgUrl = async (files) => {
    const urls: string[] = [];
    for (const file of files) {
      const url = await uploadImage(file);
      urls.push(url.location);
    }
    return urls;
  };

  async function onSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    let imgUrl;
    if (selectedFiles) {
      setIsLoading(true);
      imgUrl = await getImgUrl(selectedFiles);
    }
    if (recipe._id) {
      const reviews = [...(prevReview ?? []), { ...newReview, img: imgUrl ?? [] }];
      const rating = await getCalculatedRating(reviews);
      console.log(rating);
      const res = await editRecipe({
        id: recipe?._id,
        data: {
          ...recipe,
          rating,
          reviews
        }
      });
      if (res?.status === 200) {
        toast(<Toast icon={<Success />} title="리뷰가 등록되었습니다." />);
        setNewReview(initialReview);
        setPrevReview(reviews);
        setSelectedFiles([]);
        setStarsKey(Math.random());
      } else {
        toast(
          <Toast icon={<Error />} title="문제가 발생했습니다." subtitle="다시 시도하십시오." />
        );
      }
    }
    setIsLoading(false);
  }

  return (
    <div className={styles.recipeDetailReviews}>
      <p className={styles.recipeTitle}>
        리뷰 | <span>({prevReview.length})</span>
      </p>
      <div className={styles.reviewLists}>
        {prevReview?.map((review, i) => (
          <ReviewList key={i} review={review} index={i} />
        ))}
      </div>
      <ReviewField
        newReview={newReview}
        setNewReview={setNewReview}
        onSubmit={onSubmit}
        starsKey={starsKey}
        profile={profile}
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
        isLoading={isLoading}
      />
      <ToastSnackbar />
    </div>
  );
}

interface ReviewListProps {
  review: Review;
  index: number;
}

function ReviewList(props: ReviewListProps) {
  const { review, index } = props;
  const [profile, setProfile] = useState({ profileImg: '', nickname: '', name: '', email: '' });
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
      <div className={styles.reviewList} data-first={index === 0}>
        <div>
          <Bio
            imgSrc={profile?.profileImg ?? ''}
            title={(profile?.nickname || profile?.email) ?? profile.name}
          />
        </div>
        <div className={styles.reviewListContent}>
          <div className={styles.reviewListHeader}>
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

            <p className={styles.reviewDate}>{format(new Date(review.dateCreated), 'yyyy.MM.d')}</p>
          </div>
          <p className={styles.reviewText}>{review.review}</p>
          {review.img && review.img.length > 0 && (
            <div className={styles.reviewImg}>
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
  profile: ProfileProps;
  selectedFiles: File[];
  setSelectedFiles: (files: File[]) => void;
  isLoading: boolean;
}

function ReviewField(props: ReviewFieldProps) {
  const {
    newReview,
    setNewReview,
    onSubmit,
    starsKey,
    profile,
    selectedFiles,
    setSelectedFiles,
    isLoading
  } = props;

  const handleFileChange = async (file: File[]) => {
    setSelectedFiles(file);
  };

  const disabled = !newReview.rating;
  return (
    <div className={styles.reviewField}>
      <div className={styles.reviewFieldHeader}>
        <Bio imgSrc={profile?.profileImg ?? ''} title={profile?.nickname || profile?.email || ''} />
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
          disabled={disabled}>
          {isLoading ? <LoadingIcon /> : '등록'}
        </Button>
      </div>
      <ImageUploaderMulti handleFileChange={handleFileChange} selectedFiles={selectedFiles} />
    </div>
  );
}

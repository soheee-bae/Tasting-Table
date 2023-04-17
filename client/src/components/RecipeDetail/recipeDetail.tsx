import { Recipe, getRecipesByCategory, getRecipesByUserId } from 'apis/recipe';
import React, { useContext, useEffect, useState } from 'react';
import styles from './recipeDetail.module.scss';

import AuthContext from 'contexts/authContext';
import { BookmarkProps, getBookmarksByUserId } from 'apis/bookmark';
import { getProfileByUserId } from 'apis/profile';
import food from 'image/food.png';

import RecipeDetailGeneral from './RecipeDetailGeneral/recipeDetailGeneral';
import RecipeDetailIngredients from './RecipeDetailIngredients/recipeDetailIngredients';
import RecipeDetailOtherRecom from './RecipeDetailOtherRecom/recipeDetailOtherRecom';
import RecipeDetailSimilarType from './RecipeDetailSimilarType/recipeDetailSimilarType';
import RecipeDetailSteps from './RecipeDetailSteps/recipeDetailSteps';
import RecipeDetailReviews from './RecipeDetailReviews/RecipeDetailReviews';
import LoadingIndicator from 'components/LoadingIndicator/loadingIndicator';

interface RecipeDetailProps {
  recipe: Recipe;
}
export default function RecipeDetail(props: RecipeDetailProps) {
  const { recipe } = props;
  const { userId } = useContext(AuthContext);

  const [profile, setProfile] = useState({});
  const [otherRecom, setOtherRecom] = useState([]);
  const [similarRecipe, setSimilarRecipe] = useState([]);
  const [bookmark, setBookmark] = useState();
  const [isLoading, setIsLoading] = useState(true);

  async function fetchProfile() {
    const profile = await getProfileByUserId({ id: recipe?.userId });
    setProfile(profile);
    const otherRecom = await getRecipesByUserId({ id: recipe?.userId });
    const filteredOther = otherRecom?.filter((other) => other._id !== recipe._id);
    setOtherRecom(filteredOther);
    const similarRecipe = await getRecipesByCategory({ id: recipe?.categoryType?.id || 0 });
    const filteredSimilar = similarRecipe?.filter((similar) => similar._id !== recipe._id);
    setSimilarRecipe(filteredSimilar);
  }

  async function fetchMyBookmarks() {
    const bookmarks = await getBookmarksByUserId({ id: userId });
    const bookmark = bookmarks.find((mark: BookmarkProps) => recipe._id === mark._id);
    setBookmark(bookmark);
  }

  useEffect(() => {
    fetchProfile();
    fetchMyBookmarks();
    setIsLoading(false);
  }, [recipe?._id]);

  return (
    <LoadingIndicator isLoading={isLoading}>
      <div className={styles.recipeDetail}>
        <img src={recipe?.img || food} alt="food" className={styles.recipeImg} />
        <RecipeDetailGeneral recipe={recipe} profile={profile} bookmark={bookmark} />
        <RecipeDetailIngredients recipe={recipe} />
        <RecipeDetailSteps recipe={recipe} />
        <RecipeDetailOtherRecom otherRecom={otherRecom} />
        <RecipeDetailSimilarType
          category={recipe?.categoryType?.name || ''}
          similarRecipe={similarRecipe}
        />
        <RecipeDetailReviews recipe={recipe} profile={profile} />
      </div>
    </LoadingIndicator>
  );
}

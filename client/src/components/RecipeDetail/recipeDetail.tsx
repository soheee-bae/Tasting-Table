import { Recipe, getRecipesByCategory, getRecipesByUserId } from 'apis/recipe';
import React, { useContext, useEffect, useState } from 'react';
import styles from './recipeDetail.module.scss';

import { getProfileByUserId } from 'apis/profile';
import food from 'image/food.png';

import RecipeDetailGeneral from './RecipeDetailGeneral/recipeDetailGeneral';
import RecipeDetailIngredients from './RecipeDetailIngredients/recipeDetailIngredients';
import RecipeDetailOtherRecom from './RecipeDetailOtherRecom/recipeDetailOtherRecom';
import RecipeDetailSimilarType from './RecipeDetailSimilarType/recipeDetailSimilarType';
import RecipeDetailSteps from './RecipeDetailSteps/recipeDetailSteps';
import { BookmarkProps, getBookmarksByUserId } from 'apis/bookmark';
import AuthContext from 'contexts/authContext';
import RecipeDetailReviews from './RecipeDetailReviews/RecipeDetailReviews';

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

  async function fetchProfile() {
    const profile = await getProfileByUserId({ id: recipe?.userId });
    const otherRecom = await getRecipesByUserId({ id: recipe?.userId });
    const similarRecipe = await getRecipesByCategory({ id: recipe?.categoryType?.id || 0 });
    setProfile(profile);
    setOtherRecom(otherRecom);
    setSimilarRecipe(similarRecipe);
  }

  async function fetchMyBookmarks() {
    const bookmarks = await getBookmarksByUserId({ id: userId });
    const bookmark = bookmarks.find((mark: BookmarkProps) => recipe._id === mark._id);
    setBookmark(bookmark);
  }

  useEffect(() => {
    fetchProfile();
    fetchMyBookmarks();
  }, []);

  return (
    <div className={styles.recipeDetail}>
      <img src={recipe?.img || food} alt="food" />
      <RecipeDetailGeneral recipe={recipe} profile={profile} bookmark={bookmark} />
      <RecipeDetailIngredients recipe={recipe} />
      <RecipeDetailSteps recipe={recipe} />
      <RecipeDetailOtherRecom otherRecom={otherRecom} />
      <RecipeDetailSimilarType
        category={recipe?.categoryType?.name || ''}
        similarRecipe={similarRecipe}
      />
      <RecipeDetailReviews recipe={recipe} />
    </div>
  );
}

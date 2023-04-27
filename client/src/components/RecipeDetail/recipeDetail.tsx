import { Recipe, getRecipesByCategory, getRecipesByUserId } from 'apis/recipe';
import React, { useContext, useEffect, useState } from 'react';
import styles from './recipeDetail.module.scss';

import AuthContext from 'contexts/authContext';
import { getProfileByUserId } from 'apis/profile';

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
  const [isLoading, setIsLoading] = useState(true);
  const [currentProfile, setCurrentProfile] = useState({});

  async function fetchProfile() {
    const profile = await getProfileByUserId({ id: recipe?.userId });
    setProfile(profile);
    const currentProfile = await getProfileByUserId({ id: userId });
    setCurrentProfile(currentProfile);
    const otherRecom = await getRecipesByUserId({ id: recipe?.userId });
    const filteredOther = otherRecom?.filter((other) => other._id !== recipe._id);
    setOtherRecom(filteredOther);
    const similarRecipe = await getRecipesByCategory({ id: recipe?.categoryType?.id || 0 });
    const filteredSimilar = similarRecipe?.filter((similar) => similar._id !== recipe._id);
    setSimilarRecipe(filteredSimilar);
  }

  useEffect(() => {
    fetchProfile();
    setIsLoading(false);
  }, [recipe?._id]);

  return (
    <LoadingIndicator isLoading={isLoading}>
      <div className={styles.recipeDetail}>
        <img src={recipe?.img} alt="recipe" className={styles.recipeImg} />
        <RecipeDetailGeneral recipe={recipe} profile={profile} />
        <RecipeDetailIngredients recipe={recipe} />
        <RecipeDetailSteps recipe={recipe} />
        <RecipeDetailOtherRecom otherRecom={otherRecom} />
        <RecipeDetailSimilarType
          category={recipe?.categoryType?.name || ''}
          similarRecipe={similarRecipe}
        />
        <RecipeDetailReviews recipe={recipe} profile={currentProfile} />
      </div>
    </LoadingIndicator>
  );
}

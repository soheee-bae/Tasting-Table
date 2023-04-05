import { Recipe, getRecipesByCategory, getRecipesByUserId } from 'apis/recipe';
import React, { useEffect, useState } from 'react';
import styles from './recipeDetail.module.scss';

import { getProfileByUserId } from 'apis/profile';
import food from 'image/food.png';

import RecipeDetailGeneral from './RecipeDetailGeneral/recipeDetailGeneral';
import RecipeDetailIngredients from './RecipeDetailIngredients/recipeDetailIngredients';
import RecipeDetailOtherRecom from './RecipeDetailOtherRecom/recipeDetailOtherRecom';
import RecipeDetailSimilarType from './RecipeDetailSimilarType/recipeDetailSimilarType';
import RecipeDetailSteps from './RecipeDetailSteps/recipeDetailSteps';

interface RecipeDetailProps {
  recipe: Recipe;
}
export default function RecipeDetail(props: RecipeDetailProps) {
  const { recipe } = props;
  const [profile, setProfile] = useState({});
  const [otherRecom, setotherRecom] = useState([]);
  const [similarRecipe, setSimilarRecipe] = useState([]);

  async function fetchProfile() {
    const profile = await getProfileByUserId({ id: recipe?.userId });
    const otherRecom = await getRecipesByUserId({ id: recipe?.userId });
    const similarRecipe = await getRecipesByCategory({ id: recipe?.categoryType?.id || 0 });
    setProfile(profile);
    setotherRecom(otherRecom);
    setSimilarRecipe(similarRecipe);
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className={styles.recipeDetail}>
      <img src={recipe.img || food} alt="food" />
      <RecipeDetailGeneral recipe={recipe} profile={profile} />
      <RecipeDetailIngredients recipe={recipe} />
      <RecipeDetailSteps recipe={recipe} />
      <RecipeDetailOtherRecom otherRecom={otherRecom} />
      <RecipeDetailSimilarType
        category={recipe?.categoryType?.name || ''}
        similarRecipe={similarRecipe}
      />
    </div>
  );
}

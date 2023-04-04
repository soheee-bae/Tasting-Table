import { Recipe } from 'apis/recipe';
import React, { useEffect, useState } from 'react';
import styles from './recipeDetail.module.scss';

import food from '../../image/food.png';
import RecipeDetailGeneral from './RecipeDetailGeneral/recipeDetailGeneral';
import RecipeDetailIngredients from './RecipeDetailIngredients/recipeDetailIngredients';
import RecipeDetailOtherRecom from './RecipeDetailOtherRecom/recipeDetailOtherRecom';
import RecipeDetailSimilarType from './RecipeDetailSimilarType/recipeDetailSimilarType';
import RecipeDetailSteps from './RecipeDetailSteps/recipeDetailSteps';
import { getProfile } from 'apis/profile';

interface RecipeDetailProps {
  recipe: Recipe;
}
export default function RecipeDetail(props: RecipeDetailProps) {
  const { recipe } = props;
  const [profile, setProfile] = useState({});

  async function fetchProfile() {
    const profile = await getProfile();
    setProfile(profile);
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className={styles.recipeDetail}>
      <img src={food} alt="food" />
      <RecipeDetailGeneral recipe={recipe} profile={profile} />
      <RecipeDetailIngredients recipe={recipe} />
      <RecipeDetailSteps recipe={recipe} />
      <RecipeDetailOtherRecom recipe={recipe} />
      <RecipeDetailSimilarType recipe={recipe} />
    </div>
  );
}

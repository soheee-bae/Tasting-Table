import { Recipe } from 'apis/recipe';
import React from 'react';
import styles from './recipeDetail.module.scss';

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
  return (
    <div className={styles.recipeDetail}>
      <RecipeDetailGeneral recipe={recipe} />
      <RecipeDetailIngredients recipe={recipe} />
      <RecipeDetailSteps recipe={recipe} />
      <RecipeDetailOtherRecom recipe={recipe} />
      <RecipeDetailSimilarType recipe={recipe} />
    </div>
  );
}

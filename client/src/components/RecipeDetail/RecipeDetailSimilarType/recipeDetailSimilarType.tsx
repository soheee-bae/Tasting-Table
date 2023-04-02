import { Recipe } from 'apis/recipe';
import React from 'react';

import styles from './recipeDetailSimilarType.module.scss';

interface RecipeDetailSimilarTypeProps {
  recipe: Recipe;
}
export default function RecipeDetailSimilarType(props: RecipeDetailSimilarTypeProps) {
  const { recipe } = props;
  return <div className={styles.recipeDetailSimilarTyped}></div>;
}

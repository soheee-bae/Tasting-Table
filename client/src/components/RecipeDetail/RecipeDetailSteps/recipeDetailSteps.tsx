import { Recipe } from 'apis/recipe';
import React from 'react';

import styles from './recipeDetailSteps.module.scss';

interface RecipeDetailStepsProps {
  recipe: Recipe;
}
export default function RecipeDetailSteps(props: RecipeDetailStepsProps) {
  const { recipe } = props;
  return <div className={styles.recipeDetailSteps}></div>;
}

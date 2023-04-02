import { Recipe } from 'apis/recipe';
import React from 'react';

import styles from './recipeDetailOtherRecom.module.scss';

interface RecipeDetailOtherRecomProps {
  recipe: Recipe;
}
export default function RecipeDetailOtherRecom(props: RecipeDetailOtherRecomProps) {
  const { recipe } = props;
  return <div className={styles.recipeDetailOtherRecom}></div>;
}

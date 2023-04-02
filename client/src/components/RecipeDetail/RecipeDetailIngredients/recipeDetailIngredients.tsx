import { Recipe } from 'apis/recipe';
import React from 'react';

import styles from './recipeDetailIngredients.module.scss';

interface RecipeDetailIngredientsProps {
  recipe: Recipe;
}
export default function RecipeDetailIngredients(props: RecipeDetailIngredientsProps) {
  const { recipe } = props;
  return <div className={styles.recipeDetailIngredients}></div>;
}

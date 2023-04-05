import { Recipe } from 'apis/recipe';
import React from 'react';
import food from 'image/food.png';

import styles from './recipeDetailSimilarType.module.scss';

interface RecipeDetailSimilarTypeProps {
  category: string;
  similarRecipe: Recipe[];
}
export default function RecipeDetailSimilarType(props: RecipeDetailSimilarTypeProps) {
  const { category, similarRecipe } = props;
  const slicedSimilarRecipe = similarRecipe.slice(0, 6);
  return (
    <div className={styles.recipeDetailSimilarTyped}>
      <p className={styles.title}>
        다른 <span>{category}</span> 레시피들
      </p>
      <div className={styles.similarRecipeLists}>
        {slicedSimilarRecipe.map((recipe) => (
          <div key={recipe.name} className={styles.similarRecipe}>
            <img src={recipe.img || food} alt={recipe.name} />
            <p>{recipe.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

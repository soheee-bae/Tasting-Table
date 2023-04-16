import React from 'react';
import { Recipe } from 'apis/recipe';

import styles from './recipeDetailSimilarType.module.scss';
import RecipeItem from 'components/RecipeItem/recipeItem';

interface RecipeDetailSimilarTypeProps {
  category: string;
  similarRecipe: Recipe[];
}
export default function RecipeDetailSimilarType(props: RecipeDetailSimilarTypeProps) {
  const { category, similarRecipe } = props;
  const slicedSimilarRecipe = similarRecipe.slice(0, 6);

  if (!similarRecipe || similarRecipe.length === 0) return null;

  return (
    <div className={styles.recipeDetailSimilarTyped}>
      <p className={styles.title}>
        다른 <span>{category}</span> 레시피들
      </p>
      <div className={styles.similarRecipeLists}>
        {slicedSimilarRecipe.map((recipe) => (
          <RecipeItem
            key={recipe._id}
            recipe={recipe}
            className={styles.similarRecipe}
            noDetails={true}
          />
        ))}
      </div>
    </div>
  );
}

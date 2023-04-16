import { Recipe } from 'apis/recipe';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import food from 'image/food.png';

import styles from './recipeDetailSimilarType.module.scss';
import RecipeItem from 'components/RecipeItem/recipeItem';

interface RecipeDetailSimilarTypeProps {
  category: string;
  similarRecipe: Recipe[];
}
export default function RecipeDetailSimilarType(props: RecipeDetailSimilarTypeProps) {
  const { category, similarRecipe } = props;
  const navigate = useNavigate();
  const slicedSimilarRecipe = similarRecipe.slice(0, 6);

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

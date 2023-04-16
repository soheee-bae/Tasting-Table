import { Recipe } from 'apis/recipe';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import food from 'image/food.png';

import styles from './recipeDetailOtherRecom.module.scss';
import RecipeItem from 'components/RecipeItem/recipeItem';

interface RecipeDetailOtherRecomProps {
  otherRecom: Recipe[];
}
export default function RecipeDetailOtherRecom(props: RecipeDetailOtherRecomProps) {
  const { otherRecom } = props;
  const slicedOtherRecom = otherRecom.slice(0, 6);

  return (
    <div className={styles.recipeDetailOtherRecom}>
      <p className={styles.title}>레시피 작성자의 다른 레시피들</p>
      <div className={styles.otherRecomLists}>
        {slicedOtherRecom.map((recipe) => (
          <RecipeItem
            key={recipe._id}
            recipe={recipe}
            className={styles.otherRecom}
            noDetails={true}
          />
        ))}
      </div>
    </div>
  );
}

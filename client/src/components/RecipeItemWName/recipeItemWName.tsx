import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './recipeItemWName.module.scss';

import { Recipe } from 'apis/recipe';
import clsx from 'clsx';

interface RecipeItemWNameProps {
  recipe: Recipe;
  noDetails?: boolean;
  className?: string;
}

export default function RecipeItemWName(props: RecipeItemWNameProps) {
  const { recipe, noDetails, className } = props;
  const { _id, name, img } = recipe;
  const navigate = useNavigate();

  return (
    <div
      className={clsx(className, styles.recipeItemWName)}
      onClick={() => {
        navigate(`/recipe/${_id}`);
      }}>
      <div className={styles.recipeItemWNameImage}>
        <img src={img} alt={name} />
        <div className={styles.recipeItemWNameImgCover}>
          {!noDetails && (
            <div className={styles.recipeItemWNameImgCoverContent}>
              <p className={styles.recipeItemCategory}>{recipe.categoryType?.name}</p>
              <p className={styles.recipeItemName}>{recipe.name}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

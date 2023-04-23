import { Recipe } from 'apis/recipe';
import React from 'react';

import styles from './recipeDetailSteps.module.scss';

interface RecipeDetailStepsProps {
  recipe: Recipe;
}
export default function RecipeDetailSteps(props: RecipeDetailStepsProps) {
  const { recipe } = props;

  return (
    <div className={styles.recipeDetailSteps}>
      <p className={styles.title}>레시피</p>
      <ul className={styles.recipeStepLists}>
        {recipe?.steps?.map((step, index) => (
          <li key={step.details} className={styles.recipeStepList}>
            <img
              src={step.img || 'https://tastingtable.s3.amazonaws.com/noImage.jpeg'}
              alt={step.details}
            />
            <div className={styles.stepDetail}>
              <p className={styles.stepDetailTitle}>Step {index + 1}</p>
              <p>{step.details}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

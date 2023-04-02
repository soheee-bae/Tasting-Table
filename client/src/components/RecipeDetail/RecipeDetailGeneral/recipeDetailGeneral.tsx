import { Recipe } from 'apis/recipe';
import React from 'react';
import { format } from 'date-fns';

import styles from './recipeDetailGeneral.module.scss';

interface RecipeDetailGeneralProps {
  recipe: Recipe;
}
export default function RecipeDetailGeneral(props: RecipeDetailGeneralProps) {
  const { recipe } = props;
  return (
    <div className={styles.recipeDetailGeneral}>
      <GeneralHeader recipe={recipe} />
      <GeneralDescription recipe={recipe} />
    </div>
  );
}

function GeneralHeader(props: RecipeDetailGeneralProps) {
  const { recipe } = props;
  return (
    <div className={styles.recipeDetailGeneralContent}>
      <div className={styles.generalHeader}>
        <div>
          <p>{recipe.categoryType?.name}</p>
          <p>{recipe.name}</p>
        </div>
        <div></div>
      </div>
      <div className={styles.otherGeneralDetail}>
        <div>
          <p>난이도 {recipe.level}</p>
          <p>소요시간 {recipe.duration}분</p>
        </div>
        {recipe?.createdDate ? (
          <p>{format(new Date(recipe.createdDate), 'yyyy년 M월 d일')}</p>
        ) : null}
      </div>
    </div>
  );
}

function GeneralDescription(props: RecipeDetailGeneralProps) {
  const { recipe } = props;
  return (
    <div className={styles.recipeDetailGeneralContent}>
      <div></div>
      <p>{recipe.description}</p>
    </div>
  );
}

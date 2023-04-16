import React from 'react';
import { Recipe } from 'apis/recipe';

import styles from './recipeDetailIngredients.module.scss';

interface RecipeDetailIngredientsProps {
  recipe: Recipe;
}
export default function RecipeDetailIngredients(props: RecipeDetailIngredientsProps) {
  const { recipe } = props;
  if (!recipe) return null;

  return (
    <div className={styles.recipeDetailIngredients}>
      <p className={styles.title}>재료</p>
      <div className={styles.recipeDetailIngredientsContent}>
        {recipe.ingredients?.map((ingredient, index) => {
          const subIngredients = ingredient.ingredient;
          return (
            <div key={index}>
              <div className={styles.header}>
                <p>{ingredient.name}</p>
                {index === 0 && recipe.amounts && (
                  <p className={styles.amounts}>{recipe.amounts}인분</p>
                )}
              </div>
              <ul className={styles.subIngredientLists}>
                {subIngredients.map((sub, i) => (
                  <li key={i} className={styles.subIngredientList}>
                    <p>{sub.name}</p>
                    <p className={styles.mensuration}>{sub.mensuration}</p>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

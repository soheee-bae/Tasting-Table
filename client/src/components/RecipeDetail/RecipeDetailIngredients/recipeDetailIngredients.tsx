import { Recipe } from 'apis/recipe';
import React from 'react';

import styles from './recipeDetailIngredients.module.scss';

interface RecipeDetailIngredientsProps {
  recipe: Recipe;
}
export default function RecipeDetailIngredients(props: RecipeDetailIngredientsProps) {
  const { recipe } = props;
  return (
    <div className={styles.recipeDetailIngredients}>
      <p className={styles.title}>재료</p>
      <div className={styles.recipeDetailIngredientsContent}>
        {recipe.ingredients?.map((ingredient, index) => {
          const subIngredients = ingredient.ingredient;
          return (
            <div key={ingredient.id} className={styles.innerContent}>
              <div className={styles.header}>
                <p className={styles.name}>{ingredient.name}</p>
                {index === 0 && <p className={styles.amounts}>{recipe.amounts}</p>}
              </div>
              <ul className={styles.subIngredientLists}>
                {subIngredients.map((sub) => (
                  <li key={sub.id} className={styles.subIngredientList}>
                    <p className={styles.name}>{sub.name}</p>
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

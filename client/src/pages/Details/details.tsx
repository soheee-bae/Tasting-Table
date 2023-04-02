import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './details.module.scss';

import { getRecipeById, Recipe } from 'apis/recipe';

export default function Details() {
  const [isLoading, setIsLoading] = useState(true);
  const [recipe, setRecipe] = useState([]);
  const { recipeId = '' } = useParams();

  async function fetchRecipe() {
    const recipe = await getRecipeById({ id: recipeId });
    setRecipe(recipe);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchRecipe();
  }, []);

  return (
    <div className={styles.details}>
      <div className={styles.detilsContainer}></div>
    </div>
  );
}

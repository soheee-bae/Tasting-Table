import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './details.module.scss';

import { getRecipeById } from 'apis/recipe';
import LoadingIndicator from 'components/LoadingIndicator/loadingIndicator';
import RecipeDetail from 'components/RecipeDetail/recipeDetail';

export default function Details() {
  const { recipeId = '' } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [recipe, setRecipe] = useState({ userId: '' });

  async function fetchRecipe() {
    const recipe = await getRecipeById({ id: recipeId });
    setRecipe(recipe);
    setIsLoading(false);
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    fetchRecipe();
    scrollToTop();
  }, [recipeId]);

  return (
    <div className={styles.details}>
      <div className={styles.detailsContainer}>
        <LoadingIndicator isLoading={isLoading}>
          <RecipeDetail recipe={recipe} />
        </LoadingIndicator>
      </div>
    </div>
  );
}

import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './details.module.scss';

import LoadingIndicator from 'components/LoadingIndicator/loadingIndicator';
import RecipeDetail from 'components/RecipeDetail/recipeDetail';

import { getRecipeById } from 'apis/recipe';
import AuthContext from 'contexts/authContext';

export default function Details() {
  const { userId } = useContext(AuthContext);
  const { recipeId = '' } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [recipe, setRecipe] = useState({ userId });

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
      <div className={styles.detailsContainer}>
        <LoadingIndicator isLoading={isLoading}>
          <RecipeDetail recipe={recipe} />
        </LoadingIndicator>
      </div>
    </div>
  );
}

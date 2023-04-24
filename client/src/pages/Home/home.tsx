import React, { useEffect, useState } from 'react';
import styles from './home.module.scss';

import { getAllRecipes } from 'apis/recipe';
import AllRecipe from 'components/AllRecipe/allRecipe';
import AllRecipeRecomm from 'components/AllRecipeRecomm/allRecipeRecomm';
import Banner from 'components/Banner/banner';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);

  async function fetchAllRecipe() {
    const recipes = await getAllRecipes();
    setRecipes(recipes);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchAllRecipe();
  }, []);

  return (
    <div className={styles.home}>
      <AllRecipeRecomm recipes={recipes} isLoading={isLoading} />
      <Banner />
      <AllRecipe recipes={recipes} isLoading={isLoading} />
    </div>
  );
}

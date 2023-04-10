import React, { useState, useEffect, ChangeEvent } from 'react';
import styles from './search.module.scss';

import { Search as SearchIcon } from 'icons/index';
import Titles from 'components/Titles/title';
import { Recipe, getAllRecipes } from 'apis/recipe';
import LoadingIndicator from 'components/LoadingIndicator/loadingIndicator';
import RecipeItems from 'components/RecipeItems/recipeItems';

export default function Search() {
  const [search, setSearch] = useState('');

  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchAllRecipe() {
    const recipes = await getAllRecipes();
    setRecipes(recipes);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchAllRecipe();
  }, []);

  const filteredRecipes = recipes.filter(
    (recipe: Recipe) => recipe?.name?.includes(search) || search === ''
  );

  return (
    <div className={styles.search}>
      <div className={styles.searchContainer}>
        <Titles title="SEARCH" subTitle="원하는 레시피를 찾아보세요" />
        <div className={styles.inputField}>
          <SearchIcon />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <div className={styles.searchContent}>
          <LoadingIndicator isLoading={isLoading}>
            {filteredRecipes?.length === 0 ? (
              <div className={styles.emptyContent}>찾으시는 레시피가 없습니다.</div>
            ) : (
              <RecipeItems recipe={filteredRecipes || []} />
            )}
          </LoadingIndicator>
        </div>
      </div>
    </div>
  );
}

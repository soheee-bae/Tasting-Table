import React, { useState, useEffect } from 'react';
import styles from './search.module.scss';

import { Search as SearchIcon } from 'icons/index';
import Titles from 'components/Titles/title';
import { Recipe, getAllRecipes } from 'apis/recipe';
import LoadingIndicator from 'components/LoadingIndicator/loadingIndicator';
import RecipeItems from 'components/RecipeItems/recipeItems';
import EmptyContent from 'components/EmptyContent/emptyContent';

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

  const typewatch = (function () {
    let timer;
    return function (callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();

  return (
    <div className={styles.search}>
      <div className={styles.searchContainer}>
        <Titles title="SEARCH" subTitle="원하는 레시피를 찾아보세요" />
        <div className={styles.inputField}>
          <SearchIcon />
          <input
            type="text"
            onKeyUp={(e: any) => {
              typewatch(() => {
                setSearch(e.target.value);
              }, 500);
            }}
          />
        </div>
        <div className={styles.searchContent}>
          <LoadingIndicator isLoading={isLoading}>
            {filteredRecipes?.length === 0 ? (
              <EmptyContent text="찾으시는 레시피가 없습니다." />
            ) : (
              <RecipeItems recipe={filteredRecipes || []} />
            )}
          </LoadingIndicator>
        </div>
      </div>
    </div>
  );
}

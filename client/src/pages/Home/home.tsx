import React, { useEffect, useState } from 'react';
import styles from './home.module.scss';

import { getAllRecipes, Recipe } from 'apis/recipe';
import { getCategories } from 'helpers/getCategories';
import { getListSorted } from 'helpers/getListSorted';

import CategoryFilter from 'components/CategoryFilter/categoryFilter';
import RecipeItems from 'components/RecipeItems/recipeItems';
import Titles from 'components/Titles/title';
import SortingFilter from 'components/SortingFilter/sortingFilter';
import LoadingIndicator from 'components/LoadingIndicator/loadingIndicator';
import EmptyContent from 'components/EmptyContent/emptyContent';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedSorting, setSelectedSorting] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);

  const categories = getCategories();

  async function fetchAllRecipe() {
    const recipes = await getAllRecipes();
    setRecipes(recipes);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchAllRecipe();
  }, []);

  const filteredRecipes = getListSorted(
    recipes?.filter(
      (recipe: Recipe) => selectedCategory === 0 || recipe?.categoryType?.id === selectedCategory
    ),
    selectedSorting
  );

  return (
    <div className={styles.home}>
      <div className={styles.homeContainer}>
        <Titles title="OUR RECIPE" subTitle="맛있는 음식을 만들어 보세요." />
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <div className={styles.homeContent}>
          <SortingFilter
            value={selectedSorting}
            onChange={(e) => setSelectedSorting(e.target.selectedIndex + 1)}
          />
          <LoadingIndicator isLoading={isLoading}>
            {filteredRecipes?.length === 0 ? (
              <EmptyContent text="등록된 레시피가 없습니다." />
            ) : (
              <RecipeItems recipe={filteredRecipes || []} />
            )}
          </LoadingIndicator>
        </div>
      </div>
    </div>
  );
}

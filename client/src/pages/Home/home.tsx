import React, { useEffect, useState } from 'react';
import styles from './home.module.scss';

import { getAllRecipes, Recipe } from 'apis/recipe';
import { getCategories } from 'helpers/getCategories';

import CategoryFilter from 'components/CategoryFilter/categoryFilter';
import RecipeItems from 'components/RecipeItems/recipeItems';
import Titles from 'components/Titles/title';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [recipes, setRecipes] = useState([]);

  const { categories } = getCategories();

  async function fetchAllRecipe() {
    const recipes = await getAllRecipes();
    setRecipes(recipes);
  }

  useEffect(() => {
    fetchAllRecipe();
  }, []);

  const filteredRecipes = recipes.filter(
    (recipe: Recipe) => selectedCategory === 0 || recipe?.categoryType?.id === selectedCategory
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
        <RecipeItems recipe={filteredRecipes} />
      </div>
    </div>
  );
}

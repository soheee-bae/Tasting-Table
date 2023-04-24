import { useState } from 'react';
import styles from './allRecipe.module.scss';

import Titles from 'components/Titles/title';
import CategoryFilter from 'components/CategoryFilter/categoryFilter';
import RecipeItems from 'components/RecipeItems/recipeItems';
import EmptyContent from 'components/EmptyContent/emptyContent';
import SortingFilter from 'components/SortingFilter/sortingFilter';
import LoadingIndicator from 'components/LoadingIndicator/loadingIndicator';

import { getCategories } from 'helpers/getCategories';
import { getListSorted } from 'helpers/getListSorted';
import { Recipe } from 'apis/recipe';

interface AllRecipeProps {
  recipes: Recipe[];
  isLoading: boolean;
}

export default function AllRecipe(props: AllRecipeProps) {
  const { recipes, isLoading } = props;
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedSorting, setSelectedSorting] = useState(1);

  const categories = getCategories();

  const filteredRecipes = getListSorted(
    recipes?.filter(
      (recipe: Recipe) => selectedCategory === 0 || recipe?.categoryType?.id === selectedCategory
    ),
    selectedSorting
  );

  return (
    <div className={styles.allRecipe}>
      <Titles title="OUR RECIPE" subTitle="맛있는 음식을 만들어 보세요." />
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className={styles.allRecipeContent}>
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
  );
}

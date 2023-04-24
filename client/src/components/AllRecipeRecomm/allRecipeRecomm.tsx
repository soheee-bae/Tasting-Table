import styles from './allRecipeRecomm.module.scss';
import { Recipe } from 'apis/recipe';
import Titles from 'components/Titles/title';
import EmptyContent from 'components/EmptyContent/emptyContent';
import LoadingIndicator from 'components/LoadingIndicator/loadingIndicator';
import RecipeItemWName from 'components/RecipeItemWName/recipeItemWName';

interface AllRecipeRecommProps {
  recipes: Recipe[];
  isLoading: boolean;
}

export default function AllRecipeRecomm(props: AllRecipeRecommProps) {
  const { recipes, isLoading } = props;

  const sortedRecipe = recipes?.sort((a, b) => (b?.rating || 0) - (a?.rating || 0)).slice(0, 4);

  return (
    <div className={styles.allRecipeRecomm}>
      <Titles title="RECIPES FOR YOU" subTitle="맞춤추천 레시피를 둘러보세요." />
      <LoadingIndicator isLoading={isLoading}>
        {sortedRecipe?.length === 0 ? (
          <EmptyContent text="등록된 레시피가 없습니다." />
        ) : (
          <RecipeRecommItem sortedRecipe={sortedRecipe} />
        )}
      </LoadingIndicator>
    </div>
  );
}

interface RecipeRecommItemProps {
  sortedRecipe: Recipe[];
}

function RecipeRecommItem(props: RecipeRecommItemProps) {
  const { sortedRecipe } = props;

  const mainRecipe = sortedRecipe[0];
  const restRecipes = sortedRecipe.filter((_v, i) => i === 1 || i === 2);
  const lastRecipes = sortedRecipe[3];

  return (
    <div className={styles.recipeRecommItem}>
      <RecipeItemWName recipe={mainRecipe} />
      <div className={styles.recipeRecommItemContainer}>
        <div className={styles.recipeRecommItemContent}>
          {restRecipes?.map((recipe) => (
            <RecipeItemWName key={recipe._id} recipe={recipe} noDetails />
          ))}
        </div>
        <RecipeItemWName recipe={lastRecipes} />
      </div>
    </div>
  );
}

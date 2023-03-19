import React, { useEffect, useContext, useState } from 'react';
import styles from './myRecipe.module.scss';
import Titles from 'components/Titles/titles';
import { getRecipesByUserId, Recipe } from 'apis/recipe';
import AuthContext from 'contexts/authContext';
import RecipeItem from 'components/RecipeItem/recipeItem';
import { getLevels } from 'helpers/getLevels';

export default function MyRecipe() {
  const [myRecipe, setMyRecipe] = useState([]);
  const { userId } = useContext(AuthContext);

  async function fetchMyRecipe() {
    const recipes = await getRecipesByUserId({ id: userId });
    setMyRecipe(recipes);
  }

  useEffect(() => {
    fetchMyRecipe();
  }, []);

  return (
    <div className={styles.myRecipe}>
      <div className={styles.myRecipeContainer}>
        <Titles title="MY RECIPE" subTitle="내 레시피를 확인해 보세요." />
        <div className={styles.myRecipeCards}>
          {myRecipe.map((recipe: Recipe) => {
            const { _id, name, categoryType, level, duration } = recipe;
            return (
              <RecipeItem
                key={_id}
                imgSrc=""
                name={name || ''}
                category={categoryType?.name || ''}
                level={getLevels(level || 0) || ''}
                duration={duration || 0}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

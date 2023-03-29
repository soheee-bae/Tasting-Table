import React, { useEffect, useContext, useState, MouseEvent } from 'react';
import styles from './myRecipe.module.scss';
import Titles from 'components/Titles/titles';
import { deleteRecipe, getRecipesByUserId, Recipe } from 'apis/recipe';
import AuthContext from 'contexts/authContext';
import RecipeItem from 'components/RecipeItem/recipeItem';
import { getLevels } from 'helpers/getLevels';
import food from 'image/food.png';
import { useNavigate } from 'react-router-dom';

export default function MyRecipe() {
  const navigate = useNavigate();

  const [myRecipe, setMyRecipe] = useState([]);
  const { userId } = useContext(AuthContext);

  async function fetchMyRecipe() {
    const recipes = await getRecipesByUserId({ id: userId });
    setMyRecipe(recipes);
  }

  async function handleDelete(e: MouseEvent<HTMLDivElement>, id: string) {
    e.preventDefault();
    const res = await deleteRecipe({ id });
    if (res.status === 200) {
      //toast on success
      console.log('success!!');
    }
  }

  async function handleEdit(e: MouseEvent<HTMLDivElement>, id: string) {
    e.preventDefault();
    navigate(`/editrecipe/${id}`);
  }

  useEffect(() => {
    fetchMyRecipe();
  }, [handleDelete]);

  return (
    <div className={styles.myRecipe}>
      <div className={styles.myRecipeContainer}>
        <Titles title="MY RECIPE" subTitle="내 레시피를 확인해 보세요." />
        <div className={styles.myRecipeCards}>
          {myRecipe.map((recipe: Recipe) => {
            const { _id, name, categoryType, level, duration } = recipe;
            return (
              <RecipeItem
                key={recipe._id}
                recipe={recipe}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                allowEdit={true}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

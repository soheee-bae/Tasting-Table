import React, { useEffect, useContext, useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './myRecipe.module.scss';

import RecipeItems from 'components/RecipeItems/recipeItems';
import Titles from 'components/Titles/title';

import { deleteRecipe, getRecipesByUserId } from 'apis/recipe';
import AuthContext from 'contexts/authContext';

export default function MyRecipe() {
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);
  const [myRecipe, setMyRecipe] = useState([]);

  async function handleDelete(e: MouseEvent<HTMLDivElement>, id: string) {
    e.preventDefault();
    const res = await deleteRecipe({ id });
    if (res.status === 200) {
      //toast on success
    }
  }

  async function handleEdit(e: MouseEvent<HTMLDivElement>, id: string) {
    e.preventDefault();
    navigate(`/editrecipe/${id}`);
  }

  async function fetchMyRecipe() {
    const recipes = await getRecipesByUserId({ id: userId });
    setMyRecipe(recipes);
  }

  useEffect(() => {
    fetchMyRecipe();
  }, [handleDelete]);

  return (
    <div className={styles.myRecipe}>
      <div className={styles.myRecipeContainer}>
        <Titles title="MY RECIPE" subTitle="내 레시피를 확인해 보세요." />
        <RecipeItems
          recipe={myRecipe}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          allowEdit={true}
        />
      </div>
    </div>
  );
}

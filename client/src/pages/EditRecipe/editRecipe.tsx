import React, { useEffect, MouseEvent, useContext, useState } from 'react';
import styles from './editRecipe.module.scss';
import Titles from 'components/Titles/titles';
import AuthContext from 'contexts/authContext';
import { createRecipe, editRecipe, getRecipeById, getRecipesByUserId, Recipe } from 'apis/recipe';
import { useNavigate, useParams } from 'react-router-dom';
import RecipeForm from 'components/RecipeForm/recipeFrom';

export default function EditRecipe() {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const { userId } = useContext(AuthContext);

  const [recipe, setRecipe] = useState({ userId });

  async function fetchRecipe() {
    const recipe = await getRecipeById({ id: recipeId || '' });
    setRecipe(recipe);
  }

  console.log(recipe);
  function updateField(name: string, data: any) {
    setRecipe({
      ...recipe,
      [name]: data
    });
  }

  async function onSubmit(e: MouseEvent<HTMLButtonElement>, id?: string, recipe?: Recipe) {
    e.preventDefault();
    if (id && recipe) {
      const res = await editRecipe({ id, data: recipe });
      if (res.status === 200) {
        navigate('/');
      }
    }
  }

  useEffect(() => {
    fetchRecipe();
  }, []);

  return (
    <div className={styles.editRecipe}>
      <div className={styles.editRecipeContainer}>
        <Titles title="EDIT RECIPE" subTitle="등록된 레시피를 수정해보세요" />
        <RecipeForm
          onSubmit={onSubmit}
          updateField={updateField}
          recipe={recipe}
          buttonLabel="레시피 수정하기"
        />
      </div>
    </div>
  );
}

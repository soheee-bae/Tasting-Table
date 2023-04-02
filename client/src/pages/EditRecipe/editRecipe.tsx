import React, { useEffect, MouseEvent, useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './editRecipe.module.scss';

import Titles from 'components/Titles/title';
import RecipeForm from 'components/RecipeForm/recipeForm';

import AuthContext from 'contexts/authContext';
import { editRecipe, getRecipeById } from 'apis/recipe';

export default function EditRecipe() {
  const navigate = useNavigate();
  const { recipeId = '' } = useParams();
  const { userId } = useContext(AuthContext);

  const [recipe, setRecipe] = useState({ userId });

  function updateField(name: string, data: any) {
    setRecipe({
      ...recipe,
      [name]: data
    });
  }

  async function onSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const res = await editRecipe({ id: recipeId, data: recipe });
    if (res.status === 200) {
      navigate('/');
    }
  }

  async function fetchRecipe() {
    const recipe = await getRecipeById({ id: recipeId || '' });
    setRecipe(recipe);
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

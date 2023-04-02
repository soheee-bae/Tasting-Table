import React, { useEffect, MouseEvent, useContext, useState } from 'react';
import styles from './newRecipe.module.scss';
import Titles from 'components/Titles/titles';
import AuthContext from 'contexts/authContext';
import { createRecipe } from 'apis/recipe';
import { useNavigate } from 'react-router-dom';
import RecipeForm from 'components/RecipeForm/recipeForm';

export default function NewRecipe() {
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);

  const initialRecipe = {
    userId,
    img: '',
    steps: [{ id: 1, details: '', img: '' }],
    ingredients: [
      {
        id: 1,
        name: '',
        ingredient: [{ id: 1, name: '', mensuration: '' }]
      }
    ]
  };
  const [recipe, setRecipe] = useState(initialRecipe);

  function updateField(name: string, data: any) {
    setRecipe({
      ...recipe,
      [name]: data
    });
  }

  async function onSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const res = await createRecipe(recipe);
    if (res.status === 200) {
      navigate('/');
    }
  }

  return (
    <div className={styles.newRecipe}>
      <div className={styles.newRecipeContainer}>
        <Titles title="NEW RECIPE" subTitle="새로운 레시피를 등록해 보세요" />
        <RecipeForm
          onSubmit={onSubmit}
          updateField={updateField}
          recipe={recipe}
          buttonLabel="새 레시피 등록하기"
        />
      </div>
    </div>
  );
}

import React, { MouseEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './newRecipe.module.scss';

import { Toast, ToastSnackbar } from 'components/Toast/toast';
import RecipeForm from 'components/RecipeForm/recipeForm';
import Titles from 'components/Titles/title';

import AuthContext from 'contexts/authContext';
import { createRecipe } from 'apis/recipe';
import { Error, Success } from 'icons/index';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    if (res?.status === 200) {
      toast(<Toast icon={<Success />} title="레시피가 등록되었습니다." />);
      navigate('/');
    } else {
      toast(<Toast icon={<Error />} title="문제가 발생했습니다." subtitle=" 다시 시도하십시오." />);
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
      <ToastSnackbar />
    </div>
  );
}

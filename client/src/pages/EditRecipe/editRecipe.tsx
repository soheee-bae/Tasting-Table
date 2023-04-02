import React, { useEffect, MouseEvent, useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './editRecipe.module.scss';

import Titles from 'components/Titles/title';
import RecipeForm from 'components/RecipeForm/recipeForm';
import { Toast, ToastSnackbar } from 'components/Toast/toast';
import LoadingIndicator from 'components/LoadingIndicator/loadingIndicator';

import AuthContext from 'contexts/authContext';
import { editRecipe, getRecipeById } from 'apis/recipe';
import { Error, Success } from 'icons/index';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditRecipe() {
  const navigate = useNavigate();
  const { recipeId = '' } = useParams();
  const { userId } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

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
    if (res?.status === 200) {
      toast(<Toast icon={<Success />} title="레시피가 수정되었습니다." />);
      setTimeout(() => navigate('/'), 1000);
    } else {
      toast(<Toast icon={<Error />} title="문제가 발생했습니다." subtitle=" 다시 시도하십시오." />);
    }
  }

  async function fetchRecipe() {
    const recipe = await getRecipeById({ id: recipeId || '' });
    setRecipe(recipe);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchRecipe();
  }, []);

  return (
    <div className={styles.editRecipe}>
      <div className={styles.editRecipeContainer}>
        <Titles title="EDIT RECIPE" subTitle="등록된 레시피를 수정해보세요" />
        <LoadingIndicator isLoading={isLoading}>
          <RecipeForm
            onSubmit={onSubmit}
            updateField={updateField}
            recipe={recipe}
            buttonLabel="레시피 수정하기"
          />
        </LoadingIndicator>
      </div>
      <ToastSnackbar />
    </div>
  );
}

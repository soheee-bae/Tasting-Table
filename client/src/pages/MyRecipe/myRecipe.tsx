import React, { useEffect, useContext, useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './myRecipe.module.scss';

import RecipeItems from 'components/RecipeItems/recipeItems';
import Titles from 'components/Titles/title';
import { Toast, ToastSnackbar } from 'components/Toast/toast';

import { deleteRecipe, getRecipesByUserId } from 'apis/recipe';
import AuthContext from 'contexts/authContext';
import { Error, Success } from 'icons/index';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingIndicator from 'components/LoadingIndicator/loadingIndicator';

export default function MyRecipe() {
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);
  const [myRecipe, setMyRecipe] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function handleDelete(e: MouseEvent<HTMLDivElement>, id: string) {
    e.preventDefault();
    const res = await deleteRecipe({ id });
    if (res?.status === 200) {
      toast(<Toast icon={<Success />} title="레시피가 삭제되었습니다." />);
    } else {
      toast(<Toast icon={<Error />} title="문제가 발생했습니다." subtitle=" 다시 시도하십시오." />);
    }
  }

  async function handleEdit(e: MouseEvent<HTMLDivElement>, id: string) {
    e.preventDefault();
    navigate(`/editrecipe/${id}`);
  }

  async function fetchMyRecipe() {
    const recipes = await getRecipesByUserId({ id: userId });
    setMyRecipe(recipes);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchMyRecipe();
  }, [handleDelete]);

  return (
    <div className={styles.myRecipe}>
      <div className={styles.myRecipeContainer}>
        <Titles title="MY RECIPE" subTitle="내 레시피를 확인해 보세요." />
        <LoadingIndicator isLoading={isLoading}>
          <RecipeItems
            recipe={myRecipe}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            allowEdit={true}
          />
        </LoadingIndicator>
      </div>
      <ToastSnackbar />
    </div>
  );
}

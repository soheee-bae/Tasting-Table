import React, { useEffect, useContext, useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './myRecipe.module.scss';

import RecipeItems from 'components/RecipeItems/recipeItems';
import Titles from 'components/Titles/title';
import { Toast, ToastSnackbar } from 'components/Toast/toast';

import { deleteRecipe, getRecipesByUserId } from 'apis/recipe';
import AuthContext from 'contexts/authContext';
import { Checked, Error, Success, UnChecked } from 'icons/index';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingIndicator from 'components/LoadingIndicator/loadingIndicator';
import Button from 'components/Button/button';
import EmptyContent from 'components/EmptyContent/emptyContent';

export default function MyRecipe() {
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);
  const [myRecipe, setMyRecipe] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  async function handleDelete(e: MouseEvent<HTMLDivElement>, id: string) {
    e.preventDefault();
    const res = await deleteRecipe({ id });
    if (res?.status === 200) {
      toast(<Toast icon={<Success />} title="레시피가 삭제되었습니다." />);
      fetchMyRecipe();
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

  const handleEditMode = () => {
    setEditMode(!editMode);
  };

  useEffect(() => {
    fetchMyRecipe();
  }, []);

  return (
    <div className={styles.myRecipe}>
      <div className={styles.myRecipeContainer}>
        <Titles title="MY RECIPE" subTitle="내 레시피를 확인해 보세요." />
        <div className={styles.editButton}>
          <Button
            disabled={myRecipe.length === 0}
            onClick={handleEditMode}
            startIcon={editMode ? <Checked /> : <UnChecked />}>
            편집 모드
          </Button>
        </div>
        <LoadingIndicator isLoading={isLoading}>
          {myRecipe?.length === 0 ? (
            <EmptyContent text="등록된 레시피가 없습니다." />
          ) : (
            <RecipeItems
              recipe={myRecipe}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              allowEdit={editMode}
              noHoverEdit
            />
          )}
        </LoadingIndicator>
      </div>
      <ToastSnackbar />
    </div>
  );
}

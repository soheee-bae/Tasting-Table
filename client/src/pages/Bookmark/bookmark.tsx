import React, { useEffect, useContext, useState, MouseEvent } from 'react';
import styles from './bookmark.module.scss';

import Titles from 'components/Titles/title';
import LoadingIndicator from 'components/LoadingIndicator/loadingIndicator';
import RecipeItems from 'components/RecipeItems/recipeItems';
import { Toast, ToastSnackbar } from 'components/Toast/toast';
import Button from 'components/Button/button';

import AuthContext from 'contexts/authContext';
import { getBookmarksByUserId, deleteBookmark, BookmarkProps } from 'apis/bookmark';
import { Recipe } from 'apis/recipe';
import { Error, Success, Checked, UnChecked } from 'icons/index';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmptyContent from 'components/EmptyContent/emptyContent';

export default function Bookmark() {
  const { userId } = useContext(AuthContext);

  const [bookmarkLists, setBookmarkLists] = useState<BookmarkProps[]>([]);
  const [bookmarks, setBookmarks] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  async function fetchMyBookmarks() {
    const bookmarks = await getBookmarksByUserId({ id: userId });
    setBookmarkLists(bookmarks);
    const recipes = bookmarks.map((recipe: BookmarkProps) => recipe.recipe);
    setBookmarks(recipes);
    setIsLoading(false);
  }

  async function handleDelete(e: MouseEvent<HTMLDivElement>, id: string) {
    e.preventDefault();
    const bookmark = bookmarkLists.find((marks: BookmarkProps) => marks?.recipe?._id === id);
    const bookmarkId = bookmark?._id || '';
    if (bookmarkId) {
      const res = await deleteBookmark({ id: bookmarkId });
      if (res?.status === 200) {
        toast(<Toast icon={<Success />} title="레시피가 삭제되었습니다." />);
        fetchMyBookmarks();
      } else {
        toast(
          <Toast icon={<Error />} title="문제가 발생했습니다." subtitle=" 다시 시도하십시오." />
        );
      }
    }
  }

  const handleEditMode = () => {
    setEditMode(!editMode);
  };

  useEffect(() => {
    fetchMyBookmarks();
  }, []);

  return (
    <div className={styles.bookmark}>
      <div className={styles.bookmarkContainer}>
        <Titles title="BOOKMARK LIST" subTitle="책갈피한 레시피를 확인해보세요" />
        <div className={styles.editButton}>
          <Button
            disabled={bookmarks.length === 0}
            onClick={handleEditMode}
            startIcon={editMode ? <Checked /> : <UnChecked />}>
            편집 모드
          </Button>
        </div>
        <LoadingIndicator isLoading={isLoading}>
          {bookmarks.length === 0 ? (
            <EmptyContent text="등록된 책갈피가 없습니다." />
          ) : (
            <RecipeItems
              recipe={bookmarks}
              allowEdit={editMode}
              noHoverEdit
              handleDelete={handleDelete}
            />
          )}
        </LoadingIndicator>
      </div>
      <ToastSnackbar />
    </div>
  );
}

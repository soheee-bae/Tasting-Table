import React, { useEffect, useContext, useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './bookmark.module.scss';

import Titles from 'components/Titles/title';
import LoadingIndicator from 'components/LoadingIndicator/loadingIndicator';
import RecipeItems from 'components/RecipeItems/recipeItems';
import { Toast, ToastSnackbar } from 'components/Toast/toast';

import AuthContext from 'contexts/authContext';
import { getBookmarksByUserId, deleteBookmark } from 'apis/bookmark';
import { Error, Success } from 'icons/index';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Bookmark() {
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);

  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchMyBookmarks() {
    const bookmarks = await getBookmarksByUserId({ id: userId });
    setBookmarks(bookmarks);
    setIsLoading(false);
  }

  async function handleDelete(e: MouseEvent<HTMLDivElement>, id: string) {
    e.preventDefault();
    const res = await deleteBookmark({ id });
    if (res?.status === 200) {
      toast(<Toast icon={<Success />} title="레시피가 삭제되었습니다." />);
    } else {
      toast(<Toast icon={<Error />} title="문제가 발생했습니다." subtitle=" 다시 시도하십시오." />);
    }
  }

  useEffect(() => {
    fetchMyBookmarks();
  }, [handleDelete]);

  return (
    <div className={styles.bookmark}>
      <div className={styles.bookmarkContainer}>
        <Titles title="BOOKMARK LIST" subTitle="책갈피한 레시피를 확인해보세요" />
        <LoadingIndicator isLoading={isLoading}>
          {bookmarks.length === 0 ? (
            <div className={styles.emptyContent}>등록된 책갈피가 없습니다.</div>
          ) : (
            <RecipeItems recipe={bookmarks} allowEdit handleDelete={handleDelete} />
          )}
        </LoadingIndicator>
      </div>
      <ToastSnackbar />
    </div>
  );
}

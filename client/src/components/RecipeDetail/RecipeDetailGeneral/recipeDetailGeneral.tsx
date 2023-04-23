import React, { useContext, useState, useEffect } from 'react';
import { format } from 'date-fns';
import styles from './recipeDetailGeneral.module.scss';

import IconWithLabel from 'components/IconWithLabel/iconWithLabel';
import Bio from 'components/Bio/bio';
import { Toast, ToastSnackbar } from 'components/Toast/toast';

import { CopyLink, Bookmark, Success, Error, BookmarkAdded } from 'icons/index';
import AuthContext from 'contexts/authContext';
import { ProfileProps } from 'apis/profile';
import { Recipe } from 'apis/recipe';
import { BookmarkProps, addBookmark, deleteBookmark, getBookmarksByUserId } from 'apis/bookmark';
import { getLevels } from 'helpers/getLevels';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface RecipeDetailGeneralProps {
  recipe: Recipe;
  profile: ProfileProps;
  bookmark?: BookmarkProps | undefined;
}
export default function RecipeDetailGeneral(props: RecipeDetailGeneralProps) {
  const { recipe, profile, bookmark } = props;
  if (!recipe) return null;

  return (
    <div className={styles.recipeDetailGeneral}>
      <GeneralHeader recipe={recipe} />
      <GeneralDescription recipe={recipe} profile={profile} />
    </div>
  );
}

function GeneralHeader(props: Omit<RecipeDetailGeneralProps, 'profile'>) {
  const { recipe } = props;
  const { userId } = useContext(AuthContext);
  const [bookmark, setBookmark] = useState('');

  async function fetchMyBookmarks() {
    const bookmarks = await getBookmarksByUserId({ id: userId });
    const bookmark = bookmarks.find((mark: BookmarkProps) => recipe._id === mark.recipe._id);
    if (bookmark) {
      setBookmark(bookmark._id);
    } else {
      setBookmark('');
    }
  }

  useEffect(() => {
    fetchMyBookmarks();
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast(<Toast icon={<Success />} title="링크가 복사되었습니다." />);
  };

  const handleAddBookmark = async () => {
    const res = await addBookmark({ recipe, userId });
    if (res?.status === 200) {
      toast(<Toast icon={<Success />} title="책갈피에 등록되었습니다." />);
      setBookmark(res.bookmarkId);
    } else {
      toast(<Toast icon={<Error />} title="문제가 발생했습니다." subtitle=" 다시 시도하십시오." />);
    }
  };

  const handleRemoveBookmark = async () => {
    const res = await deleteBookmark({ id: bookmark });
    if (res?.status === 200) {
      toast(<Toast icon={<Success />} title="책갈피가 삭제되었습니다." />);
      setBookmark('');
    } else {
      toast(<Toast icon={<Error />} title="문제가 발생했습니다." subtitle=" 다시 시도하십시오." />);
    }
  };

  return (
    <div className={styles.generalHeader}>
      <div className={styles.generalInnerContent}>
        <div className={styles.generalNames}>
          <p className={styles.categoryName}>{recipe.categoryType?.name}</p>
          <p className={styles.name}>{recipe.name}</p>
        </div>
        <div className={styles.generalButtons}>
          {bookmark ? (
            <IconWithLabel icon={<Bookmark />} label="책갈피" onClick={handleRemoveBookmark} />
          ) : (
            <IconWithLabel icon={<BookmarkAdded />} label="책갈피" onClick={handleAddBookmark} />
          )}
          <IconWithLabel icon={<CopyLink />} label="공유" onClick={handleCopyLink} />
        </div>
      </div>
      <div className={styles.generalInnerContent}>
        <div className={styles.generalOthers}>
          <p>
            난이도 <span>{getLevels(recipe?.level ?? 0)}</span>{' '}
          </p>
          <p>
            소요시간 <span>{recipe.duration}분</span>
          </p>
        </div>
        {recipe?.createdDate ? (
          <p className={styles.generalDates}>
            {format(new Date(recipe.createdDate), 'yyyy년 M월 d일')}
          </p>
        ) : null}
      </div>
      <ToastSnackbar />
    </div>
  );
}

function GeneralDescription(props: RecipeDetailGeneralProps) {
  const { recipe, profile } = props;

  return (
    <div className={styles.generalDescription}>
      <Bio
        imgSrc={profile?.profileImg ?? ''}
        title={profile?.nickname ?? ''}
        subtitle={profile?.intro ?? ''}
        className={styles.generalBio}
      />
      <p className={styles.description}>{recipe?.description}</p>
    </div>
  );
}

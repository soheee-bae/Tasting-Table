import React from 'react';
import { format } from 'date-fns';
import styles from './recipeDetailGeneral.module.scss';

import IconWithLabel from 'components/IconWithLabel/iconWithLabel';
import Bio from 'components/Bio/bio';
import { Toast, ToastSnackbar } from 'components/Toast/toast';

import { CopyLink, Bookmark, Success } from 'icons/index';
import BlankProfile from 'image/blankProfile.png';
import { ProfileProps } from 'apis/profile';
import { Recipe } from 'apis/recipe';
import { getLevels } from 'helpers/getLevels';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface RecipeDetailGeneralProps {
  recipe: Recipe;
  profile: ProfileProps;
}
export default function RecipeDetailGeneral(props: RecipeDetailGeneralProps) {
  const { recipe, profile } = props;
  return (
    <div className={styles.recipeDetailGeneral}>
      <GeneralHeader recipe={recipe} />
      <GeneralDescription recipe={recipe} profile={profile} />
    </div>
  );
}

function GeneralHeader(props: Omit<RecipeDetailGeneralProps, 'profile'>) {
  const { recipe } = props;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast(<Toast icon={<Success />} title="링크가 복사되었습니다." />);
  };

  return (
    <div className={styles.generalHeader}>
      <div className={styles.generalInnerContent}>
        <div className={styles.generalNames}>
          <p className={styles.categoryName}>{recipe.categoryType?.name}</p>
          <p className={styles.name}>{recipe.name}</p>
        </div>
        <div className={styles.generalButtons}>
          {/* <IconWithLabel icon={<BookmarkAdded />} label="책갈피" /> */}
          <IconWithLabel icon={<Bookmark />} label="책갈피" />
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
        imgSrc={profile?.profileImg || BlankProfile}
        title={profile?.nickname ?? ''}
        subtitle={profile?.intro ?? ''}
        className={styles.generalBio}
      />
      <p className={styles.description}>{recipe?.description}</p>
    </div>
  );
}

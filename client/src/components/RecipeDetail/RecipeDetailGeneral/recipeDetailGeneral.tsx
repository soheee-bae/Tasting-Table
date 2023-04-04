import { Recipe } from 'apis/recipe';
import React from 'react';
import { format } from 'date-fns';

import styles from './recipeDetailGeneral.module.scss';
import IconWithLabel from 'components/IconWithLabel/iconWithLabel';
import { CopyLink, Bookmark } from 'icons/index';
import Bio from 'components/Bio/bio';
import BlankProfile from 'image/blankProfile.png';

interface RecipeDetailGeneralProps {
  recipe: Recipe;
}
export default function RecipeDetailGeneral(props: RecipeDetailGeneralProps) {
  const { recipe } = props;
  return (
    <div className={styles.recipeDetailGeneral}>
      <GeneralHeader recipe={recipe} />
      <GeneralDescription recipe={recipe} />
    </div>
  );
}

function GeneralHeader(props: RecipeDetailGeneralProps) {
  const { recipe } = props;
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
          <IconWithLabel icon={<CopyLink />} label="공유" />
        </div>
      </div>
      <div className={styles.generalInnerContent}>
        <div className={styles.generalOthers}>
          <p>난이도 {recipe.level}</p>
          <p>소요시간 {recipe.duration}분</p>
        </div>
        {recipe?.createdDate ? (
          <p className={styles.generalDates}>
            {format(new Date(recipe.createdDate), 'yyyy년 M월 d일')}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function GeneralDescription(props: RecipeDetailGeneralProps) {
  const { recipe } = props;
  return (
    <div className={styles.generalDescription}>
      <Bio
        imgSrc={BlankProfile}
        title={recipe.name ?? ''}
        subtitle={recipe.name}
        className={styles.generalBio}
      />
      <p className={styles.description}>{recipe.description}</p>
    </div>
  );
}

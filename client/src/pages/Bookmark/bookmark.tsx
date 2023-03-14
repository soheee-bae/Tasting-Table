import RecipeItem from 'components/RecipeItem/recipeItem';
import Titles from 'components/Titles/titles';
import React from 'react';
import styles from './bookmark.module.scss';

export default function Bookmark() {
  return (
    <div className={styles.bookmark}>
      <Titles title="BOOKMARK LIST" subTitle="책갈피한 레시피를 확인해보세요" />
      <div className={styles.sorting}></div>
      <div className={styles.bookmarkLists}>
        <RecipeItem imgSrc="" name="대파구이" category="메인요리" level="중급" duration={25} />
        <RecipeItem imgSrc="" name="대파구이" category="메인요리" level="중급" duration={25} />
        <RecipeItem imgSrc="" name="대파구이" category="메인요리" level="중급" duration={25} />
        <RecipeItem imgSrc="" name="대파구이" category="메인요리" level="중급" duration={25} />
        <RecipeItem imgSrc="" name="대파구이" category="메인요리" level="중급" duration={25} />
      </div>
    </div>
  );
}

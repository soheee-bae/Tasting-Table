import Titles from 'components/Titles/titles';
import React from 'react';
import styles from './bookmark.module.scss';

export default function Bookmark() {
  return (
    <div className={styles.bookmark}>
      <Titles title="BOOKMARK LIST" subTitle="책갈피한 레시피를 확인해보세요" />
      <div className={styles.sorting}></div>
      <div className={styles.bookmarkLists}></div>
    </div>
  );
}

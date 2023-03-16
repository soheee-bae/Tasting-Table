import React from 'react';
import styles from './myRecipe.module.scss';
import Titles from 'components/Titles/titles';

export default function MyRecipe() {
  return (
    <div className={styles.profileContainer}>
      <Titles title="MY RECIPE" subTitle="내 레시피를 확인해 보세요." />
    </div>
  );
}

import React from 'react';
import styles from './recipeItem.module.scss';

interface RecipeItemProps {
  imgSrc: string;
  name: string;
  category: string;
  level: string;
  duration: number;
}

export default function RecipeItem(props: RecipeItemProps) {
  const { imgSrc, name, category, level, duration } = props;
  return (
    <div className={styles.recipeItem}>
      <img src={imgSrc} alt={name} />
      <div className={styles.details}>
        <p className={styles.category}>{category}</p>
        <p className={styles.name}>{name}</p>
        <div className={styles.otherDetails}>
          <div>{level}</div>
          <div>{duration}분</div>
        </div>
      </div>
    </div>
  );
}

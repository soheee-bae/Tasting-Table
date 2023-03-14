import React from 'react';
import styles from './titles.module.scss';

interface RecipeItemProps {
  imgSrc: string;
  name: string;
  category: string;
  level: string;
  duration: number;
}

export default function RecipeItem(props: RecipeItemProps) {
  const { imgSrc, name = '대파구이', category = '메인요리', level = '중급', duration = 25 } = props;

  return (
    <div className={styles.recipeItem}>
      <img src={imgSrc} alt={name} />
      <div className={styles.basicDetails}>
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

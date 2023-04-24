import React from 'react';
import styles from './categoryFilter.module.scss';
import { CategoryProps } from 'apis/category';
import clsx from 'clsx';

interface CategoryFilterProps {
  categories: CategoryProps[];
  setSelectedCategory: (id: number) => void;
  selectedCategory: number;
}

export default function CategoryFilter(props: CategoryFilterProps) {
  const { categories, setSelectedCategory, selectedCategory } = props;

  const newCategories = [{ id: 0, name: '모두보기' }, ...categories];

  return (
    <div className={styles.categoryFilter}>
      <ul className={styles.categoryFilterContainer}>
        {newCategories.map((category) => (
          <li
            key={category.id}
            className={clsx(styles.categoryFilterList, {
              [styles.selectedFilterList]: selectedCategory === category.id
            })}
            onClick={() => {
              setSelectedCategory(category.id);
            }}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

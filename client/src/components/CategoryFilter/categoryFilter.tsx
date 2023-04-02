import { CategoryProps } from 'apis/category';
import React from 'react';
import styles from './categoryFilter.module.scss';
interface CategoryFilterProps {
  categories: CategoryProps[];
}
export default function CategoryFilter(props: CategoryFilterProps) {
  const { categories } = props;

  const newCategories = [{ id: 100, name: '모두보기' }, ...categories];
  return (
    <div className={styles.categoryFilter}>
      <ul>
        {newCategories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
}

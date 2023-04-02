import { CategoryProps } from 'apis/category';
import React from 'react';
import styles from './categoryFilter.module.scss';
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
            className={styles.categoryFilterList}
            onClick={() => {
              setSelectedCategory(category.id);
            }}>
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

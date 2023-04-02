import { CategoryProps, getCategory } from 'apis/category';
import CategoryFilter from 'components/CategoryFilter/categoryFilter';
import Titles from 'components/Titles/titles';
import { getCategories } from 'helpers/getCategories';
import React, { useEffect, useState } from 'react';
import styles from './home.module.scss';

export default function Home() {
  const { categories } = getCategories();
  return (
    <div className={styles.home}>
      <div className={styles.homeContainer}>
        <Titles title="OUR RECIPE" subTitle="맛있는 음식을 만들어 보세요." />
        <CategoryFilter categories={categories} />
      </div>
    </div>
  );
}

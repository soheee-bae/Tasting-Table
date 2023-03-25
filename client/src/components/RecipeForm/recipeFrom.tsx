import React, { useEffect, useState } from 'react';
import styles from './recipeForm.module.scss';
import { getCategory, CategoryProps } from 'apis/category';
import RecipeGeneral from 'components/RecipeGeneral/recipeGeneral';

export default function RecipeForm(props: any) {
  const { onSubmit, updateField, recipe } = props;
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  async function fetchCategories() {
    const categories = await getCategory();
    setCategories(categories || []);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <RecipeGeneral categories={categories} updateField={updateField} recipe={recipe} />
      {/* <Ingredients /> */}
      {/* <Steps updateField={updateField} recipe={recipe} /> */}
      <input className={styles.submitButton} type="submit" value="새 레시피 등록" />
    </form>
  );
}

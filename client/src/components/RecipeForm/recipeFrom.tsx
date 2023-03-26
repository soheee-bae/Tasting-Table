import React, { FormEvent, useEffect, useState } from 'react';
import styles from './recipeForm.module.scss';
import { getCategory, CategoryProps } from 'apis/category';
import RecipeGeneral from 'components/RecipeGeneral/recipeGeneral';
import RecipeStep from 'components/RecipeStep/recipeStep';
import { Recipe, Step } from 'apis/recipe';

interface RecipeStepProps {
  onSubmit: (e: FormEvent) => void;
  updateField: (name: string, data: any) => void;
  recipe: Recipe;
}

export default function RecipeForm(props: RecipeStepProps) {
  const { onSubmit, updateField, recipe } = props;
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  async function fetchCategories() {
    const categories = await getCategory();
    setCategories(categories || []);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const initialSteps = [
    { id: 1, details: '1111' },
    { id: 2, details: '2222' },
    { id: 3, details: '3333' }
  ];

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <RecipeGeneral categories={categories} updateField={updateField} recipe={recipe} />
      {/* <Ingredients /> */}
      <RecipeStep updateField={updateField} initialSteps={initialSteps || []} />
      <input className={styles.submitButton} type="submit" value="새 레시피 등록" />
    </form>
  );
}

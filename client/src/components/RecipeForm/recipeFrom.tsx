import React, { MouseEvent, useEffect, useState } from 'react';
import styles from './recipeForm.module.scss';
import { getCategory, CategoryProps } from 'apis/category';
import RecipeGeneral from 'components/RecipeGeneral/recipeGeneral';
import RecipeStep from 'components/RecipeStep/recipeStep';
import { Recipe } from 'apis/recipe';
import Button from 'components/Button/button';
import RecipeIngredients from 'components/RecipeIngredients/recipeIngredients';

interface RecipeStepProps {
  onSubmit: (e: MouseEvent<HTMLButtonElement>) => void;
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

  return (
    <form className={styles.form}>
      <RecipeGeneral categories={categories} updateField={updateField} recipe={recipe} />
      <RecipeIngredients updateField={updateField} initialIngredients={recipe.ingredients || []} />
      <RecipeStep updateField={updateField} initialSteps={recipe.steps || []} />
      <Button size="md" onClick={onSubmit} variant="contained">
        새 레시피 등록
      </Button>
    </form>
  );
}

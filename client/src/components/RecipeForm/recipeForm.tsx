import React, { MouseEvent, useEffect, useState } from 'react';
import styles from './recipeForm.module.scss';
import { getCategory, CategoryProps } from 'apis/category';
import RecipeGeneral from 'components/RecipeGeneral/recipeGeneral';
import RecipeStep from 'components/RecipeStep/recipeStep';
import { Recipe } from 'apis/recipe';
import Button from 'components/Button/button';
import RecipeIngredients from 'components/RecipeIngredients/recipeIngredients';
import { getCategories } from 'helpers/getCategories';

interface RecipeStepProps {
  onSubmit: (e: MouseEvent<HTMLButtonElement>) => void;
  updateField: (name: string, data: any) => void;
  recipe: Recipe;
  buttonLabel: string;
}

export default function RecipeForm(props: RecipeStepProps) {
  const { onSubmit, updateField, recipe, buttonLabel } = props;
  const { categories } = getCategories();

  return (
    <form className={styles.form}>
      <RecipeGeneral categories={categories} updateField={updateField} recipe={recipe} />
      <RecipeIngredients updateField={updateField} initialIngredients={recipe.ingredients || []} />
      <RecipeStep updateField={updateField} initialSteps={recipe.steps || []} />
      <Button size="md" onClick={onSubmit} variant="contained">
        {buttonLabel}
      </Button>
    </form>
  );
}

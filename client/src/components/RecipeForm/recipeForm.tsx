import React, { MouseEvent, useState } from 'react';
import styles from './recipeForm.module.scss';

import RecipeIngredients from 'components/RecipeForm/RecipeFormIngredients/recipeFormIngredients';
import RecipeGeneral from 'components/RecipeForm/RecipeFormGeneral/recipeFormGeneral';
import RecipeStep from 'components/RecipeForm/RecipeFormStep/recipeFormStep';
import Button from 'components/Button/button';

import { Recipe } from 'apis/recipe';
import { getCategories } from 'helpers/getCategories';
import { LoadingIcon } from 'components/LoadingIndicator/loadingIndicator';

interface RecipeStepProps {
  onSubmit: (e: MouseEvent<HTMLButtonElement>) => void;
  updateField: (name: string, data: any) => void;
  recipe: Recipe;
  buttonLabel: string;
}

export default function RecipeForm(props: RecipeStepProps) {
  const { onSubmit, updateField, recipe, buttonLabel } = props;
  const categories = getCategories();
  const [isLoading, setIsLoading] = useState(false);

  const disabled =
    isLoading ||
    recipe.img === '' ||
    !recipe.name ||
    !recipe.description ||
    !recipe.amounts ||
    !recipe.duration ||
    (recipe.steps && !recipe.steps[0]?.details) ||
    (recipe.ingredients &&
      (!recipe.ingredients[0]?.name ||
        !recipe.ingredients[0].ingredient[0]?.name ||
        !recipe.ingredients[0].ingredient[0]?.mensuration));

  return (
    <form className={styles.recipeForm}>
      <RecipeGeneral
        categories={categories}
        updateField={updateField}
        recipe={recipe}
        setIsLoading={setIsLoading}
      />
      <RecipeIngredients updateField={updateField} initialIngredients={recipe.ingredients || []} />
      <RecipeStep
        updateField={updateField}
        initialSteps={recipe.steps || []}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
      />
      <Button
        size="md"
        onClick={onSubmit}
        variant="contained"
        className={styles.recipeButton}
        disabled={disabled}>
        {isLoading ? <LoadingIcon /> : buttonLabel}
      </Button>
    </form>
  );
}

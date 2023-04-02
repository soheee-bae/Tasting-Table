import { deleteRecipe, Recipe } from 'apis/recipe';
import { Edit, Hourglass, Level, Trash } from 'icons/index';
import React, { MouseEvent } from 'react';
import styles from './recipeItems.module.scss';
import food from 'image/food.png';
import { getLevels } from 'helpers/getLevels';
import RecipeItem from 'components/RecipeItem/recipeItem';

interface RecipeItemsProps {
  recipe: Recipe[];
  handleDelete?: (e: MouseEvent<HTMLDivElement>, id: string) => void;
  handleEdit?: (e: MouseEvent<HTMLDivElement>, id: string) => void;
  allowEdit?: boolean;
}

export default function RecipeItems(props: RecipeItemsProps) {
  const { recipe, handleDelete, handleEdit, allowEdit } = props;

  return (
    <div className={styles.recipeItems}>
      {recipe.map((recipe: Recipe) => {
        return (
          <RecipeItem
            key={recipe._id}
            recipe={recipe}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            allowEdit={allowEdit}
          />
        );
      })}
    </div>
  );
}

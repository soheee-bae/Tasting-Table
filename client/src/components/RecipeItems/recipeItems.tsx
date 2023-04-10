import React, { MouseEvent } from 'react';
import styles from './recipeItems.module.scss';

import RecipeItem from 'components/RecipeItem/recipeItem';
import { Recipe } from 'apis/recipe';

interface RecipeItemsProps {
  recipe: Recipe[];
  handleDelete?: (e: MouseEvent<HTMLDivElement>, id: string) => void;
  handleEdit?: (e: MouseEvent<HTMLDivElement>, id: string) => void;
  allowEdit?: boolean;
  noHoverEdit?: boolean;
}

export default function RecipeItems(props: RecipeItemsProps) {
  const { recipe, handleDelete, handleEdit, allowEdit, noHoverEdit } = props;

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
            noHoverEdit={noHoverEdit}
          />
        );
      })}
    </div>
  );
}

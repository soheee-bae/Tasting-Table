import React, { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './recipeItem.module.scss';

import food from 'image/food.png';
import { Recipe } from 'apis/recipe';
import { getLevels } from 'helpers/getLevels';
import { Edit, Hourglass, Level, Trash } from 'icons/index';

interface RecipeItemProps {
  recipe: Recipe;
  handleDelete?: (e: MouseEvent<HTMLDivElement>, id: string) => void;
  handleEdit?: (e: MouseEvent<HTMLDivElement>, id: string) => void;
  allowEdit?: boolean;
}

export default function RecipeItem(props: RecipeItemProps) {
  const { recipe, handleDelete, handleEdit, allowEdit } = props;
  const navigate = useNavigate();

  const { _id, name, categoryType, level, duration, img } = recipe;

  return (
    <div
      className={styles.recipeItem}
      onClick={() => {
        !allowEdit && navigate(`/recipe/${_id}`);
      }}>
      <div className={styles.recipeItemImage}>
        <img src={img || food} alt={name} />
        <div className={styles.recipeImgCover}>
          {allowEdit && (
            <div className={styles.editableRecipeItem}>
              {handleEdit && (
                <div onClick={(e) => handleEdit?.(e, _id || '')}>
                  <Edit />
                </div>
              )}
              {handleDelete && (
                <div onClick={(e) => handleDelete?.(e, _id || '')}>
                  <Trash />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className={styles.details}>
        <p className={styles.category}>{categoryType?.name}</p>
        <p className={styles.name}>{name}</p>
        <div className={styles.otherDetails}>
          <div className={styles.detailItem}>
            <Level />
            {getLevels(level || 0)}
          </div>
          <div className={styles.detailItem}>
            <Hourglass />
            {duration}분
          </div>
        </div>
      </div>
    </div>
  );
}

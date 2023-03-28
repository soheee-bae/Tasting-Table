import { useState, useEffect } from 'react';
import styles from './recipeIngredients.module.scss';
import { Reorder, useMotionValue, useDragControls } from 'framer-motion';
import { Ingredient, Ingredients } from 'apis/recipe';
import { ReorderIcon } from 'icons/reorder';
import { Minus, Plus } from 'icons/index';
import Button from 'components/Button/button';
import { getUnusedId } from 'helpers/getUnusedId';

interface RecipeIngredientsProps {
  updateField: (name: string, data: any) => void;
  initialIngredients: Ingredients[];
}
export default function RecipeIngredients(props: RecipeIngredientsProps) {
  const { updateField, initialIngredients } = props;
  const [ingredients, setIngredients] = useState(initialIngredients);
  const ids = ingredients.map((ingredient) => ingredient.id);

  useEffect(() => {
    updateField('ingredients', ingredients);
  }, [ingredients]);

  return (
    <div className={styles.content}>
      <p className={styles.title}>레시피 재료</p>
      <div className={styles.innerContent}>
        <Reorder.Group
          className={styles.ingredientBucket}
          axis="y"
          onReorder={(data) => {
            setIngredients(data);
          }}
          values={ingredients}>
          {ingredients.map((ingredient: Ingredients, index: number) => (
            <ReorderIngredient
              key={ingredient.id}
              index={index}
              ingredient={ingredient}
              ingredients={ingredients}
              setIngredients={setIngredients}
            />
          ))}
        </Reorder.Group>
        <Button
          startIcon={<Plus />}
          variant="outlined"
          onClick={(e) => {
            e.preventDefault();
            const newId = getUnusedId(ids);
            setIngredients([
              ...ingredients,
              { id: newId, name: '', ingredient: [{ id: 1, name: '', mensuration: '' }] }
            ]);
          }}>
          재료/양념 묶음 추가
        </Button>
      </div>
    </div>
  );
}

interface ReorderIngredientProps {
  index: number;
  ingredients: Ingredients[];
  ingredient: Ingredients;
  setIngredients: (ingredients: Ingredients[]) => void;
}

export const ReorderIngredient = (props: ReorderIngredientProps) => {
  const { index, ingredients, ingredient, setIngredients } = props;
  const y = useMotionValue(0);
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      className={styles.ingredientList}
      dragListener={false}
      dragControls={dragControls}
      value={ingredient}
      id={ingredient.name}
      style={{ y }}>
      <div className={styles.reorderIcon}>
        <ReorderIcon dragControls={dragControls} />
      </div>
      <input
        className={styles.ingredientBucketName}
        placeholder="기본재료"
        value={ingredient.name}
        onChange={(e) => {
          const copied = [...ingredients];
          copied[index] = { ...ingredient, name: e.target.value };
          setIngredients(copied);
        }}
      />
      <SubIngredient
        index={index}
        ingredients={ingredients}
        ingredient={ingredient}
        subIngredients={ingredient.ingredient}
        setIngredients={setIngredients}
      />
      {/* <Button
        onClick={(e) => {
          e.preventDefault();
          const filtered = ingredients?.filter((_, i) => i !== index);
          setIngredients(filtered);
        }}
        variant="text">
        <Minus />
      </Button> */}
    </Reorder.Item>
  );
};

interface SubIngredientProps {
  index: number;
  ingredients: Ingredients[];
  ingredient: Ingredients;
  subIngredients: Ingredient[];
  setIngredients: (ingredients: Ingredients[]) => void;
}

export const SubIngredient = (props: SubIngredientProps) => {
  const { index, ingredients, subIngredients, ingredient, setIngredients } = props;
  const ids = subIngredients.map((subIngredient) => subIngredient.id);

  const copiedIngredient = [...ingredients];
  const copiedSubIngredient = [...subIngredients];

  return (
    <div className={styles.subIngredientItems}>
      {subIngredients.map((ingredientItem, ingredientIndex) => (
        <div key={ingredientItem.id} className={styles.subIngredientList}>
          <div className={styles.subIngredientDetails}>
            <input
              placeholder="예) 돼지고기"
              className={styles.subIngredientItem}
              value={ingredientItem.name}
              onChange={(e) => {
                copiedSubIngredient[ingredientIndex] = { ...ingredientItem, name: e.target.value };
                copiedIngredient[index] = { ...ingredient, ingredient: copiedSubIngredient };
                setIngredients(copiedIngredient);
              }}
            />
            <input
              placeholder="예) 300g"
              className={styles.subIngredientItem}
              value={ingredientItem.mensuration}
              onChange={(e) => {
                copiedSubIngredient[ingredientIndex] = {
                  ...ingredientItem,
                  mensuration: e.target.value
                };
                copiedIngredient[index] = { ...ingredient, ingredient: copiedSubIngredient };
                setIngredients(copiedIngredient);
              }}
            />
            <Button
              onClick={(e) => {
                e.preventDefault();
                if (subIngredients.length <= 1) {
                  const filtered = ingredients?.filter((_, i) => i !== index);
                  setIngredients(filtered);
                } else {
                  const filtered = subIngredients?.filter((_, i) => i !== ingredientIndex);
                  copiedIngredient[index] = { ...ingredient, ingredient: filtered };
                  setIngredients(copiedIngredient);
                }
              }}
              variant="text">
              <Minus />
            </Button>
          </div>
        </div>
      ))}
      <Button
        className={styles.subIngredientButton}
        variant="text"
        size="sm"
        startIcon={<Plus />}
        onClick={(e) => {
          e.preventDefault();
          const newId = getUnusedId(ids);
          const newIngredients = { id: newId, name: '', mensuration: '' };
          copiedIngredient[index] = {
            ...ingredient,
            ingredient: [...subIngredients, newIngredients]
          };
          setIngredients(copiedIngredient);
        }}>
        추가
      </Button>
    </div>
  );
};

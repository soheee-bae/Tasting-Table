import { useState } from 'react';
import styles from './recipeIngredients.module.scss';
import { Reorder, useMotionValue, useDragControls } from 'framer-motion';
import { Ingredient, Ingredients } from 'apis/recipe';
import { ReorderIcon } from 'icons/reorder';
import { Minus } from 'icons/index';
import Button from 'components/Button/button';

interface RecipeIngredientsProps {
  updateField: (name: string, data: any) => void;
  initialIngredients: Ingredients[];
}
export default function RecipeIngredients(props: RecipeIngredientsProps) {
  const { updateField, initialIngredients } = props;
  const [ingredients, setIngredients] = useState(initialIngredients);
  const ids = ingredients.map((ingredient) => ingredient.id);

  return (
    <div className={styles.content}>
      <p className={styles.title}>레시피 재료</p>
      <div className={styles.innerContent}>
        <Reorder.Group
          className={styles.groupItem}
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
          variant="outlined"
          onClick={(e) => {
            e.preventDefault();
            let unusedNum = 0;
            let i = 0;
            while (unusedNum === 0 && i < 50) {
              if (!ids.includes(i)) {
                unusedNum = i;
              }
              i++;
            }
            setIngredients([
              ...ingredients,
              { id: unusedNum, name: '', ingredient: [{ id: 1, name: '', mensuration: '' }] }
            ]);
          }}>
          Add
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

  console.log(ingredients);
  return (
    <Reorder.Item
      dragListener={false}
      dragControls={dragControls}
      value={ingredient}
      id={ingredient.name}
      style={{ y }}
      className={styles.listItem}>
      <div className={styles.reorderIcon}>
        <ReorderIcon dragControls={dragControls} />
      </div>

      <input
        value={ingredient.name}
        onChange={(e) => {
          const copied = [...ingredients];
          copied[index] = { ...ingredient, name: e.target.value };
          setIngredients(copied);
        }}
      />
      <div>
        {ingredient.ingredient.map((ingredientItem, ingredientIndex) => (
          <div key={ingredientItem.name}>
            <input
              value={ingredientItem.name}
              onChange={(e) => {
                const copiedIngredients = [...ingredients];
                const copiedSubIngredients = [...ingredient.ingredient];
                copiedSubIngredients[ingredientIndex] = {
                  ...ingredientItem,
                  name: e.target.value
                };
                console.log(copiedSubIngredients);
                copiedIngredients[index] = { ...ingredient, ...copiedIngredients };
                console.log(copiedIngredients);
              }}
            />
            <input
              value={ingredientItem.mensuration}
              onChange={(e) => {
                const copied = [...ingredient.ingredient];
                copied[index] = {
                  ...ingredientItem,
                  mensuration: e.target.value
                };
              }}
            />
          </div>
        ))}
      </div>
      <Button
        onClick={(e) => {
          e.preventDefault();
          const tempArr = ingredients?.filter((_, i) => i !== index);
          setIngredients(tempArr);
        }}
        variant="text">
        <Minus />
      </Button>
    </Reorder.Item>
  );
};

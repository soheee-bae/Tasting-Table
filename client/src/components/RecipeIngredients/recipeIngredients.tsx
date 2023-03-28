import { useState, useEffect } from 'react';
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

  useEffect(() => {
    updateField('ingredients', ingredients);
  }, [ingredients]);

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
      <SubIngredient
        subIngredients={ingredient.ingredient}
        index={index}
        setIngredients={setIngredients}
        ingredients={ingredients}
        ingredient={ingredient}
      />
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

interface SubIngredientProps {
  subIngredients: Ingredient[];
  index: number;
  setIngredients: (ingredients: Ingredients[]) => void;
  ingredients: Ingredients[];
  ingredient: Ingredients;
}

export const SubIngredient = (props: SubIngredientProps) => {
  const { subIngredients, index, setIngredients, ingredients, ingredient } = props;
  const ids = subIngredients.map((subIngredient) => subIngredient.id);

  console.log(ingredients);
  return (
    <div>
      {subIngredients.map((ingredientItem, ingredientIndex) => (
        <div key={ingredientItem.id}>
          <input
            value={ingredientItem.name}
            onChange={(e) => {
              const copied = [...subIngredients];
              copied[ingredientIndex] = { ...ingredientItem, name: e.target.value };
              const copiedIngredient = [...ingredients];
              copiedIngredient[index] = { ...ingredient, ingredient: copied };
              setIngredients(copiedIngredient);
            }}
          />
          <input
            value={ingredientItem.mensuration}
            onChange={(e) => {
              const copied = [...subIngredients];
              copied[ingredientIndex] = { ...ingredientItem, mensuration: e.target.value };
              const copiedIngredient = [...ingredients];
              copiedIngredient[index] = { ...ingredient, ingredient: copied };
              setIngredients(copiedIngredient);
            }}
          />
          <Button
            onClick={(e) => {
              e.preventDefault();
              const tempArr = subIngredients?.filter((_, i) => i !== ingredientIndex);
              const copiedIngredient = [...ingredients];
              copiedIngredient[index] = {
                ...ingredient,
                ingredient: tempArr
              };
              setIngredients(copiedIngredient);
            }}
            variant="text">
            <Minus />
          </Button>
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
              const newIngredients = { id: unusedNum, name: '', mensuration: '' };
              const copiedIngredient = [...ingredients];
              copiedIngredient[index] = {
                ...ingredient,
                ingredient: [...subIngredients, newIngredients]
              };
              setIngredients(copiedIngredient);
            }}>
            Add
          </Button>
        </div>
      ))}
    </div>
  );
};

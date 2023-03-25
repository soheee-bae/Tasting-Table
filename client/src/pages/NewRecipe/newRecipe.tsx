import React, { useEffect, useRef, useContext, useState, FormEvent } from 'react';
import styles from './newRecipe.module.scss';
import Titles from 'components/Titles/titles';
import AuthContext from 'contexts/authContext';
import { createRecipe } from 'apis/recipe';
import { useNavigate } from 'react-router-dom';
import RecipeForm from 'components/RecipeForm/recipeFrom';

export default function NewRecipe() {
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);
  const [recipe, setRecipe] = useState({ userId, steps: [{ details: '' }] });

  function updateField(name: string, data: any) {
    setRecipe({
      ...recipe,
      [name]: data
    });
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const res = await createRecipe(recipe);
    if (res.status === 200) {
      navigate('/');
    }
  }

  return (
    <div className={styles.newRecipe}>
      <div className={styles.newRecipeContainer}>
        <Titles title="NEW RECIPE" subTitle="새로운 레시피를 등록해 보세요" />
        <RecipeForm onSubmit={onSubmit} updateField={updateField} recipe={recipe} />
      </div>
    </div>
  );
}

// function Ingredients() {
//   const [input, setInput] = useState('');
//   return (
//     <div className={styles.content}>
//       <p className={styles.title}>레시피 재료</p>
//       <div className={styles.innerContent}>
//         <label className={styles.inputField}>
//           요리정보
//           <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
//         </label>
//       </div>
//     </div>
//   );
// }

// interface StepsProps {
//   recipe: Recipe;
//   updateField: (name: string, data: any) => void;
// }

// function Steps(props: StepsProps) {
//   const { recipe, updateField } = props;
//   const [steps, setSteps] = useState(['🍅 Tomato', '🥒 Cucumber', '🧀 Cheese', '🥬 Lettuce']);
//   const y = useMotionValue(0);

//   console.log(recipe.steps);
//   return (
//     <div className={styles.content}>
//       <p className={styles.title}>요리순서</p>
//       <Reorder.Group
//         axis="y"
//         values={steps || []}
//         onReorder={setSteps}
//         className={styles.innerContent}>
//         {steps?.map((step, index) => (
//           <Reorder.Item key={index} value={step} id={step} style={{ y }}>
//             <span>{step}</span>
//           </Reorder.Item>
//         ))}
//       </Reorder.Group>
//       <button
//         onClick={(e) => {
//           e.preventDefault();
//           updateField('steps', [...(recipe.steps || []), { details: '' }]);
//         }}>
//         Add
//       </button>
//     </div>
//   );
// }

// <div className={styles.newInputField}>
// {/* Step {index + 1} */}
// <input
//   type="text"
//   value={step.details}
//   onChange={(e) => {
//     const tempArr = recipe.steps?.map((step, i) =>
//       i === index ? { details: e.target.value } : step
//     );
//     updateField('steps', tempArr);
//   }}
// />
// <button
//   onClick={(e) => {
//     e.preventDefault();
//     const tempArr = recipe.steps?.filter((_, i) => i !== index);
//     updateField('steps', tempArr);
//   }}>
//   delete
// </button>
// </div>

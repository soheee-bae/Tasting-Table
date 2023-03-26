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
  const [recipe, setRecipe] = useState({ userId, steps: [{ id: 1, details: '' }] });

  function updateField(name: string, data: any) {
    console.log(data);
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

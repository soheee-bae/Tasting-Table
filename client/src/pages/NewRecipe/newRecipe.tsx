import React, { useEffect, useContext, useState } from 'react';
import styles from './newRecipe.module.scss';
import Titles from 'components/Titles/titles';
import { getRecipesByUserId } from 'apis/recipe';
import AuthContext from 'contexts/authContext';
import { getCategory, CategoryProps } from 'apis/category';
import { Recipe } from 'apis/recipe';
import { getLevels } from 'helpers/getLevels';

export default function NewRecipe() {
  const { userId } = useContext(AuthContext);
  const [recipe, setRecipe] = useState({ userId });
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  async function fetchCategories() {
    const categories = await getCategory();
    setCategories(categories || []);
  }

  function updateField(name: string, data: any) {
    setRecipe({
      ...recipe,
      [name]: data
    });
  }

  console.log(recipe);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className={styles.newRecipe}>
      <div className={styles.newRecipeContainer}>
        <Titles title="NEW RECIPE" subTitle="새로운 레시피를 등록해 보세요" />
        <form className={styles.form}>
          <GeneralInfo categories={categories} updateField={updateField} recipe={recipe} />
          {/* <Ingredients />
          <Steps /> */}
          <input className={styles.submitButton} type="submit" value="회원정보 수정" />
        </form>
      </div>
    </div>
  );
}

interface GeneralProps {
  categories: CategoryProps[];
  recipe: Recipe;
  updateField: (name: string, data: any) => void;
}

function GeneralInfo(props: GeneralProps) {
  const { categories, recipe, updateField } = props;
  const [input, setInput] = useState('');
  const levels = Array(5)
    .fill(null)
    .map((_, id) => ({ id: id + 1, label: getLevels(id + 1) }));

  return (
    <div className={styles.content}>
      <div className={styles.innerContent}>
        <label className={styles.inputField}>
          레시피 제목
          <input
            type="text"
            value={recipe.name}
            onChange={(e) => updateField('name', e.target.value)}
          />
        </label>
        <label className={styles.inputField}>
          레시피 소개
          <textarea
            rows={8}
            value={recipe.description}
            onChange={(e) => updateField('description', e.target.value)}
          />
        </label>
        <div>
          <label className={styles.inputField}>
            카테고리
            <select
              value={recipe?.categoryType?.name}
              onChange={(e) => {
                updateField('categoryType', {
                  id: e.target.selectedIndex + 1,
                  name: e.target.value
                });
              }}>
              {categories?.map((category: CategoryProps) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.inputField}>
            난이도
            <select>
              {levels?.map((level) => (
                <option key={level.id} value={level.label}>
                  {level.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label className={styles.inputField}>
            인원
            <input type="number" value={input} onChange={(e) => setInput(e.target.value)} />
            <input type="number" value={input} onChange={(e) => setInput(e.target.value)} />
          </label>
          <label className={styles.inputField}>
            시간
            <input type="number" value={input} onChange={(e) => setInput(e.target.value)} />분
          </label>
        </div>
      </div>
    </div>
  );
}

function Ingredients() {
  const [input, setInput] = useState('');
  return (
    <div className={styles.content}>
      <p className={styles.title}>레시피 재료</p>
      <div className={styles.innerContent}>
        <label className={styles.inputField}>
          요리정보
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        </label>
      </div>
    </div>
  );
}

function Steps() {
  const [input, setInput] = useState('');
  return (
    <div className={styles.content}>
      <p className={styles.title}>요리순서</p>
      <div className={styles.innerContent}>
        <label className={styles.newInputField}>
          Step 1
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        </label>
      </div>
    </div>
  );
}

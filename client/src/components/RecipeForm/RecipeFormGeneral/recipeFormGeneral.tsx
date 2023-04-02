import { ChangeEventHandler, ChangeEvent } from 'react';
import styles from './recipeFormGeneral.module.scss';

import ImageUploader from 'components/ImageUploader/imageUploader';
import { CategoryProps } from 'apis/category';
import { Recipe } from 'apis/recipe';
import { getLevels } from 'helpers/getLevels';

interface RecipeGeneralProps {
  categories: CategoryProps[];
  recipe: Recipe;
  updateField: (name: string, data: any) => void;
}

export default function RecipeGeneral(props: RecipeGeneralProps) {
  const { categories, recipe, updateField } = props;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files) updateField('img', URL.createObjectURL(e.target?.files[0]));
  };

  return (
    <div className={styles.recipeGeneral}>
      <div className={styles.recipeImage}>
        <ImageUploader
          imgSrc={recipe.img || ''}
          handleFileChange={handleFileChange}
          className={styles.recipeImageUploader}
          isRecipe
        />
      </div>
      <label className={styles.inputField}>
        레시피 제목
        <input
          placeholder="예) 소고기 미역국"
          type="text"
          value={recipe.name}
          onChange={(e) => updateField('name', e.target.value)}
        />
      </label>
      <label className={styles.inputField}>
        레시피 소개
        <textarea
          placeholder="이 레시피의 탄생배경을 적어주세요. 예) 남편의 생일을 맞아 소고기 미역국을 끓여봤어요. 어머니로부터 배운 미역국 레시피를 남편의 입맛에 맞게 고안했습니다."
          rows={8}
          value={recipe.description}
          onChange={(e) => updateField('description', e.target.value)}
        />
      </label>
      <SelectFields categories={categories} recipe={recipe} updateField={updateField} />
    </div>
  );
}

interface SelectFieldsProps {
  categories: CategoryProps[];
  recipe: Recipe;
  updateField: (name: string, data: any) => void;
}

function SelectFields(props: SelectFieldsProps) {
  const { categories, recipe, updateField } = props;
  const levels = Array(5)
    .fill(null)
    .map((_, id) => ({ id: id + 1, name: getLevels(id + 1) || '' }));

  return (
    <div className={styles.fieldsContainer}>
      <SelectField
        title="카테고리"
        options={categories}
        value={recipe?.categoryType?.name || ''}
        onChange={(e) => {
          updateField('categoryType', {
            id: e.target.selectedIndex + 1,
            name: e.target.value
          });
        }}
      />
      <SelectField
        title="난이도"
        options={levels}
        value={levels.find((level) => recipe.level === level.id)?.name || ''}
        onChange={(e) => {
          updateField('level', e.target.selectedIndex + 1);
        }}
      />
      <label className={styles.newInputField}>
        <p>인원</p>
        <input
          placeholder="예) 3"
          type="number"
          value={recipe.amounts}
          onChange={(e) => updateField('amounts', parseInt(e.target.value))}
        />
        <span>인분</span>
      </label>
      <label className={styles.newInputField}>
        <p>시간</p>
        <input
          placeholder="예) 30"
          type="number"
          value={recipe.duration}
          onChange={(e) => updateField('duration', parseInt(e.target.value))}
        />
        <span>분</span>
      </label>
    </div>
  );
}

interface SelectFieldProps<T> {
  title: string;
  value: number | string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  options: T[];
}

function SelectField<T extends { id: number; name: string }>(props: SelectFieldProps<T>) {
  const { title, value, onChange, options } = props;
  return (
    <label className={styles.selectField}>
      <p>{title}</p>
      <select value={value} onChange={onChange}>
        {options?.map((option: { id: number; name: string }) => (
          <option key={option.id} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </label>
  );
}

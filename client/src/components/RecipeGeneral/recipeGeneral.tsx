import { CategoryProps } from 'apis/category';
import { Recipe } from 'apis/recipe';
import { getLevels } from 'helpers/getLevels';
import { ChangeEventHandler } from 'react';
import styles from './recipeGeneral.module.scss';

interface RecipeGeneralProps {
  categories: CategoryProps[];
  recipe: Recipe;
  updateField: (name: string, data: any) => void;
}

export default function RecipeGeneral(props: RecipeGeneralProps) {
  const { categories, recipe, updateField } = props;
  const levels = Array(5)
    .fill(null)
    .map((_, id) => ({ id: id + 1, name: getLevels(id + 1) || '' }));

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
        <div className={styles.inputFieldContainer}>
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
            value={recipe?.level || ''}
            onChange={(e) => {
              updateField('level', parseInt(e.target.value));
            }}
          />
        </div>
        <div className={styles.inputFieldContainer}>
          <label className={styles.inputField}>
            인원
            <input
              type="number"
              value={recipe.amounts}
              onChange={(e) => updateField('amounts', parseInt(e.target.value))}
            />
            인분
          </label>
          <label className={styles.inputField}>
            시간
            <input
              type="number"
              value={recipe.duration}
              onChange={(e) => updateField('duration', parseInt(e.target.value))}
            />
            분
          </label>
        </div>
      </div>
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
      {title}
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

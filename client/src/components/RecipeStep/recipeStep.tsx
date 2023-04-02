import { useEffect, useState } from 'react';
import styles from './recipeStep.module.scss';

import Button from 'components/Button/button';
import Subtitle from 'components/Subtitles/subtitle';

import { Reorder, useMotionValue, useDragControls } from 'framer-motion';
import { getUnusedId } from 'helpers/getUnusedId';
import { Minus, Plus } from 'icons/index';
import { ReorderIcon } from 'icons/reorder';
import { Step } from 'apis/recipe';

interface RecipeStepProps {
  initialSteps: Step[];
  updateField: (name: string, data: any) => void;
}

export default function RecipeStep(props: RecipeStepProps) {
  const { initialSteps, updateField } = props;
  const [steps, setSteps] = useState(initialSteps);
  const ids = steps.map((step) => step.id);

  useEffect(() => {
    updateField('steps', steps);
  }, [steps]);

  useEffect(() => {
    setSteps(initialSteps);
  }, [initialSteps]);

  return (
    <div className={styles.content}>
      <Subtitle subTitle="요리순서" />
      <div className={styles.innerContent}>
        <Reorder.Group
          className={styles.groupItem}
          axis="y"
          onReorder={(data) => {
            setSteps(data);
          }}
          values={steps}>
          {steps.map((step: Step, index: number) => (
            <ReorderItem
              key={step.id}
              index={index}
              steps={steps}
              step={step}
              setSteps={setSteps}
            />
          ))}
        </Reorder.Group>
        <Button
          startIcon={<Plus />}
          variant="outlined"
          onClick={(e) => {
            e.preventDefault();
            const newId = getUnusedId(ids);
            setSteps([...steps, { id: newId, details: '', img: '' }]);
          }}>
          순서추가
        </Button>
      </div>
    </div>
  );
}

interface ReorderItemProps {
  index: number;
  steps: Step[];
  step: Step;
  setSteps: (step: Step[]) => void;
}

export const ReorderItem = (props: ReorderItemProps) => {
  const { index, steps, step, setSteps } = props;
  const y = useMotionValue(0);
  const dragControls = useDragControls();
  return (
    <Reorder.Item
      dragListener={false}
      dragControls={dragControls}
      value={step}
      id={step.details}
      style={{ y }}
      className={styles.listItem}>
      <div className={styles.reorderIcon}>
        <ReorderIcon dragControls={dragControls} />
        <p>{index + 1}</p>
      </div>
      <div className={styles.inputField}>
        <img src={step.img || ''} alt="recipe" />
        <input
          id="photo-upload"
          type="file"
          onChange={(e) => {
            const copied = [...steps];
            copied[index] = {
              ...step,
              img: e.target?.files ? URL.createObjectURL(e.target?.files[0]) : ''
            };
            setSteps(copied);
          }}
        />
      </div>
      <textarea
        placeholder="예) 소고기는 기름기를 떼어내고 적당한 크기로 썰어주세요."
        value={step.details}
        rows={3}
        onChange={(e) => {
          const copied = [...steps];
          copied[index] = { ...step, details: e.target.value };
          setSteps(copied);
        }}
      />
      <Button
        onClick={(e) => {
          e.preventDefault();
          const tempArr = steps?.filter((_, i) => i !== index);
          setSteps(tempArr);
        }}
        variant="text">
        <Minus />
      </Button>
    </Reorder.Item>
  );
};

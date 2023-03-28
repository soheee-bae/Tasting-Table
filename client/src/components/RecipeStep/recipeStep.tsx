import { Step } from 'apis/recipe';
import Button from 'components/Button/button';
import { Reorder, useMotionValue, useDragControls } from 'framer-motion';
import { Minus } from 'icons/index';
import { ReorderIcon } from 'icons/reorder';
import { useEffect, useState } from 'react';
import styles from './recipeStep.module.scss';

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

  return (
    <div className={styles.content}>
      <p className={styles.title}>요리순서</p>
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
            setSteps([...steps, { id: unusedNum, details: '' }]);
          }}>
          Add
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

      <textarea
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
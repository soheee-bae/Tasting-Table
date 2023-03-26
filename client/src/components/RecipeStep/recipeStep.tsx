import { Step } from 'apis/recipe';
import { Reorder, useMotionValue } from 'framer-motion';
import { useRaisedShadow } from 'hooks/useRaisedShadow';
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
        <button
          className={styles.button}
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
        </button>
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
  const boxShadow = useRaisedShadow(y);

  return (
    <Reorder.Item value={step} id={step.details} style={{ boxShadow, y }}>
      <input
        type="text"
        value={step.details}
        onChange={(e) => {
          const copied = [...steps];
          copied[index] = { ...step, details: e.target.value };
          setSteps(copied);
        }}
      />
      <button
        className={styles.button}
        onClick={(e) => {
          e.preventDefault();
          const tempArr = steps?.filter((_, i) => i !== index);
          setSteps(tempArr);
        }}>
        delete
      </button>
    </Reorder.Item>
  );
};

import { useEffect, useState } from 'react';
import { Reorder, useMotionValue, useDragControls } from 'framer-motion';

import styles from './recipeFormStep.module.scss';

import Button from 'components/Button/button';
import Subtitle from 'components/Subtitles/subtitle';
import ImageUploaderSingle from 'components/ImageUploaderSingle/imageUploaderSingle';

import { getUnusedId } from 'helpers/getUnusedId';
import { Minus, Plus } from 'icons/index';
import { ReorderIcon } from 'icons/reorder';
import { Step } from 'apis/recipe';
import { uploadImage } from 'helpers/uploadImage';

interface RecipeStepProps {
  initialSteps: Step[];
  updateField: (name: string, data: any) => void;
  setIsLoading: (loading: boolean) => void;
}

export default function RecipeStep(props: RecipeStepProps) {
  const { initialSteps, updateField, setIsLoading } = props;
  const [steps, setSteps] = useState(initialSteps);
  const stepIds = steps.map((step) => step.id);

  useEffect(() => {
    updateField('steps', steps);
  }, [steps]);

  useEffect(() => {
    setSteps(initialSteps);
  }, [initialSteps]);

  return (
    <div className={styles.recipeStep}>
      <Subtitle subTitle="요리순서" />
      <div className={styles.recipeStepContainer}>
        <Reorder.Group
          className={styles.stepItems}
          axis="y"
          onReorder={(data) => {
            setSteps(data);
          }}
          values={steps}
        >
          {steps.map((step: Step, index: number) => (
            <StepItem
              key={step.id}
              index={index}
              steps={steps}
              step={step}
              setSteps={setSteps}
              setIsLoading={setIsLoading}
            />
          ))}
        </Reorder.Group>
        <Button
          startIcon={<Plus />}
          variant="outlined"
          onClick={(e) => {
            e.preventDefault();
            const newId = getUnusedId(stepIds);
            setSteps([...steps, { id: newId, details: '', img: '' }]);
          }}
        >
          순서추가
        </Button>
      </div>
    </div>
  );
}

interface StepItemProps {
  index: number;
  steps: Step[];
  step: Step;
  setSteps: (step: Step[]) => void;
  setIsLoading: (loading: boolean) => void;
}

export const StepItem = (props: StepItemProps) => {
  const { index, steps, step, setSteps, setIsLoading } = props;
  const y = useMotionValue(0);
  const dragControls = useDragControls();

  const handleFileChange = async (file: File[]) => {
    const copied = [...steps];

    if (file.length > 0) {
      setIsLoading(true);
      const imgUrl: any = await uploadImage(file[0]);
      if (imgUrl) {
        copied[index] = {
          ...step,
          img: imgUrl.location
        };
        setIsLoading(false);
        setSteps(copied);
      }
    } else {
      copied[index] = {
        ...step,
        img: ''
      };
      setSteps(copied);
    }
  };
  return (
    <Reorder.Item
      dragListener={false}
      dragControls={dragControls}
      value={step}
      id={step.details}
      style={{ y }}
      className={styles.stepListItem}
    >
      <div className={styles.reorderIcon}>
        <ReorderIcon dragControls={dragControls} />
        <p>{index + 1}</p>
      </div>
      <ImageUploaderSingle handleFileChange={handleFileChange} imgSrc={step.img} />
      <textarea
        placeholder="예) 소고기는 기름기를 떼어내고 적당한 크기로 썰어주세요."
        value={step.details}
        rows={5}
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
        variant="text"
      >
        <Minus />
      </Button>
    </Reorder.Item>
  );
};

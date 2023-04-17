import React, { ChangeEvent } from 'react';
import BlankProfile from 'image/blankProfile.png';
import AddImage from 'image/addImage.png';
import ImageUploading from 'react-images-uploading';

import styles from './imageUploader.module.scss';
import clsx from 'clsx';
import { Plus, Edit, Trash } from 'icons/index';

interface ImageUploaderProps {
  handleFileChange: (urlLists: string[]) => void;
  className?: string;
  round?: boolean;
  isRecipe?: boolean;
  multiple?: boolean;
}

export default function ImageUploader(props: ImageUploaderProps) {
  const { handleFileChange, round, className, isRecipe, multiple } = props;
  // const blank = isRecipe ? AddImage : BlankProfile;
  const [images, setImages] = React.useState([]);
  const isMax = images.length === 3;

  const onChange = (imageList, addUpdateIndex) => {
    const urlLists = imageList.map((image) => image.data_url);

    setImages(imageList);
    handleFileChange(urlLists);
  };

  return (
    <div className={clsx(styles.imageUploader, className)} data-round={round}>
      <ImageUploading
        multiple={multiple}
        value={images}
        onChange={onChange}
        maxNumber={3}
        dataURLKey="data_url">
        {({ imageList, onImageUpload, onImageUpdate, onImageRemove, dragProps }) => (
          <div className={styles.imageButtons}>
            <button
              className={styles.imageButton}
              onClick={onImageUpload}
              data-disabled={isMax}
              {...dragProps}
              disabled={isMax}>
              <Plus />
            </button>
            {imageList.map((image, index) => (
              <div key={index} className={styles.imageList}>
                <img src={image['data_url']} alt={image?.dataURL} />
                <div className={styles.reviewImgCover}>
                  <div className={styles.editableReviewImg}>
                    <div onClick={() => onImageUpdate(index)}>
                      <Edit />
                    </div>
                    <div onClick={() => onImageRemove(index)}>
                      <Trash />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}

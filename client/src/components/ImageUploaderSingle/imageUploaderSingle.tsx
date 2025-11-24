import React, { MouseEvent, useEffect, useState } from 'react';
import clsx from 'clsx';

import ImageUploading from 'react-images-uploading';

import styles from './imageUploaderSingle.module.scss';
import { Plus, Edit, Trash } from 'icons/index';

interface ImageUploaderSingleProps {
  handleFileChange: (file: File[]) => void;
  className?: string;
  imgSrc?: string;
  round?: boolean;
  disabled?: boolean;
}

export default function ImageUploaderSingle(props: ImageUploaderSingleProps) {
  const { handleFileChange, className, imgSrc, round, disabled } = props;
  const [image, setImage] = useState<any>([]);

  const onChange = (imageList) => {
    const file = imageList.map((image) => image.file);
    setImage(imageList);
    handleFileChange(file);
  };

  useEffect(() => {
    if (imgSrc) setImage([{ data_url: imgSrc }]);
  }, [imgSrc]);

  return (
    <div className={clsx(styles.imageUploader, className)}>
      <ImageUploading value={image} onChange={onChange} maxNumber={3} dataURLKey="data_url">
        {({ imageList, onImageUpload, onImageUpdate, onImageRemove, dragProps }) => {
          return (
            <div className={styles.imageButtons}>
              {imageList.length === 0 && (
                <button
                  className={styles.imageButton}
                  disabled={disabled}
                  data-disabled={disabled}
                  onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    onImageUpload();
                  }}
                  {...dragProps}>
                  <Plus />
                </button>
              )}
              {imageList.map((image, index) => (
                <div className={styles.imageList} key={index} data-round={round}>
                  <img src={image['data_url']} alt="" />
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
          );
        }}
      </ImageUploading>
    </div>
  );
}

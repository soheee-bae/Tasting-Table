import React, { MouseEvent, useEffect } from 'react';
import clsx from 'clsx';
import ImageUploading from 'react-images-uploading';

import styles from './imageUploaderMulti.module.scss';
import { Plus, Edit, Trash } from 'icons/index';

interface ImageUploaderMultiProps {
  handleFileChange: (file: File[]) => void;
  selectedFiles: File[];
  className?: string;
}

export default function ImageUploaderMulti(props: ImageUploaderMultiProps) {
  const { handleFileChange, selectedFiles, className } = props;
  const [images, setImages] = React.useState([]);
  const isMax = images.length === 3;

  const onChange = (imageList) => {
    const urlLists = imageList.map((image) => image.file);
    setImages(imageList);
    handleFileChange(urlLists);
  };

  useEffect(() => {
    if (selectedFiles.length === 0) {
      setImages([]);
    }
  }, [selectedFiles]);

  return (
    <div className={clsx(styles.imageUploader, className)}>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={3}
        dataURLKey="data_url">
        {({ imageList, onImageUpload, onImageUpdate, onImageRemove, dragProps }) => (
          <div className={styles.imageButtons}>
            <button
              className={styles.imageButton}
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                onImageUpload();
              }}
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

import React, { ChangeEvent } from 'react';
import BlankProfile from 'image/blankProfile.png';
import styles from './imageUploader.module.scss';
import clsx from 'clsx';

interface ImageUploaderProps {
  profileImg: string;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  round?: boolean;
}
export default function ImageUploader(props: ImageUploaderProps) {
  const { profileImg, handleFileChange, round, className } = props;
  return (
    <div className={clsx(styles.imageUploader, className)} data-round={round}>
      <img src={profileImg || BlankProfile} alt="profile" />
      <input id="photo-upload" type="file" onChange={handleFileChange} />
    </div>
  );
}

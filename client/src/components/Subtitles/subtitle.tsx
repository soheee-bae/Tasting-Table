import React, { ReactNode } from 'react';
import styles from './subtitle.module.scss';

interface SubtitleProps {
  subTitle: string;
  subContent?: ReactNode;
}

export default function Subtitle(props: SubtitleProps) {
  const { subTitle, subContent } = props;

  return (
    <p className={styles.subtitle}>
      {subTitle}
      {subContent}
    </p>
  );
}

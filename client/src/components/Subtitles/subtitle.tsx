import React from 'react';
import styles from './subtitle.module.scss';

interface SubtitleProps {
  subTitle: string;
}

export default function Subtitle(props: SubtitleProps) {
  const { subTitle } = props;

  return <p className={styles.subtitle}>{subTitle}</p>;
}

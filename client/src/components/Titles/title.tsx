import React from 'react';
import styles from './title.module.scss';

interface TitleProps {
  title: string;
  subTitle?: string;
}

export default function Titles(props: TitleProps) {
  const { title, subTitle } = props;

  return (
    <div className={styles.titles}>
      <div className={styles.title}>
        <p className={styles.vr}> |</p>
        <p>{title}</p>
        <p className={styles.vr}> |</p>
      </div>
      <p className={styles.subTitle}>{subTitle}</p>
    </div>
  );
}

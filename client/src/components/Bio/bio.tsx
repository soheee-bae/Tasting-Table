import clsx from 'clsx';
import styles from './bio.module.scss';

interface BioProps {
  imgSrc: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export default function Bio(props: BioProps) {
  const { imgSrc, title, subtitle, className } = props;

  return (
    <div className={clsx(styles.bio, className)}>
      <img src={imgSrc ?? 'https://tastingtable.s3.amazonaws.com/blankProfile.png'} alt="profile" />
      <div className={styles.bioContent}>
        <p className={styles.bioTitle}>{title}</p>
        {subtitle && <p className={styles.bioSubtitle}>{subtitle}</p>}
      </div>
    </div>
  );
}

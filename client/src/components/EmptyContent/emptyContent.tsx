import clsx from 'clsx';
import styles from './emptyContent.module.scss';

interface EmptyContentProps {
  text: string;
  className?: string;
}

export default function EmptyContent(props: EmptyContentProps) {
  const { text, className } = props;
  return <div className={clsx(styles.emptyContent, className)}>{text}</div>;
}

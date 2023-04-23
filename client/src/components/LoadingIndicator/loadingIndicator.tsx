import { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './loadingIndicator.module.scss';

interface LoadingIndicatorProps {
  isLoading: boolean;
  children: ReactNode;
  className?: string;
}

export default function LoadingIndicator(props: LoadingIndicatorProps) {
  const { isLoading, children, className } = props;
  return (
    <div className={styles.loadingIndicator}>
      {isLoading ? <LoadingIcon className={className} /> : children}
    </div>
  );
}

export function LoadingIcon(props: Omit<LoadingIndicatorProps, 'isLoading' | 'children'>) {
  const { className } = props;
  return (
    <div className={clsx(styles.ldsRing, className)}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

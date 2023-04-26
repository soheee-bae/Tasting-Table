import { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './loadingIndicator.module.scss';

interface LoadingIndicatorProps {
  isLoading: boolean;
  children: ReactNode;
  className?: string;
  noMinheight?: boolean;
}

export default function LoadingIndicator(props: LoadingIndicatorProps) {
  const { isLoading, children, className, noMinheight } = props;
  return (
    <div className={styles.loadingIndicator} data-noMinHeight={noMinheight}>
      {isLoading ? (
        <div>
          <LoadingIcon className={className} />
        </div>
      ) : (
        children
      )}
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

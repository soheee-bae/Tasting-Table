import clsx from 'clsx';
import { ReactNode } from 'react';
import styles from './iconWithLabel.module.scss';

interface IconWithLabelProps {
  icon: ReactNode;
  label: string;
  className?: string;
}

export default function IconWithLabel(props: IconWithLabelProps) {
  const { icon, label, className } = props;
  return (
    <div className={clsx(styles.iconWithLabel, className)}>
      {icon}
      <p>{label}</p>
    </div>
  );
}

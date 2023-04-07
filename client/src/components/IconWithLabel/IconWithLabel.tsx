import clsx from 'clsx';
import { ReactNode } from 'react';
import styles from './iconWithLabel.module.scss';

interface IconWithLabelProps {
  icon: ReactNode;
  label: string;
  className?: string;
  onClick?: () => void;
}

export default function IconWithLabel(props: IconWithLabelProps) {
  const { icon, label, className, onClick } = props;
  return (
    <div className={clsx(styles.iconWithLabel, className)} onClick={onClick}>
      {icon}
      <p>{label}</p>
    </div>
  );
}

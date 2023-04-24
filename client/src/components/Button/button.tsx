import { ReactNode, MouseEvent } from 'react';
import styles from './button.module.scss';
import clsx from 'clsx';

export type Size = 'sm' | 'md' | 'lg' | 'xl';
export type Variant = 'contained' | 'outlined' | 'text' | 'outlined-text';

interface ButtonProps {
  children: string | JSX.Element | ReactNode;
  variant?: Variant;
  size?: Size;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
  selected?: boolean;
}

export default function Button(props: ButtonProps) {
  const {
    children,
    variant = 'text',
    size = 'md',
    startIcon,
    endIcon,
    onClick,
    className,
    disabled,
    selected
  } = props;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
  };

  return (
    <button
      className={clsx(className, styles.button, styles[`${variant}`], styles[`${size}`])}
      data-disabled={disabled}
      data-selected={selected}
      onClick={handleClick}
    >
      {startIcon}
      {children}
      {endIcon}
    </button>
  );
}

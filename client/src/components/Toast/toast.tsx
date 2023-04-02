import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import styles from './toast.module.scss';

interface ToastProps {
  icon: ReactNode;
  title: string;
  subtitle?: string;
}

export function Toast(props: ToastProps) {
  const { icon, title, subtitle } = props;

  return (
    <div className={styles.toastContainer}>
      {icon}
      <div className={styles.toastContent}>
        <p className={styles.toastTitle}>{title}</p>
        <p className={styles.toastTitle}>{subtitle}</p>
      </div>
    </div>
  );
}

export function ToastSnackbar() {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      toastStyle={{ borderLeft: '4px solid #563624' }}
    />
  );
}

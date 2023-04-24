import { useState } from 'react';
import { Dialog, DialogTitle } from '@mui/material';
import styles from './mensurationDialog.module.scss';
import { mensuration } from './mensurationData';
import Button from 'components/Button/button';

interface MensurationDialogProps {
  children: string;
}
export default function MensurationDialog(props: MensurationDialogProps) {
  const { children } = props;
  const [open, setOpen] = useState(false);

  const handleClickToOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleToClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" size="sm" onClick={handleClickToOpen}>
        {children}
      </Button>
      <Dialog open={open} onClose={handleToClose}>
        <DialogTitle>계량법 안내</DialogTitle>
        <div className={styles.dialogContent}>
          {mensuration.map((ms) => (
            <div key={ms.label} className={styles.dialogList}>
              <p className={styles.label}>{ms.label}</p>
              <div className={styles.dialogListDetail}>
                <p>{ms.amount}</p>
                {ms.details && <p className={styles.details}>{ms.details}</p>}
              </div>
            </div>
          ))}
        </div>
      </Dialog>
    </div>
  );
}

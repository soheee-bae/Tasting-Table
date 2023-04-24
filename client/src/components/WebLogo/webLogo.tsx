import React from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

import styles from './webLogo.module.scss';

interface WebLogoProps {
  isRedirect: boolean;
}

export default function WebLogo(props: WebLogoProps) {
  const { isRedirect = false } = props;
  const navigate = useNavigate();

  return (
    <div
      className={clsx(styles.webLogo, { [styles.disable]: !isRedirect })}
      onClick={() => navigate('/')}>
      <Logo />
    </div>
  );
}

function Logo() {
  return <p className={styles.logo}>TastingTable</p>;
}

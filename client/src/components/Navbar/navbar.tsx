import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Search, User } from '@/icons/index';
import WebLogo from '@/components/WebLogo/webLogo';
import styles from './navbar.module.scss';

export default function Navbar() {
  const navigate = useNavigate();

  const handleRedirect = (url: string) => {
    navigate(url);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.innerNav}>
        <WebLogo isRedirect />
        <ul className={styles.navLists}>
          <li className={styles.navItem} onClick={() => handleRedirect('/search')}>
            <Search />
          </li>
          <li className={styles.navItem} onClick={() => handleRedirect('/login')}>
            <User />
            <p>로그인</p>
          </li>
        </ul>
      </div>
    </nav>
  );
}

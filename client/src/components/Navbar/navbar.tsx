import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './navbar.module.scss';

import { Search, User } from 'icons/index';
import AuthContext from 'contexts/authContext';

import WebLogo from 'components/WebLogo/webLogo';
import NavDropdown from 'components/NavDropdown/navDropdown';

export default function Navbar() {
  const navigate = useNavigate();
  const { loggedIn } = useContext(AuthContext);

  const handleRedirect = (url: string) => {
    navigate(url);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
        <WebLogo isRedirect />
        <ul className={styles.navLists}>
          <li className={styles.navItem} onClick={() => handleRedirect('/search')}>
            <Search />
          </li>
          {loggedIn ? (
            <NavDropdown />
          ) : (
            <li className={styles.navItem} onClick={() => handleRedirect('/login')}>
              <User />
              <p>로그인</p>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

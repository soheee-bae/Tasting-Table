import React, { MouseEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Search, User } from 'icons/index';
import WebLogo from 'components/WebLogo/webLogo';
import styles from './navbar.module.scss';
import AuthContext from 'contexts/authContext';
import { logout } from 'apis/auth';
import NavDropdown from 'components/NavDropdown/navDropdown';

export default function Navbar() {
  const navigate = useNavigate();
  const { loggedIn, getLoggedIn } = useContext(AuthContext);

  const handleRedirect = (url: string) => {
    navigate(url);
  };

  const handleLogout = async (e: MouseEvent) => {
    e.preventDefault();
    await logout();
    await getLoggedIn();
    navigate('/');
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.innerNav}>
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

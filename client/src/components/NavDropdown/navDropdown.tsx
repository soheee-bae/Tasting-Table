import React, { MouseEvent, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './navDropdown.module.scss';
import AuthContext from 'contexts/authContext';
import { logout } from 'apis/auth';
import { User } from 'icons/index';
import blankProfile from 'image/blankProfile.png';

export default function NavDropdown() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { getLoggedIn, email } = useContext(AuthContext);

  const handleLogout = async (e: MouseEvent) => {
    e.preventDefault();
    await logout();
    await getLoggedIn();
    navigate('/');
  };

  return (
    <div className={styles.navDropdownContainer}>
      <li className={styles.navItem} onClick={() => setOpen(!open)}>
        <User />
        <p>마이페이지</p>
      </li>
      <div className={styles.navDropdown} data-open={open}>
        <div className={styles.navDropdownHeader}>
          <img src={blankProfile} alt="profile" />
          <p>{email}</p>
        </div>
        <div className={styles.navDropdownLists}>
          <Link to="/myrecipe">내 레시피</Link>
          <Link to="/bookmark">책갈피한 레시피</Link>
          <Link to="/profile">회원정보 수정</Link>
          <p onClick={handleLogout}>로그아읏</p>
        </div>
      </div>
    </div>
  );
}

import React, { useRef, MouseEvent, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './navDropdown.module.scss';
import AuthContext from 'contexts/authContext';
import { logout } from 'apis/auth';
import { User } from 'icons/index';
import blankProfile from 'image/blankProfile.png';
import { getProfile } from 'apis/profile';

export default function NavDropdown() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [profileImg, setProfileImg] = useState<string>('');
  const { getLoggedIn, email } = useContext(AuthContext);
  const ref = useRef<HTMLDivElement>(null);

  const handleLogout = async (e: MouseEvent) => {
    e.preventDefault();
    await logout();
    await getLoggedIn();
    navigate('/');
  };

  const handleClickOutside = (ev: any) => {
    if (ref.current && !ref.current.contains(ev.target)) {
      setOpen(false);
    }
  };
  async function fetchProfile() {
    const profile = await getProfile();
    setProfileImg(profile?.profileImg || {});
  }

  useEffect(() => {
    fetchProfile();
  }, [open]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <div ref={ref} className={styles.navDropdownContainer}>
      <li className={styles.navItem} onClick={() => setOpen(!open)}>
        <User />
        <p>마이페이지</p>
      </li>
      <div className={styles.navDropdown} data-open={open}>
        <div className={styles.navDropdownHeader}>
          <img src={profileImg || blankProfile} alt="profile" />
          <p>{email}</p>
        </div>
        <div className={styles.navDropdownLists}>
          <Link to="/myrecipe">내 레시피</Link>
          <Link to="/bookmark">책갈피한 레시피</Link>
          <Link to="/newrecipe">새로운 레시피 등록하기</Link>
          <Link to="/profile">회원정보 수정</Link>
          <p onClick={handleLogout}>로그아읏</p>
        </div>
      </div>
    </div>
  );
}

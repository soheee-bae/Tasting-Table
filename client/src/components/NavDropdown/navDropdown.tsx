import React, { useRef, MouseEvent, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './navDropdown.module.scss';
import AuthContext from 'contexts/authContext';
import { User } from 'icons/index';
import blankProfile from 'image/blankProfile.png';

import { logout } from 'apis/auth';
import { getProfile } from 'apis/profile';
import Bio from 'components/Bio/bio';

export default function NavDropdown() {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { getLoggedIn, email } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [profileImg, setProfileImg] = useState<string>('');

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
    <div ref={ref} className={styles.navDropdown}>
      <li className={styles.navDropdownButton} onClick={() => setOpen(!open)}>
        <User />
        <p>마이페이지</p>
      </li>
      <div className={styles.navDropdownContent} data-open={open}>
        <Bio imgSrc={profileImg || blankProfile} title={email} className={styles.navDropdownBio} />
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

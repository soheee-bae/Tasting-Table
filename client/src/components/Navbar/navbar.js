import { Search, User } from '../../icons';
import WebLogo from '../WebLogo/webLogo';
import styles from './navbar.module.scss';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleRedirect = (url) => {
    navigate(url);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.innerNav}>
        <WebLogo isRedirect={true} />
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

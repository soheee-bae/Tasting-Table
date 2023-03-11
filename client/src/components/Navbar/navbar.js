import { Search, User } from '../../icons';
import WebLogo from '../WebLogo/webLogo';
import styles from './navbar.module.scss';

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <WebLogo />
      <div className={styles.navLists}>
        <Search />
        <div className={styles.navItem}>
          <User />
          <p>로그인</p>
        </div>
      </div>
    </nav>
  );
}

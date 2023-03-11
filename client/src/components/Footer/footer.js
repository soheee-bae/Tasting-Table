import styles from './footer.module.scss';
import { Linkedin, Email, Github } from '../../icons/index';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerMediaIcons}>
        <Link target="_blank" to={{ pathname: 'https://www.linkedin.com/in/sohee-bae-b37a9a166/' }}>
          <Linkedin />
        </Link>
        <Link target="_blank" to={{ pathname: 'mailto:baesoheee@gmail.com' }}>
          <Email />
        </Link>
        <Link target="_blank" to={{ pathname: 'https://github.com/soheee-bae' }}>
          <Github />
        </Link>
      </div>
      <p>&#169; 2023 SoHeeBae. All rights reserved. </p>
    </footer>
  );
}

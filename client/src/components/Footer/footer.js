import styles from './footer.module.scss';
import { Linkedin, Email, Github } from '../../icons/index';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerMediaIcons}>
        <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/sohee-bae-b37a9a166/">
          <Linkedin />
        </a>
        <a target="_blank" rel="noreferrer" href="mailto:baesoheee@gmail.com">
          <Email />
        </a>
        <a target="_blank" rel="noreferrer" href="https://github.com/soheee-bae">
          <Github />
        </a>
      </div>
      <p>&#169; 2023 SoHeeBae. All rights reserved. </p>
    </footer>
  );
}

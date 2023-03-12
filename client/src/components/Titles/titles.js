import styles from './titles.module.scss';
import PropTypes from 'prop-types';

Titles.defaultProps = {
  title: '',
  subTitle: ''
};

Titles.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string
};

export default function Titles(props) {
  const { title, subTitle } = props;

  return (
    <div className={styles.titles}>
      <div className={styles.title}>
        <p className={styles.vr}> |</p>
        <p>{title}</p>
        <p className={styles.vr}> |</p>
      </div>
      <p className={styles.subTitle}>{subTitle}</p>
    </div>
  );
}

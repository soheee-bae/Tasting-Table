import { Logo } from '../../icons';
import styles from './webLogo.module.scss';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';

WebLogo.defaultProps = {
  isRedirect: false
};

WebLogo.propTypes = {
  isRedirect: PropTypes.bool
};

export default function WebLogo(props) {
  const { isRedirect } = props;
  const navigate = useNavigate();

  return (
    <div
      className={clsx(styles.webLogo, { [styles.disable]: !isRedirect })}
      onClick={() => navigate('/')}>
      <Logo />
    </div>
  );
}

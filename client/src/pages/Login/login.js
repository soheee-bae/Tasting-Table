import { useState } from 'react';
import { Link } from 'react-router-dom';
import Titles from '../../components/Titles/titles';
import styles from './login.module.scss';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {};

  return (
    <div className={styles.login}>
      <Titles title="LOGIN" />
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.inputField}>
          아이디
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label className={styles.inputField}>
          비밀번호
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <input className={styles.submitButton} type="submit" value="로그인" />
      </form>
      <div className={styles.others}>
        <p>회원이 아니신가요?</p>
        <Link to="/register">회원가입하기</Link>
      </div>
    </div>
  );
}

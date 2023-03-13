import React, { useContext, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Titles from 'components/Titles/titles';
import styles from './login.module.scss';
import { login } from 'apis/auth';
import AuthContext from 'contexts/authContext';

export default function Login() {
  const navigate = useNavigate();
  const { getLoggedIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await login({ email, password });
    await getLoggedIn();
    navigate('/');
  };

  return (
    <div className={styles.login}>
      <Titles title="LOGIN" />
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.inputField}>
          아이디
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className={styles.inputField}>
          비밀번호
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <input className={styles.submitButton} type="submit" value="로그인" />
      </form>
      <div className={styles.others}>
        <p>회원이 아니신가요?</p>
        <Link to="/signup">회원가입하기</Link>
      </div>
    </div>
  );
}

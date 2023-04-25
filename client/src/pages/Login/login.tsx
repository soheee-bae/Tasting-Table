import React, { useContext, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './login.module.scss';

import { login } from 'apis/auth';
import Titles from 'components/Titles/title';
import AuthContext from 'contexts/authContext';

export default function Login() {
  const navigate = useNavigate();
  const { getLoggedIn, getLoggedInStatus } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res: any = await login({ email, password });
    if (res.response && res.response.status === 400) {
      setError(res?.response?.data?.errorMessage);
    } else {
      await getLoggedIn();
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginContainer}>
        <Titles title="LOGIN" />
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <label className={styles.inputField}>
            아이디
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className={styles.inputField}>
            비밀번호
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          {error && <p className={styles.error}>{error}</p>}
          <input className={styles.submitButton} type="submit" value="로그인" />
        </form>
        <div className={styles.moreContent}>
          <p>회원이 아니신가요?</p>
          <Link to="/signup">회원가입하기</Link>
        </div>
      </div>
    </div>
  );
}

import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import Titles from 'components/Titles/titles';
import styles from './signup.module.scss';
import { register } from 'apis/register';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    register({ email, password, passwordVerify });
  };

  return (
    <div className={styles.signup}>
      <Titles title="SIGN UP" />
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.inputField}>
          아이디
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className={styles.inputField}>
          비밀번호
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label className={styles.inputField}>
          비밀번호 확인
          <input
            type="password"
            value={passwordVerify}
            onChange={(e) => setPasswordVerify(e.target.value)}
          />
        </label>
        <input className={styles.submitButton} type="submit" value="회원가입" />
      </form>
      <div className={styles.others}>
        <p>회원이신가요?</p>
        <Link to="/login">로그인하기</Link>
      </div>
    </div>
  );
}

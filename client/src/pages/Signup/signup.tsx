import React, { FormEvent, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './signup.module.scss';

import Titles from 'components/Titles/title';
import AuthContext from 'contexts/authContext';

import { register } from 'apis/auth';
import { createProfile } from 'apis/profile';

export default function Signup() {
  const navigate = useNavigate();
  const { getLoggedIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res: any = await register({ email, password, passwordVerify });
    await createProfile({
      email,
      name: '',
      nickname: '',
      birthdate: '',
      profileImg: 'https://tastingtable.s3.amazonaws.com/blankProfile.png'
    });
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
    <div className={styles.signup}>
      <div className={styles.signupContainer}>
        <Titles title="SIGN UP" />
        <form onSubmit={handleSubmit} className={styles.signupForm}>
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
          {error && <p className={styles.error}>{error}</p>}
          <input className={styles.submitButton} type="submit" value="회원가입" />
        </form>
        <div className={styles.moreContent}>
          <p>회원이신가요?</p>
          <Link to="/login">로그인하기</Link>
        </div>
      </div>
    </div>
  );
}

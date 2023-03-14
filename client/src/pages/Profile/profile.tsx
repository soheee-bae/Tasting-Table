import Titles from 'components/Titles/titles';
import React, { useState } from 'react';
import styles from './profile.module.scss';
import blankProfile from 'image/blankProfile.png';

export default function Profile() {
  const [nickName, setNickName] = useState('');
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const handleSubmit = () => {
    console.log('handleSubmit');
  };

  return (
    <div className={styles.profileContainer}>
      <Titles title="EDIT PROFILE" subTitle="회원정보 수정" />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.content}>
          <p className={styles.title}>프로필</p>
          <div className={styles.innerContent}>
            <img src={blankProfile} alt="profile" />
            <label className={styles.inputField}>
              닉네임(필수)
              <input type="text" value={nickName} onChange={(e) => setNickName(e.target.value)} />
            </label>
            <label className={styles.inputField}>
              이메일(필수)
              <input type="email" disabled value={name} />
            </label>
          </div>
        </div>
        <div className={styles.content}>
          <p className={styles.title}>회원정보 </p>
          <div className={styles.innerContent}>
            <label className={styles.inputField}>
              이름
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label className={styles.inputField}>
              생년월일
              <input
                type="number"
                value={birthdate}
                placeholder="숫자만 입력해주세요(YYYYMMDD)"
                onChange={(e) => setBirthdate(e.target.value)}
              />
            </label>
          </div>
        </div>
        <input className={styles.submitButton} type="submit" value="회원정보 수정" />
      </form>
    </div>
  );
}

import Titles from 'components/Titles/titles';
import React, { FormEvent, useContext, useEffect, useState } from 'react';
import styles from './profile.module.scss';
import blankProfile from 'image/blankProfile.png';
import { editProfile, getProfile } from 'apis/profile';
import AuthContext from 'contexts/authContext';

export default function Profile() {
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const { email, userId } = useContext(AuthContext);

  async function fetchProfile() {
    const profile = await getProfile();
    setNickname(profile?.nickname || '');
    setBirthdate(profile?.birthdate || '');
    setName(profile?.name || '');
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await editProfile({
      userId,
      email,
      name,
      nickname,
      birthdate
    });
    // Maybe add toast for snackbar
  };

  return (
    <div className={styles.profile}>
      <div className={styles.profileContainer}>
        <Titles title="EDIT PROFILE" subTitle="회원정보 수정" />
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.content}>
            <p className={styles.title}>프로필</p>
            <div className={styles.innerContent}>
              <img src={blankProfile} alt="profile" />
              <label className={styles.inputField}>
                닉네임
                <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
              </label>
              <label className={styles.inputField}>
                이메일(필수)
                <input type="email" disabled value={email} />
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
                  onChange={(e) => {
                    e.target.value.length < 7 && setBirthdate(e.target.value);
                  }}
                />
              </label>
            </div>
          </div>
          <input className={styles.submitButton} type="submit" value="회원정보 수정" />
        </form>
      </div>
    </div>
  );
}

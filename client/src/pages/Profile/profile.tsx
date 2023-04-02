import React, { ChangeEvent, MouseEvent, ReactNode, useContext, useEffect, useState } from 'react';
import styles from './profile.module.scss';

import Button from 'components/Button/button';
import Titles from 'components/Titles/title';

import { editProfile, getProfile } from 'apis/profile';
import AuthContext from 'contexts/authContext';
import { Toast, ToastSnackbar } from 'components/Toast/toast';
import Subtitle from 'components/Subtitles/subtitle';
import ImageUploader from 'components/ImageUploader/imageUploader';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Edit } from 'icons/index';

export default function Profile() {
  const { email } = useContext(AuthContext);

  const [profileImg, setProfileImg] = useState('');
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await editProfile({
      profileImg,
      email,
      name,
      nickname,
      birthdate
    });
    if (res.status !== 200) {
      toast(<Toast icon={<Edit />} title="레시피가 수정되었습니다." />);
    } else {
      toast(<Toast icon={<Edit />} title="문제가 발생했습니다." subtitle=" 다시 시도하십시오." />);
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) setProfileImg(URL.createObjectURL(e.target?.files[0]));
  };

  async function fetchProfile() {
    const profile = await getProfile();
    setProfileImg(profile?.profileImg || {});
    setNickname(profile?.nickname || '');
    setBirthdate(profile?.birthdate || '');
    setName(profile?.name || '');
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className={styles.profile}>
      <div className={styles.profileContainer}>
        <Titles title="EDIT PROFILE" subTitle="회원정보 수정" />
        <form className={styles.profileForm}>
          <ProfileContent subtitle="프로필">
            <ImageUploader imgSrc={profileImg} handleFileChange={handleFileChange} round />
            <label className={styles.inputField}>
              닉네임
              <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
            </label>
            <label className={styles.inputField}>
              이메일(필수)
              <input type="email" disabled value={email} />
            </label>
          </ProfileContent>
          <ProfileContent subtitle="회원정보">
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
          </ProfileContent>
          <Button
            size="md"
            onClick={handleSubmit}
            variant="contained"
            className={styles.profileButton}>
            회원정보 수정
          </Button>
        </form>
      </div>
      <ToastSnackbar />
    </div>
  );
}

interface ProfileContentProps {
  children: ReactNode;
  subtitle: string;
}
function ProfileContent(props: ProfileContentProps) {
  const { children, subtitle } = props;
  return (
    <div className={styles.profileContent}>
      <Subtitle subTitle={subtitle} />
      <div className={styles.innerContent}>{children}</div>
    </div>
  );
}

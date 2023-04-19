import React, { MouseEvent, ReactNode, useContext, useEffect, useState } from 'react';
import styles from './profile.module.scss';

import Button from 'components/Button/button';
import Titles from 'components/Titles/title';
import { Toast, ToastSnackbar } from 'components/Toast/toast';
import Subtitle from 'components/Subtitles/subtitle';
import ImageUploaderSingle from 'components/ImageUploaderSingle/imageUploaderSingle';

import { Error, Success } from 'icons/index';
import { editProfile, getProfile } from 'apis/profile';
import AuthContext from 'contexts/authContext';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useConvertDataUrlBlob } from 'hooks/useConvertDataUrlBlob';

export default function Profile() {
  const { email, setProfileImage } = useContext(AuthContext);

  const [profileImg, setProfileImg] = useState('');
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [intro, setIntro] = useState('');

  const { blobToDataURL } = useConvertDataUrlBlob();
  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await editProfile({
      profileImg,
      email,
      name,
      nickname,
      birthdate,
      intro
    });
    if (res.status === 200) {
      toast(<Toast icon={<Success />} title="프로필이 수정되었습니다." />);
      if (profileImg) setProfileImage(profileImg);
    } else {
      toast(<Toast icon={<Error />} title="문제가 발생했습니다." subtitle=" 다시 시도하십시오." />);
    }
  };

  const handleFileChange = async (file: File[]) => {
    const blob = await resize(file && file[0]);
    const dataUrl = await blobToDataURL(blob);
    if (dataUrl.length > 0) setProfileImg(dataUrl);
  };

  async function fetchProfile() {
    const profile = await getProfile();
    setProfileImg(profile?.profileImg);
    setNickname(profile?.nickname || '');
    setBirthdate(profile?.birthdate || '');
    setName(profile?.name || '');
    setIntro(profile?.intro || '');
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
            <ImageUploaderSingle handleFileChange={handleFileChange} imgSrc={profileImg} />
            <label className={styles.inputField}>
              닉네임
              <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
            </label>
            <label className={styles.inputField}>
              이메일(필수)
              <input type="email" disabled value={email} />
            </label>
            <label className={styles.inputField}>
              자기소개 (20자 이내)
              <input
                maxLength={20}
                type="text"
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
              />
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

async function resize(file: any) {
  const img = document.createElement('img');
  img.src = await new Promise<any>((resolve) => {
    const reader = new FileReader();
    reader.onload = (e: any) => resolve(e.target.result);
    reader.readAsDataURL(file);
  });

  await new Promise((resolve) => (img.onload = resolve));
  const canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');

  ctx?.drawImage(img, 0, 0);

  const MAX_WIDTH = 200;
  const MAX_HEIGHT = 200;
  let width = img.naturalWidth;
  let height = img.naturalHeight;

  if (width > height) {
    if (width > MAX_WIDTH) {
      height *= MAX_WIDTH / width;
      width = MAX_WIDTH;
    }
  } else {
    if (height > MAX_HEIGHT) {
      width *= MAX_HEIGHT / height;
      height = MAX_HEIGHT;
    }
  }
  canvas.width = width;
  canvas.height = height;
  ctx = canvas.getContext('2d');
  ctx?.drawImage(img, 0, 0, width, height);
  const result = await new Promise((resolve) => {
    canvas.toBlob(resolve, 'image/jpeg', 0.95);
  });
  return result;
}

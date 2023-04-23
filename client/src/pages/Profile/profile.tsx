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
import { uploadImage } from 'helpers/uploadImage';
import { LoadingIcon } from 'components/LoadingIndicator/loadingIndicator';

export default function Profile() {
  const { email, setProfileImage } = useContext(AuthContext);

  const [selectedFile, setSelectedFile] = useState<File>();
  const [profileImg, setProfileImg] = useState('');
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [intro, setIntro] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let imgUrl;
    if (selectedFile) {
      setIsLoading(true);
      imgUrl = await uploadImage(selectedFile);
    }
    const res = await editProfile({
      profileImg: imgUrl?.location ?? profileImg,
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
    setIsLoading(false);
  };

  const handleFileChange = async (file: File[]) => {
    if (file.length > 0) {
      setSelectedFile(file[0]);
    }
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
            {isLoading ? <LoadingIcon /> : '회원정보 수정'}
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

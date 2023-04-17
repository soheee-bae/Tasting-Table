import { loggedInReq } from 'apis/auth';
import { getProfile } from 'apis/profile';
import React, { createContext, ReactNode, useEffect, useState } from 'react';

export type AuthContextContent = {
  loggedIn: boolean;
  getLoggedIn: () => void;
  email: string;
  userId: string;
  profileImg: Blob;
  setProfileImage: (img: Blob) => void;
  nickname: string;
  name: string;
};

const AuthContext = createContext<AuthContextContent>({
  loggedIn: false,
  getLoggedIn: () => undefined,
  email: '',
  userId: '',
  profileImg: new Blob(),
  nickname: '',
  name: '',
  setProfileImage: (img: Blob) => undefined
});

interface AuthContextProps {
  children: ReactNode;
}

function AuthContextProvider(props: AuthContextProps) {
  const { children } = props;

  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [profileImg, setProfileImage] = useState<Blob>(new Blob());
  const [nickname, setNickname] = useState<string>('');
  const [name, setName] = useState<string>('');

  async function getLoggedIn() {
    const loggedInRes = await loggedInReq();
    if (loggedInRes) {
      const profile = await getProfile();
      setEmail(profile?.email);
      setUserId(profile?.userId);
      setProfileImage(profile?.profileImg);
      setNickname(profile?.nickname);
      setName(profile?.name);
    }
    setLoggedIn(loggedInRes || false);
  }

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ loggedIn, getLoggedIn, email, userId, profileImg, nickname, name, setProfileImage }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };

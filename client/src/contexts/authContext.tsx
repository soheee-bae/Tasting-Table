import { loggedInReq } from 'apis/auth';
import { getProfile } from 'apis/profile';
import React, { createContext, ReactNode, useEffect, useState } from 'react';

export type AuthContextContent = {
  loggedIn: boolean;
  getLoggedIn: () => void;
  email: string;
  userId: string;
  profileImg: string;
  nickname: string;
};

const AuthContext = createContext<AuthContextContent>({
  loggedIn: false,
  getLoggedIn: () => undefined,
  email: '',
  userId: '',
  profileImg: '',
  nickname: ''
});

interface AuthContextProps {
  children: ReactNode;
}

function AuthContextProvider(props: AuthContextProps) {
  const { children } = props;
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [profileImg, setProfileImg] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');

  async function getLoggedIn() {
    const loggedInRes = await loggedInReq();
    if (loggedInRes) {
      const profile = await getProfile();
      setEmail(profile?.email || '');
      setUserId(profile?.userId || '');
      setProfileImg(profile?.profileImg || '');
      setNickname(profile?.nickname || '');
    }
    setLoggedIn(loggedInRes || false);
  }

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn, email, userId, profileImg, nickname }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };

import { loggedInReq } from 'apis/auth';
import React, { createContext, ReactNode, useEffect, useState } from 'react';

export type AuthContextContent = {
  loggedIn: boolean;
  getLoggedIn: () => void;
};

const AuthContext = createContext<AuthContextContent>({
  loggedIn: false,
  getLoggedIn: () => undefined
});

interface AuthContextProps {
  children: ReactNode;
}

function AuthContextProvider(props: AuthContextProps) {
  const { children } = props;
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  async function getLoggedIn() {
    const loggedInRes = await loggedInReq();
    setLoggedIn(loggedInRes || false);
  }

  useEffect(() => {
    getLoggedIn();
  }, []);

  return <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>{children}</AuthContext.Provider>;
}

export default AuthContext;
export { AuthContextProvider };

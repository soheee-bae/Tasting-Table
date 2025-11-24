import axios from 'axios';

interface RegisterProps {
  email: string;
  password: string;
  passwordVerify: string;
}

interface LoginProps {
  email: string;
  password: string;
}

export const register = async (props: RegisterProps) => {
  const { email, password, passwordVerify } = props;

  try {
    const registerData = {
      email,
      password,
      passwordVerify
    };
    // return await axios.post('http://localhost:5050/auth/register', registerData).then((res) => res);
    return await axios
      .post('https://tasting-table.onrender.com/auth/register', registerData)
      .then((res) => res);
  } catch (err) {
    return err;
  }
};

export const login = async (props: LoginProps) => {
  const { email, password } = props;

  try {
    const loginData = {
      email,
      password
    };
    // return await axios.post('http://localhost:5050/auth/login', loginData).then((res) => res);
    return await axios
      .post('https://tasting-table.onrender.com/auth/login', loginData)
      .then((res) => res);
  } catch (err) {
    return err;
  }
};

export const logout = async () => {
  try {
    await axios.get('https://tasting-table.onrender.com/auth/logout');
    // await axios.get('http://localhost:5050/auth/logout');
  } catch (err) {
    console.error(err);
  }
};

export const loggedInReq = async () => {
  try {
    const res = await axios.get('https://tasting-table.onrender.com/auth/loggedIn');
    // const res = await axios.get('http://localhost:5050/auth/loggedIn');
    return res.data as boolean;
  } catch (err) {
    console.error(err);
  }
};

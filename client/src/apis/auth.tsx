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
    // await axios.post('http://localhost:5050/auth/register', registerData);
    await axios.post('https://tasting-table.herokuapp.com/auth/register', registerData);
  } catch (err) {
    console.error(err);
  }
};

export const login = async (props: LoginProps) => {
  const { email, password } = props;

  try {
    const loginData = {
      email,
      password
    };
    await axios.post('https://tasting-table.herokuapp.com/auth/login', loginData);
    // await axios.post('http://localhost:5050/auth/login', loginData);
  } catch (err) {
    console.error(err);
  }
};

export const logout = async () => {
  try {
    await axios.get('https://tasting-table.herokuapp.com/auth/logout');
    // await axios.get('http://localhost:5050/auth/logout');
  } catch (err) {
    console.error(err);
  }
};

export const loggedInReq = async () => {
  try {
    const res = await axios.get('https://tasting-table.herokuapp.com/auth/loggedIn');
    // const res = await axios.get('http://localhost:5050/auth/loggedIn');
    return res.data as boolean;
  } catch (err) {
    console.error(err);
  }
};

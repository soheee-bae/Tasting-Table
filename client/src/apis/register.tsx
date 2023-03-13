import axios from 'axios';

interface RegisterProps {
  email: string;
  password: string;
  passwordVerify: string;
}

export const register = async (props: RegisterProps) => {
  const { email, password, passwordVerify } = props;

  try {
    const registerData = {
      email,
      password,
      passwordVerify
    };

    await axios.post('http://localhost:5050/auth/register', registerData);
  } catch (err) {
    console.error(err);
  }
};

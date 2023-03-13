import axios from 'axios';

interface LoginProps {
  email: string;
  password: string;
}

export const login = async (props: LoginProps) => {
  const { email, password } = props;

  try {
    const loginData = {
      email,
      password
    };

    await axios.post('http://localhost:5050/auth/login', loginData);
  } catch (err) {
    console.error(err);
  }
};

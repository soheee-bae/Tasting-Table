import axios from 'axios';

export const logout = async () => {
  try {
    await axios.get('http://localhost:5050/auth/logout');
  } catch (err) {
    console.error(err);
  }
};

import axios from 'axios';

export interface ProfileProps {
  email: string;
  name: string;
  nickname: string;
  birthdate: string;
}

export const createProfile = async (props: ProfileProps) => {
  try {
    await axios.post('http://localhost:5050/profile/create', { ...props });
  } catch (err) {
    console.error(err);
  }
};

export const editProfile = async (props: ProfileProps) => {
  try {
    await axios.put('http://localhost:5050/profile/edit', { ...props });
  } catch (err) {
    console.error(err);
  }
};

export const getProfile = async () => {
  try {
    const profile = await axios.get('http://localhost:5050/profile/');
    return profile.data;
  } catch (err) {
    console.error(err);
  }
};

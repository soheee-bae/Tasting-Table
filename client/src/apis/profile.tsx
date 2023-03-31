import axios from 'axios';

export interface ProfileProps {
  profileImg?: string;
  email?: string;
  name?: string;
  nickname?: string;
  birthdate?: string;
}

export const getProfile = async () => {
  try {
    const profile = await axios.get('http://localhost:5050/profile/');
    return profile.data;
  } catch (err) {
    console.error(err);
  }
};

export const editProfile = async (props: ProfileProps) => {
  try {
    const profile = await axios.put('http://localhost:5050/profile/', { ...props });
    return profile.data;
  } catch (err) {
    console.error(err);
  }
};

export const createProfile = async (props: ProfileProps) => {
  try {
    const profile = await axios.post('http://localhost:5050/profile/', { ...props });
    return profile.data;
  } catch (err) {
    console.error(err);
  }
};

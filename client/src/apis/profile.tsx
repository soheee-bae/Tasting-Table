import axios from 'axios';

export interface ProfileProps {
  profileImg?: Blob;
  email?: string;
  name?: string;
  nickname?: string;
  birthdate?: string;
  intro?: string;
}

export interface ProfileUserIdProps {
  id?: string;
}

export const getProfile = async () => {
  try {
    const profile = await axios.get('http://localhost:5050/profile/');
    return profile.data;
  } catch (err) {
    console.error(err);
  }
};

export const getProfileByUserId = async (props: ProfileUserIdProps) => {
  const { id } = props;

  try {
    const profile = await axios.get(`http://localhost:5050/profile/${id}`);
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

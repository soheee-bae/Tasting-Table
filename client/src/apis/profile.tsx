import axios from 'axios';

interface ProfileProps {
  userId: string;
  email: string;
  name: string;
  nickname: string;
  birthdate: number;
}

export const createProfile = async (props: ProfileProps) => {
  const { userId, email, name, nickname, birthdate } = props;

  try {
    const createProfileData = {
      userId,
      email,
      name,
      nickname,
      birthdate
    };

    await axios.post('http://localhost:5050/profile/create', createProfileData);
  } catch (err) {
    console.error(err);
  }
};

export const editProfile = async (props: ProfileProps) => {
  const { userId, email, name, nickname, birthdate } = props;

  try {
    const createProfileData = {
      userId,
      email,
      name,
      nickname,
      birthdate
    };

    await axios.post('http://localhost:5050/profile/edit', createProfileData);
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

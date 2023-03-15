import axios from 'axios';

interface CreateProfileProps {
  userId: string;
  email: string;
  name: string;
  nickname: string;
  birthdate: number;
}

export const createProfile = async (props: CreateProfileProps) => {
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

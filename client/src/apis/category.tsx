import axios from 'axios';

export interface CategoryProps {
  id: number;
  name: string;
}

export const getCategory = async () => {
  try {
    const category = await axios.get('http://localhost:5050/category/');
    return category.data;
  } catch (err) {
    console.error(err);
  }
};

export const createCategory = async (props: CategoryProps) => {
  try {
    const category = await axios.post('http://localhost:5050/category/', { ...props });
    return category.data;
  } catch (err) {
    console.error(err);
  }
};

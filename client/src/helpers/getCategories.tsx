import { CategoryProps, getCategory } from 'apis/category';
import { useEffect, useState } from 'react';

export const getCategories = () => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  async function fetchCategories() {
    const categories = await getCategory();
    setCategories(categories || []);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories };
};

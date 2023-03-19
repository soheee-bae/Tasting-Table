import axios from 'axios';
import { CategoryProps } from './category';

interface Ingredient {
  name: string;
  mensuration: string;
}
interface Step {
  // image:
  details: string;
}

export interface Recipe {
  // image, comment
  userId: string;
  name?: string;
  level?: number;
  description?: string;
  duration?: number;
  categoryType?: CategoryProps;
  amounts?: { min: number; max: number };
  ingredients?: [{ name: string; ingredient: Ingredient[] }];
  steps?: Step[];
  _id?: string;
}

export interface RecipeProps {
  id?: string;
  data?: Recipe;
}

export const getAllRecipes = async () => {
  try {
    const recipes = await axios.get('http://localhost:5050/recipe/all');
    return recipes.data;
  } catch (err) {
    console.error(err);
  }
};

export const getRecipeById = async (props: RecipeProps) => {
  const { id } = props;
  try {
    const recipes = await axios.get(`http://localhost:5050/recipe/${id}`);
    return recipes.data;
  } catch (err) {
    console.error(err);
  }
};

export const getRecipesByUserId = async (props: RecipeProps) => {
  const { id } = props;
  try {
    const recipes = await axios.get(`http://localhost:5050/recipe/user/${id}`);
    return recipes.data;
  } catch (err) {
    console.error(err);
  }
};

export const createRecipe = async (props: RecipeProps) => {
  const { data } = props;

  try {
    const recipes = await axios.post('http://localhost:5050/recipe/', { ...data });
    return recipes.data;
  } catch (err) {
    console.error(err);
  }
};

export const editRecipe = async (props: RecipeProps) => {
  const { id, data } = props;
  try {
    const recipes = await axios.put(`http://localhost:5050/recipe/${id}`, { ...data });
    return recipes.data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteRecipe = async (props: RecipeProps) => {
  const { id } = props;

  try {
    const recipes = await axios.delete(`http://localhost:5050/recipe/${id}`);
    return recipes.data;
  } catch (err) {
    console.error(err);
  }
};

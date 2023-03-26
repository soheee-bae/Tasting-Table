import axios from 'axios';
import { CategoryProps } from './category';

export interface Ingredient {
  name: string;
  mensuration: string;
}
export interface Step {
  // image:
  id: number;
  details: string;
}

export interface Recipe {
  userId: string;
  name?: string;
  level?: number;
  description?: string;
  duration?: number;
  categoryType?: CategoryProps;
  amounts?: number;
  ingredients?: [{ name: string; ingredient: Ingredient[] }];
  steps?: Step[];
  _id?: string;
}

export interface RecipeProps {
  id: string;
  data: Recipe;
}

interface RecipeIdProps {
  id: string;
}

export const getAllRecipes = async () => {
  try {
    const recipes = await axios.get('http://localhost:5050/recipe/all');
    return recipes.data;
  } catch (err) {
    console.error(err);
  }
};

export const getRecipeById = async (props: RecipeIdProps) => {
  const { id } = props;
  try {
    const recipes = await axios.get(`http://localhost:5050/recipe/${id}`);
    return recipes.data;
  } catch (err) {
    console.error(err);
  }
};

export const getRecipesByUserId = async (props: RecipeIdProps) => {
  const { id } = props;
  try {
    const recipes = await axios.get(`http://localhost:5050/recipe/user/${id}`);
    return recipes.data;
  } catch (err) {
    console.error(err);
  }
};

export const createRecipe = async (props: Recipe) => {
  try {
    const recipes = await axios.post('http://localhost:5050/recipe/', { ...props });
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

export const deleteRecipe = async (props: RecipeIdProps) => {
  const { id } = props;

  try {
    const recipes = await axios.delete(`http://localhost:5050/recipe/${id}`);
    return recipes.data;
  } catch (err) {
    console.error(err);
  }
};

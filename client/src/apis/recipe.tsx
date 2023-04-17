import axios from 'axios';
import { CategoryProps } from './category';

export interface Ingredient {
  id: number;
  name: string;
  mensuration: string;
}
export interface Ingredients {
  id: number;
  name: string;
  ingredient: Ingredient[];
}

export interface Step {
  id: number;
  img: string;
  details: string;
}

export interface Review {
  rating?: number;
  img?: string[];
  review: string;
  dateCreated: Date;
  userId: string;
}

export interface Recipe {
  userId: string;
  img?: string;
  name?: string;
  level?: number;
  description?: string;
  duration?: number;
  categoryType?: CategoryProps;
  amounts?: number;
  ingredients?: Ingredients[];
  steps?: Step[];
  createdDate?: Date;
  _id?: string;
  reviews?: Review[];
}

export interface RecipeProps {
  id: string;
  data: Recipe;
}

interface RecipeIdProps {
  id: string;
}

interface CategoryIdProps {
  id: number;
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

export const getRecipesByCategory = async (props: CategoryIdProps) => {
  const { id } = props;
  try {
    const recipes = await axios.get(`http://localhost:5050/recipe/category/${id}`);
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

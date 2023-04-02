import { Recipe } from 'apis/recipe';

export const getListSorted = (recipes: Recipe[], selectedSorting: number) => {
  switch (selectedSorting) {
    case 1: {
      const sortedRecipe = recipes.sort(
        (a, b) =>
          new Date(b?.createdDate || Date.now()).getTime() -
          new Date(a?.createdDate || Date.now()).getTime()
      );
      return sortedRecipe;
    }
    case 2: {
      const sortedRecipe = recipes.sort((a, b) => (a?.level || 0) - (b?.level || 0));
      return sortedRecipe;
    }
    case 3: {
      const sortedRecipe = recipes.sort((a, b) => (a?.duration || 0) - (b?.duration || 0));
      return sortedRecipe;
    }
  }
};

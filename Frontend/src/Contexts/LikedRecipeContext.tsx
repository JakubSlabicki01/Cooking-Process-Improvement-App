import { createContext, Dispatch, SetStateAction } from 'react';

export type LikedRecipe = {
  user_id: number;
  recipe_id: number;
}

interface LikedRecipeContextType {
  likedRecipes: LikedRecipe[];
  setLikedRecipes: Dispatch<SetStateAction<LikedRecipe[]>>
};


const LikedRecipeContext = createContext<LikedRecipeContextType>({
    likedRecipes: [],
    setLikedRecipes: () => {},
  });

export default LikedRecipeContext;

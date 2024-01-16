import { createContext } from 'react';

export type Recipe = {
    id: number;
    ingredients: any;
    name: string;
    difficulty: string;
    preparation_time: number;
    servings: number;
    instructions: string;
    image_url: string;
    recipe_ingredients: RecipeIngredient[];
};

  
  export interface RecipeIngredient {
    recipe_id: number
    food_item_id: number;
    quantity: string;
  }
  
  export type Difficulty = 'Easy' | 'Medium' | 'Hard';

  export const difficultyOrder: Record<Difficulty, number> = {
    Easy: 1,
    Medium: 2,
    Hard: 3,
  };

type RecipeContextType = {
    recipes: Recipe[];
    setRecipes: (recipes: Recipe[]) => void;
};

const defaultState = {
    recipes: [],
    setRecipes: () => {}
};

const RecipeContext = createContext<RecipeContextType>(defaultState);


export default RecipeContext;
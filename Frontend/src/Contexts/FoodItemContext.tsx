// src/contexts/FoodItemContext.tsx
import { createContext, Dispatch, SetStateAction } from 'react';

export type FoodItem = {
  id: number;
  name: string;
  spoilage_days: number;
  icon_url: string;
};

interface FoodItemContextType {
    foodItems: FoodItem[];
    setFoodItems: Dispatch<SetStateAction<FoodItem[]>>;
  }

const FoodItemContext = createContext<FoodItemContextType>({
  foodItems: [],
  setFoodItems: () => {},
});

export default FoodItemContext;

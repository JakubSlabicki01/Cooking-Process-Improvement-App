// src/contexts/FoodItemContext.tsx
import { createContext, Dispatch, SetStateAction } from 'react';

export type FoodItem = {
  spoilage_days: any;
  id: number;
  name: string;
  quantity: number;
  expiryDate: number;
  icon_url: string; // Assuming you have a field for icon URL
};

interface FoodItemContextType {
    foodItems: FoodItem[];
    recognizedItems: FoodItem[];
    setFoodItems: Dispatch<SetStateAction<FoodItem[]>>;
    setRecognizedItems: Dispatch<SetStateAction<FoodItem[]>>;
  }

const FoodItemContext = createContext<FoodItemContextType>({
  foodItems: [],
  recognizedItems: [],
  setFoodItems: () => {},
  setRecognizedItems: () => {}
});

export default FoodItemContext;

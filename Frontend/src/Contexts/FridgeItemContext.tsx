// src/contexts/FridgeItemContext.js
import { createContext, Dispatch, SetStateAction } from 'react';

export type FridgeItem = {
    food_item_id: number;
    fridge_item_id: number;
    quantity: number;
    name: string;
    expiryDate: string;
    icon_url: string;
    addedDate: string;
  };

type FridgeItemContextType = {
  fridgeItems: FridgeItem[];
  setFridgeItems: Dispatch<SetStateAction<FridgeItem[]>>;
};

const FridgeItemContext = createContext<FridgeItemContextType>({
  fridgeItems: [],
  setFridgeItems: () => {}
});

export default FridgeItemContext;

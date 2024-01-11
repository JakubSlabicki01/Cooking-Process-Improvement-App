// AddFromListView.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/HeaderComponent';
import InputComponent from '../../Components/InputComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import ListPanelComponent from '../../Components/ListPanelComponent';
import Itembar from '../../Components/ItembarComponent';
import API from '../../Api'; // Import your API configuration
import './AddFromListView.css';

// Define a type for your food items
type FoodItem = {
  id: number;
  name: string;
  spoilage_days: number;
  icon_url: string;
};

type FridgeItem = {
  food_item_id: number;
  quantity: number;
};

const AddFromListView = () => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [fridgeQuantities, setFridgeQuantities] = useState<{ [key: number]: number }>({});
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({}); // Track quantities by item ID
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch food items when the component mounts
    const fetchFoodItems = async () => {
      try {
        const [foodResponse, fridgeResponse] = await Promise.all([
          API.get('/api/food-items'),
          API.get('/api/my-fridge') // Replace with the actual endpoint to get fridge items
        ]);
        setFoodItems(foodResponse.data); // Set the food items in state
        const quantities = fridgeResponse.data.reduce((acc: { [key: number]: number }, item: FridgeItem) => {
          acc[item.food_item_id] = item.quantity;
          return acc;
        }, {});
        setFridgeQuantities(quantities);
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };

    fetchFoodItems();
  }, []); // Empty dependency array ensures this effect runs once on mount

  // Function to handle adding an item to the fridge
// Function to handle adding an item to the fridge
const handleAddToFridge = async (itemId: number, addedQuantity: number) => {
  try {
    const response = await API.post('/api/my-fridge', {
      food_item_id: itemId,
      quantity: addedQuantity,
    });

    if (response.status === 201) {
      console.log('Item added to fridge:', itemId);

      // Update the fridgeQuantities state
      setFridgeQuantities(prevQuantities => ({
        ...prevQuantities,
        [itemId]: (prevQuantities[itemId] || 0) + addedQuantity
      }));
    }
  } catch (error) {
    console.error('Error adding item to fridge:', error);
  }
};


  // Function to update the quantity state
  const updateQuantity = (itemId: number, newQuantity: number) => {
    setQuantities({ ...quantities, [itemId]: newQuantity });
  };

  const goBack = () => {
    navigate(-1);
  };

  // Function to render food items
  const FoodItems = () => {
    return (
      <>
        {foodItems.map((item) => (
          <Itembar
            key={item.id}
            variant="big-add"
            itemName={item.name}
            quantity={fridgeQuantities[item.id] || 0}
            expiryDate={`${item.spoilage_days} days`}
            icon={item.icon_url} // Use img tag for icon
            onAction={() => handleAddToFridge(item.id, quantities[item.id] || 1)}
            onQuantityChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
            quantityValue={quantities[item.id]?.toString() || ''}
          />
        ))}
      </>
    );
  };

  return (
    <div className="my-fridge-view">
      <Header title="Add product" onLogout={goBack} buttonText="Go back" />
      <div className="controls-wrapper">
        <InputComponent placeholder="Search input" type="text" classElem="login" />
        <ButtonComponent text="Sort" onClick={goBack} classElem="big-silent" />
      </div>
      <ListPanelComponent variant="blank" label="Nazwa" children={<FoodItems />} />
      <div className="button-container-fridge">
        <ButtonComponent text="Cancel" onClick={goBack} classElem="big-silent" />
        <ButtonComponent text="Confirm" onClick={goBack} classElem="big-normal" />
      </div>
    </div>
  );
};

export default AddFromListView;

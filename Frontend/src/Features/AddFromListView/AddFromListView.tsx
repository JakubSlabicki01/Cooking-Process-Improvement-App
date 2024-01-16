// AddFromListView.tsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/HeaderComponent';
import InputComponent from '../../Components/InputComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import ListPanelComponent from '../../Components/ListPanelComponent';
import Itembar from '../../Components/ItembarComponent';
import API from '../../Api'; // Import your API configuration
import './AddFromListView.css';
import FoodItemContext from '../../Contexts/FoodItemContext';
import FridgeItemContext from '../../Contexts/FridgeItemContext';
import RadioInputComponent from '../../Components/RadioInputComponent';


interface QuantityMap {
  [key: string]: number;
}

const AddFromListView = () => {
  const { foodItems } = useContext(FoodItemContext);
  const { fridgeItems, setFridgeItems } = useContext(FridgeItemContext);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({}); // Track quantities by item ID
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");
  const [showSortOptions, setShowSortOptions] = useState(false); // State to track visibility of the sort options

  const handleSortButtonClick = () => {
    setShowSortOptions(!showSortOptions); // Toggle visibility of sort options
  };

  

  const handleSortChange = (selectedValue: string) => {
    setSortCriteria(selectedValue); // Update the sort criteria state
    };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // Update the searchTerm state on input change
  };

  const handleAddToFridge = async (itemId: number, addedQuantity: number) => {
    const existingFridgeItem = fridgeItems.find(item => item.food_item_id === itemId);

    if (existingFridgeItem) {
      // If the item is already in the fridge, update its quantity
      const updatedQuantity = existingFridgeItem.quantity + addedQuantity;
      await API.put(`/api/my-fridge`, { quantity: updatedQuantity });
    } else {
      // If the item is not in the fridge, add it as a new item
      await API.post('/api/my-fridge', { food_item_id: itemId, quantity: addedQuantity });
    }

    // After successful update, fetch the latest fridge items
    // Alternatively, optimistically update the context without fetching
    const updatedFridgeItems = await API.get('/api/my-fridge');
    setFridgeItems(updatedFridgeItems.data);
  };




  // Function to update the quantity state
  const updateQuantity = (itemId: number, newQuantity: number) => {
    setQuantities({ ...quantities, [itemId]: newQuantity });
  };

  const goBack = () => {
    navigate(-1);
  };

  const filteredFoodItems = foodItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const getSortedItems = (quantityMap: QuantityMap) => {
    return filteredFoodItems.sort((a, b) => {
      switch (sortCriteria) {
        case "Name":
          return a.name.localeCompare(b.name);
        case "Quantity":
          return quantityMap[b.name] - quantityMap[a.name];
        case "Expires in":
          // Assuming expiryDate is a number of days
          return a.spoilage_days - b.spoilage_days;
        default:
          return 0;
      }
    });
  };
  const FoodItems = () => {
    // Create a map to hold the summed quantities for each item name
    const quantityMap: QuantityMap = fridgeItems.reduce((acc, item) => {
      acc[item.name] = (acc[item.name] || 0) + item.quantity;
      return acc;
    }, {} as QuantityMap);

    const sortedFoodItems = getSortedItems(quantityMap);

    return (
      <>
        {sortedFoodItems.map((item) => {
          // Get the summed quantity for the item from the map
          const currentQuantity = quantityMap[item.name] || 0;

          return (
            <Itembar
              key={item.id}
              variant="big-add"
              itemName={item.name}
              quantity={currentQuantity}
              expiryDate={`${item.spoilage_days}`}
              icon={item.icon_url}
              onAction={() => handleAddToFridge(item.id, quantities[item.id] || 1)}
              onQuantityChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
              quantityValue={quantities[item.id]?.toString() || ''}
            />
          );
        })}
      </>
    );
  };


  return (
    <div className="my-fridge-view">
      <Header title="Add product" onLogout={goBack} buttonText="Go back" />
      <div className="controls-wrapper">
        <InputComponent placeholder="Search input" type="text" classElem="login" onChange={handleSearchChange} />
        <ButtonComponent text='Sort' onClick={handleSortButtonClick} classElem='big-silent' />
        {showSortOptions && <RadioInputComponent names={["Name", "Quantity", "Expires in"]} onChange={handleSortChange} />}
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

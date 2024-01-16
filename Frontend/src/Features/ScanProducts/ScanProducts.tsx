// MyFridgeView.tsx
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/HeaderComponent';
import InputComponent from '../../Components/InputComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import ListPanelComponent from '../../Components/ListPanelComponent';
import './ScanProducts.css';
import Itembar from '../../Components/ItembarComponent';
import { QuestionCircle } from 'react-bootstrap-icons';
import API from '../../Api';
import { checkImage, ResolvedIcons } from '../../Contexts/CheckImage';
import FridgeItemContext from '../../Contexts/FridgeItemContext';
import RecipeContext from '../../Contexts/RecipeContext';
import { all } from 'axios';
import FoodItemContext from '../../Contexts/FoodItemContext';
import { isUndefined } from 'lodash';

type FoodItem = {
  spoilage_days: any;
  id: number;
  name: string;
  quantity: number;
  expiryDate: number;
  icon_url: string; // Assuming you have a field for icon URL
};

interface QuantityMap {
  [key: string]: number;
}


const ScanProducts = () => {
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();
  const {recognizedItems, setRecognizedItems} = useContext(FoodItemContext)
  const [resolvedIcons, setResolvedIcons] = useState<ResolvedIcons>({});
  const { fridgeItems, setFridgeItems } = useContext(FridgeItemContext);
  const { recipes } = useContext(RecipeContext);
  const username = localStorage.getItem('username') || 'user';
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [itemId]: newQuantity,
    }));
  };

  const handleImageUrlChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setImageUrl(event.target.value);
  };

  const getAvailableRecipes = () => {
    const allAvailableItems = [...recognizedItems, ...fridgeItems.map(item => ({ name: item.name }))];
    
  
    // Filter recipes based on whether all ingredients are in the available items
    return recipes.filter(recipe => {
      return recipe.ingredients.every((ingredient: { name: string; }) => 
        allAvailableItems.some(item => item.name === ingredient.name)
      );
    });
  };

  const updateQuantity = (itemId: number, newQuantity: number) => {
    setQuantities({ ...quantities, [itemId]: newQuantity });
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
  

  const handleShowRecipesClick = () => {
    const availableRecipes = getAvailableRecipes();
    console.log(availableRecipes)
    navigate(`/${username}/recipe-list`, { state: { availableRecipes } });
  };

  
  useEffect(() => {
      recognizedItems.forEach(item => {
        const imageUrl = item.icon_url ? item.icon_url : `http://localhost:5000/static/icons/${item.name}.png`;
        checkImage(imageUrl).then(exists => {
          setResolvedIcons(prev => ({ ...prev, [item.name]: exists ? imageUrl : <QuestionCircle color="#479F76" /> }));
        });
      });
    
  }, [recognizedItems]);

  const handleImageSubmit = async () => {
    try {
      const response = await API.post('/api/gpt-image', { img_url: imageUrl });
      setRecognizedItems(response.data); // Assuming response.data is the array of items with details
    } catch (error) {
      console.error('Error submitting image:', error);
    }
  };

  const FridgeContent = () => {
    const quantityMap: QuantityMap = fridgeItems.reduce((acc, item) => {
      acc[item.name] = (acc[item.name] || 0) + item.quantity;
      return acc;
    }, {} as QuantityMap);

    console.log(recognizedItems)
  
    // Check if recognizedItems is empty
    if (recognizedItems.length === 0) {
      return <div>No items recognized yet.</div>; // Replace with your placeholder content
    }

    return (
      <div>
        {recognizedItems.map((item) => {
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
      </div>
    );
  };

  const goBack = () => {
    navigate(-1);
  };

  function goToMyFridge(): void {
    navigate(`/${username}/my-fridge`);
  }

  return (
    <div className="scan-products-view">
      <Header title="My Fridge" onLogout={() => navigate(-1)} buttonText='Go back' />
      <div className="controls-wrapper">
        <InputComponent placeholder="Enter image URL" type='text' classElem='login' value={imageUrl} onChange={handleImageUrlChange} />
        <ButtonComponent text='Analyze Image' onClick={handleImageSubmit} classElem='big-silent' />
      </div>
      <ListPanelComponent variant='blank' label='Recognized items' children={<FridgeContent />} />
      <div className="button-container-fridge">
        <ButtonComponent text={"Show recipes"} onClick={handleShowRecipesClick} classElem="big-silent" />
        <ButtonComponent text={"Go to my fridge"} onClick={goToMyFridge} classElem="big-normal" />
      </div>
    </div>
  );
};

export default ScanProducts;

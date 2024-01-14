// MyFridgeView.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/HeaderComponent';
import InputComponent from '../../Components/InputComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import ListPanelComponent from '../../Components/ListPanelComponent';
import './TasteMatching.css';
import Itembar from '../../Components/ItembarComponent';
import { Apple } from 'react-bootstrap-icons';
import ItemWidgetComponent from '../../Components/ItemWidgetComponent';
import { JSX } from 'react/jsx-runtime';
import API from '../../Api';

// Define a type for your food items
type FoodItem = {
  id: number;
  name: string;
  icon_url: string; // Assuming you have a field for icon URL
};

const TasteMatching = () => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'user';

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await API.get('/api/food-items');
        setFoodItems(response.data);
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };
    fetchFoodItems();
  }, []);
  
  const goBack = () => {
    navigate(-1);
  };

  const handleClick = (icon_url: string, label: string) => () => {
    localStorage.setItem('label', label);
    localStorage.setItem('icon_url', icon_url);
    navigate(`/${username}/chosen-product`);
  };

const FridgeContent = () => {
    return (
      <div className="fridge-content">
        {foodItems.map((item) => (
          <ItemWidgetComponent 
            key={item.id} // Replace 'id' with the unique identifier of the item
            icon={item.icon_url} // Replace with appropriate icon
            label={item.name} // Replace 'name' with the property that holds the item's name
            onClick={handleClick(item.icon_url, item.name)}
          />
        ))}
      </div>
    );
  };
      


  return (
    <div className="taste-matching-view">
      <Header title="Taste Matching" onLogout={goBack} buttonText='Go back'/>
      <div className="controls-wrapper">
        <InputComponent placeholder="Search input" type='text' classElem='login' />
        <ButtonComponent text='Sort' onClick={goBack} classElem='big-silent' />
      </div>
      <ListPanelComponent variant='blank' label='List of porducts' children={<FridgeContent/>} />
      
    </div>
  );
};

export default TasteMatching;

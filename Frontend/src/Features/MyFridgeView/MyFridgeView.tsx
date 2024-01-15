import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/HeaderComponent';
import InputComponent from '../../Components/InputComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import ListPanelComponent from '../../Components/ListPanelComponent';
import Itembar from '../../Components/ItembarComponent';
import API from '../../Api';
import './MyFridgeView.css';
import FoodItemContext from '../../Contexts/FoodItemContext';
import FridgeItemContext from '../../Contexts/FridgeItemContext';



const MyFridgeView = () => {
  const navigate = useNavigate();
  //const { foodItems, setFoodItems } = useContext(FoodItemContext);
  const { fridgeItems, setFridgeItems } = useContext(FridgeItemContext);

  const handleDelete = async (itemId: number) => {
    console.log("Deleting item with ID:", itemId); // Add this line for debugging

    try {
        const response = await API.delete(`/api/my-fridge/${itemId}`);
        console.log("Delete response:", response); // Check the response
        setFridgeItems(currentItems => currentItems.filter(item => item.fridge_item_id !== itemId));
    } catch (error) {
        console.error('Error deleting item:', error);
    }
};


  const username = localStorage.getItem('username') || 'user';
  
  const FridgeContent = () => {
    return (
      <>
        {fridgeItems.map((item) => (
          <Itembar
            key={item.fridge_item_id}
            variant="big"
            itemName={item.name}
            quantity={item.quantity}
            addedDate={item.addedDate}
            expiryDate={item.expiryDate}
            icon={item.icon_url}
            onAction={() => handleDelete(item.fridge_item_id)}
          />
        ))}
      </>
    );
  };
  
  const goBack = () => {
    navigate(-1);
  };

  function goToAdd(): void {
    navigate(`/${username}/add`);
  }

  function goToScan(): void {
    navigate(`/${username}/scan`)
  }

  return (
    <div className="my-fridge-view">
      <Header title="My Fridge" onLogout={goBack} buttonText='Go back'/>
      <div className="controls-wrapper">
        <InputComponent placeholder="Search input" type='text' classElem='login' />
        <ButtonComponent text='Sort' onClick={goBack} classElem='big-silent' />
      </div>
      <ListPanelComponent variant='blank' label='My items' children={<FridgeContent/>} />
      <div className="button-container-fridge">
      <ButtonComponent text={"Scan"} onClick={goToScan} classElem="big-silent"/>
      <ButtonComponent text={"Add"} onClick={goToAdd} classElem="big-normal"/>
      </div>
    </div>
  );
};

export default MyFridgeView;

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
import RadioInputComponent from '../../Components/RadioInputComponent';



const MyFridgeView = () => {
  const navigate = useNavigate();
  //const { foodItems, setFoodItems } = useContext(FoodItemContext);
  const { fridgeItems, setFridgeItems } = useContext(FridgeItemContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");
  const [showSortOptions, setShowSortOptions] = useState(false); // State to track visibility of the sort options

  const handleSortButtonClick = () => {
    setShowSortOptions(!showSortOptions); // Toggle visibility of sort options
  };

  const getSortedItems = () => {
    return filteredFridgeItems.sort((a, b) => {
      switch (sortCriteria) {
        case "Name":
          return a.name.localeCompare(b.name);
        case "Quantity":
          return a.quantity - b.quantity;
        case "Added at":
          // Assuming addedDate is in 'YYYY-MM-DD' format
          return new Date(a.addedDate).getTime() - new Date(b.addedDate).getTime();
        case "Expires in":
          // Assuming expiryDate is a number of days
          return parseInt(a.expiryDate) - parseInt(b.expiryDate);
        default:
          return 0;
      }
    });
  };

  const handleSortChange = (selectedValue: string) => {
    setSortCriteria(selectedValue); // Update the sort criteria state
    };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // Update the searchTerm state on input change
  };

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

  const filteredFridgeItems = fridgeItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  const FridgeContent = () => {
    const sortedFridgeItems = getSortedItems();
    return (
      <>
        {sortedFridgeItems.map((item) => (
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
        <InputComponent placeholder="Search input" type='text' classElem='login' onChange={handleSearchChange} />
        <ButtonComponent text='Sort' onClick={handleSortButtonClick} classElem='big-silent' />
        {showSortOptions && <RadioInputComponent names={["Name", "Quantity", "Added at", "Expires in"]} onChange={handleSortChange} />}
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

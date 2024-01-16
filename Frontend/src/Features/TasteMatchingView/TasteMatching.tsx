// MyFridgeView.tsx
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/HeaderComponent';
import InputComponent from '../../Components/InputComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import ListPanelComponent from '../../Components/ListPanelComponent';
import './TasteMatching.css';
import ItemWidgetComponent from '../../Components/ItemWidgetComponent';
import FoodItemContext from '../../Contexts/FoodItemContext';
import RadioInputComponent from '../../Components/RadioInputComponent';


const TasteMatching = () => {
  //const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const { foodItems } = useContext(FoodItemContext);
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'user';
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



  const goBack = () => {
    navigate(-1);
  };

  const handleClick = (icon_url: string, label: string) => () => {
    localStorage.setItem('label', label);
    localStorage.setItem('icon_url', icon_url);
    navigate(`/${username}/chosen-product`);
  };

  const filteredFoodItems = foodItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const FridgeContent = () => {
    const sortedFoodItems = filteredFoodItems.sort((a, b) => a.name.localeCompare(b.name));


    return (
      <div className="fridge-content">
        {sortedFoodItems.map((item) => (
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
      <Header title="Taste Matching" onLogout={goBack} buttonText='Go back' />
      <div className="controls-wrapper">
        <InputComponent placeholder="Search input" type='text' classElem='login' onChange={handleSearchChange} />
        <ButtonComponent text='Sort' onClick={handleSortButtonClick} classElem='big-silent' />
        {showSortOptions && <RadioInputComponent names={["Name"]} onChange={handleSortChange} />}
      </div>
      <ListPanelComponent variant='blank' label='List of porducts' children={<FridgeContent />} />

    </div>
  );
};

export default TasteMatching;

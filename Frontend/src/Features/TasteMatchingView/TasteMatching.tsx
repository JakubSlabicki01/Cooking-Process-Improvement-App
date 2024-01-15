// MyFridgeView.tsx
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/HeaderComponent';
import InputComponent from '../../Components/InputComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import ListPanelComponent from '../../Components/ListPanelComponent';
import './TasteMatching.css';
import ItemWidgetComponent from '../../Components/ItemWidgetComponent';
import FoodItemContext from '../../Contexts/FoodItemContext';


const TasteMatching = () => {
  //const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const { foodItems } = useContext(FoodItemContext);
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'user';


  
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

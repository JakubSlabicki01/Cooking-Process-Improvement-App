// MyFridgeView.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/HeaderComponent';
import ListPanelComponent from '../../Components/ListPanelComponent';
import './TasteMatching.css';
import ItemWidgetComponent from '../../Components/ItemWidgetComponent';
import API from '../../Api';


type SuggestionWidget = {
  name: string;
  icon_url: string;
};

const ChosenProductView = () => {

  const [suggestions, setSuggestions] = useState<SuggestionWidget[]>([]);
  const navigate = useNavigate();
  const label = localStorage.getItem('label') || '';
  const icon_url = localStorage.getItem('icon_url') || '';


  const SuggestionContent = () => {
    return (
      <div className="fridge-content">
        {suggestions.map((item,index) => (
          <ItemWidgetComponent  // Replace 'id' with the unique identifier of the item
            key={index}
            icon={item.icon_url ? item.icon_url : null}
            label={item.name} // Replace 'name' with the property that holds the item's name
          />
        ))}
      </div>
    );
  };
      

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await API.post('/api/ask-gpt', { label });
        setSuggestions(response.data.items);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    if (label) {
      fetchSuggestions();
    }
  }, []);



  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="taste-matching-view">
      <Header title="Taste Matching" onLogout={goBack} buttonText='Go back' />
      <div className='item-widget-container'>
        <ItemWidgetComponent icon={icon_url} label={label} />
      </div>
      <ListPanelComponent variant='blank' label='Matched products' children={<SuggestionContent/>}
      />

    </div>
  );
};

export default ChosenProductView;

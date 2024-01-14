// MyFridgeView.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/HeaderComponent';
import InputComponent from '../../Components/InputComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import ListPanelComponent from '../../Components/ListPanelComponent';
import './ScanProducts.css';
import Itembar from '../../Components/ItembarComponent';
import { Apple } from 'react-bootstrap-icons';
import API from '../../Api';

type FoodItem = {
  spoilage_days: any;
  id: number;
  name: string;
  quantity: number;
  expiryDate: number;
  icon_url: string; // Assuming you have a field for icon URL
};

const ScanProducts = () => {
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();
  const [recognizedItems, setRecognizedItems] = useState<FoodItem[]>([]);

  const handleImageUrlChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setImageUrl(event.target.value);
  };

  const handleImageSubmit = async () => {
    try {
      const response = await API.post('/api/gpt-image', { img_url: imageUrl });
      setRecognizedItems(response.data); // Assuming response.data is the array of items with details
      console.log(response.data.recognized_items);
    } catch (error) {
      console.error('Error submitting image:', error);
    }
  };

  const FridgeContent = () => {
    return (
      <div>
        {recognizedItems.map((item, index) => (
          <Itembar
            key={index}
            variant="big-add"
            itemName={item.name}
            quantity={item.quantity ? item.quantity : 0}
            expiryDate={item.spoilage_days ? item.spoilage_days : `?`}
            icon={item.icon_url ? item.icon_url : <Apple color="#479F76" />}
            onAction={goBack}
          />
        ))}
      </div>
    );
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="scan-products-view">
      <Header title="My Fridge" onLogout={() => navigate(-1)} buttonText='Go back' />
      <div className="controls-wrapper">
        <InputComponent placeholder="Enter image URL" type='text' classElem='login' value={imageUrl} onChange={handleImageUrlChange} />
        <ButtonComponent text='Analyze Image' onClick={handleImageSubmit} classElem='big-silent' />
      </div>
      <ListPanelComponent variant='blank' label='Recognized items' children={<FridgeContent />} />
      <div className="button-container-fridge">
        <ButtonComponent text={"Show recipes"} onClick={goBack} classElem="big-silent" />
        <ButtonComponent text={"Add to my fridge"} onClick={goBack} classElem="big-normal" />
      </div>
    </div>
  );
};

export default ScanProducts;

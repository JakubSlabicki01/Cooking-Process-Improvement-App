// MyFridgeView.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/HeaderComponent';
import InputComponent from '../../Components/InputComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import ListPanelComponent from '../../Components/ListPanelComponent';
import './ScanProducts.css';
import Itembar from '../../Components/ItembarComponent';
import { Apple } from 'react-bootstrap-icons';

const ScanProducts = () => {

    const FridgeContent = () => {
        return (
          <div>
            <Itembar variant="big-add" itemName="Item 1" quantity={2} expiryDate='10 days' icon={<Apple color="#479F76"/>} onAction={goBack} />
            <Itembar variant="big-add" itemName="Item 1" quantity={2} expiryDate='10 days' icon={<Apple color="#479F76"/>} onAction={goBack} />
            <Itembar variant="big-add" itemName="Item 1" quantity={2} expiryDate='10 days' icon={<Apple color="#479F76"/>} onAction={goBack} />
            <Itembar variant="big-add" itemName="Item 1" quantity={2} expiryDate='10 days' icon={<Apple color="#479F76"/>} onAction={goBack} />
            <Itembar variant="big-add" itemName="Item 1" quantity={2} expiryDate='10 days' icon={<Apple color="#479F76"/>} onAction={goBack} />
            <Itembar variant="big-add" itemName="Item 1" quantity={2} expiryDate='10 days' icon={<Apple color="#479F76"/>} onAction={goBack} />
            <Itembar variant="big-add" itemName="Item 1" quantity={2} expiryDate='10 days' icon={<Apple color="#479F76"/>} onAction={goBack} />
            <Itembar variant="big-add" itemName="Item 1" quantity={2} expiryDate='10 days' icon={<Apple color="#479F76"/>} onAction={goBack} />
          </div>
        );
      };
      
  const navigate = useNavigate();
  
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="scan-products-view">
      <Header title="My Fridge" onLogout={goBack} />
      <div className="controls-wrapper">
        <InputComponent placeholder="Upload a picture" type='login' classElem='login' />
        <ButtonComponent text='Take a picture' onClick={goBack} classElem='big-silent' />
      </div>
      <ListPanelComponent variant='expiry' label='Nazwa' children={<FridgeContent/>} />
      <div className="button-container-fridge">
      <ButtonComponent text={"Show recipes"} onClick={goBack} classElem="big-silent"/>
      <ButtonComponent text={"Add to my fridge"} onClick={goBack} classElem="big-normal"/>
      </div>
    </div>
  );
};

export default ScanProducts;

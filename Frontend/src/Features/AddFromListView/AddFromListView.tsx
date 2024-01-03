// MyFridgeView.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/HeaderComponent';
import InputComponent from '../../Components/InputComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import ListPanelComponent from '../../Components/ListPanelComponent';
import './AddFromListView.css';
import Itembar from '../../Components/ItembarComponent';
import { Apple } from 'react-bootstrap-icons';

const AddFromListView = () => {

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
    <div className="my-fridge-view">
      <Header title="My Fridge" onLogout={goBack} />
      <div className="controls-wrapper">
        <InputComponent placeholder="Search input" type='login' classElem='login' />
        <ButtonComponent text='Sort' onClick={goBack} classElem='big-silent' />
      </div>
      <ListPanelComponent variant='expiry' label='Nazwa' children={<FridgeContent/>} />
      <div className="button-container-fridge">
      <ButtonComponent text={"Cancel"} onClick={goBack} classElem="big-silent"/>
      <ButtonComponent text={"Confrim"} onClick={goBack} classElem="big-normal"/>
      </div>
    </div>
  );
};

export default AddFromListView;

// MyFridgeView.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/HeaderComponent';
import InputComponent from '../../Components/InputComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import ListPanelComponent from '../../Components/ListPanelComponent';
import './MyFridgeView.css';
import Itembar from '../../Components/ItembarComponent';
import { Apple } from 'react-bootstrap-icons';

const MyFridgeView = () => {

    const FridgeContent = () => {
        return (
          <div>
            <Itembar variant="big" itemName="Item 1" quantity={2} addedDate="10/10/2023" expiryDate="20/10/2023" icon={<Apple color="#479F76"/>} onAction={goBack} />
            <Itembar variant="big" itemName="Item 1" quantity={2} addedDate="10/10/2023" expiryDate="20/10/2023" icon={<Apple color="#479F76"/>} onAction={goBack} />
            <Itembar variant="big" itemName="Item 1" quantity={2} addedDate="10/10/2023" expiryDate="20/10/2023" icon={<Apple color="#479F76"/>} onAction={goBack} />
            <Itembar variant="big" itemName="Item 1" quantity={2} addedDate="10/10/2023" expiryDate="20/10/2023" icon={<Apple color="#479F76"/>} onAction={goBack} />
            <Itembar variant="big" itemName="Item 1" quantity={2} addedDate="10/10/2023" expiryDate="20/10/2023" icon={<Apple color="#479F76"/>} onAction={goBack} />
            <Itembar variant="big" itemName="Item 1" quantity={2} addedDate="10/10/2023" expiryDate="20/10/2023" icon={<Apple color="#479F76"/>} onAction={goBack} />
          </div>
        );
      };
      
  const navigate = useNavigate();
  
  const goBack = () => {
    navigate(-1);
  };

  function goToAdd(): void {
    navigate('/add');
  }

  function goToScan(): void {
    navigate('/scan')
  }

  return (
    <div className="my-fridge-view">
      <Header title="My Fridge" onLogout={goBack} />
      <div className="controls-wrapper">
        <InputComponent placeholder="Search input" type='login' classElem='login' />
        <ButtonComponent text='Sort' onClick={goBack} classElem='big-silent' />
      </div>
      <ListPanelComponent variant='default' label='Nazwa' children={<FridgeContent/>} />
      <div className="button-container-fridge">
      <ButtonComponent text={"Scan"} onClick={goToScan} classElem="big-silent"/>
      <ButtonComponent text={"Add"} onClick={goToAdd} classElem="big-normal"/>
      </div>
    </div>
  );
};

export default MyFridgeView;

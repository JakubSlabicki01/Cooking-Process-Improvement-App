// MyFridgeView.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/HeaderComponent';
import InputComponent from '../../Components/InputComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import ListPanelComponent from '../../Components/ListPanelComponent';
import './TasteMatching.css';
import Itembar from '../../Components/ItembarComponent';
import { Apple } from 'react-bootstrap-icons';
import ItemWidgetComponent from '../../Components/ItemWidgetComponent';

const TasteMatching = () => {

    const FridgeContent = () => {
        return (
          <div>
            <ItemWidgetComponent icon={<Apple color="#479F76"/>} label="Apple"/>
            <ItemWidgetComponent icon={<Apple color="#479F76"/>} label="Apple"/>
            <ItemWidgetComponent icon={<Apple color="#479F76"/>} label="Apple"/>
            <ItemWidgetComponent icon={<Apple color="#479F76"/>} label="Apple"/>
            <ItemWidgetComponent icon={<Apple color="#479F76"/>} label="Apple"/>
            <ItemWidgetComponent icon={<Apple color="#479F76"/>} label="Apple"/>
            <ItemWidgetComponent icon={<Apple color="#479F76"/>} label="Apple"/>
          </div>
        );
      };
      
  const navigate = useNavigate();
  
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="taste-matching-view">
      <Header title="Taste Matching" onLogout={goBack} />
      <div className="controls-wrapper">
        <InputComponent placeholder="Search input" type='login' classElem='login' />
        <ButtonComponent text='Sort' onClick={goBack} classElem='big-silent' />
      </div>
      <ListPanelComponent variant='blank' label='Nazwa' children={<FridgeContent/>} />
      <div className="button-container-fridge">
      <ButtonComponent text={"Cancel"} onClick={goBack} classElem="big-silent"/>
      <ButtonComponent text={"Confrim"} onClick={goBack} classElem="big-normal"/>
      </div>
    </div>
  );
};

export default TasteMatching;

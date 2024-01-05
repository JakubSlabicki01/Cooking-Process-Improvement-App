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
import { JSX } from 'react/jsx-runtime';

const TasteMatching = () => {

  const navigate = useNavigate();
  
  const goBack = () => {
    navigate(-1);
  };

  const handleClick = (iconName: string, label: string) => () => {
    navigate('/chosen-product', { state: { iconName, label } });
  };

    const FridgeContent = () => {
        return (
          <div className="fridge-content">
            <ItemWidgetComponent icon={<Apple color="#479F76"/>} label="Apple" onClick={handleClick('apple', "Apple")}/>
            <ItemWidgetComponent icon={<Apple color="#479F76"/>} label="Apple" onClick={handleClick('apple', "Apple")}/>
            <ItemWidgetComponent icon={<Apple color="#479F76"/>} label="Apple" onClick={handleClick('apple', "Apple")}/>
            

          </div>
        );
      };
      


  return (
    <div className="taste-matching-view">
      <Header title="Taste Matching" onLogout={goBack} buttonText='Go back'/>
      <div className="controls-wrapper">
        <InputComponent placeholder="Search input" type='login' classElem='login' />
        <ButtonComponent text='Sort' onClick={goBack} classElem='big-silent' />
      </div>
      <ListPanelComponent variant='blank' label='List of porducts' children={<FridgeContent/>} />
      
    </div>
  );
};

export default TasteMatching;

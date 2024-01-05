// MyFridgeView.tsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../Components/HeaderComponent';
import InputComponent from '../../Components/InputComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import ListPanelComponent from '../../Components/ListPanelComponent';
import './TasteMatching.css';
import Itembar from '../../Components/ItembarComponent';
import { Apple } from 'react-bootstrap-icons';
import ItemWidgetComponent from '../../Components/ItemWidgetComponent';

const TasteMatching = () => {

    const location = useLocation();
    const { iconName, label } = location.state || {}; // Retrieve state passed during navigation
    
    const renderIcon = (iconName: any) => {
        switch(iconName) {
          case 'apple':
            return <Apple color="#479F76" />;
          // add cases for other icons
          default:
            return null;
        }
      };

    const FridgeContent = () => {
        return (
          <div className="fridge-content">
            <ItemWidgetComponent icon={<Apple color="#479F76"/>} label="Apple" onClick={() => console.log('Widget clicked')}/>
            <ItemWidgetComponent icon={<Apple color="#479F76"/>} label="Apple"onClick={() => console.log('Widget clicked')}/>
            <ItemWidgetComponent icon={<Apple color="#479F76"/>} label="Apple"onClick={() => console.log('Widget clicked')}/>
            <ItemWidgetComponent icon={<Apple color="#479F76"/>} label="Apple" onClick={() => console.log('Widget clicked')}/>
            <ItemWidgetComponent icon={<Apple color="#479F76"/>} label="Apple"onClick={() => console.log('Widget clicked')}/>
            <ItemWidgetComponent icon={<Apple color="#479F76"/>} label="Apple"onClick={() => console.log('Widget clicked')}/>
            <ItemWidgetComponent icon={<Apple color="#479F76"/>} label="Apple" onClick={() => console.log('Widget clicked')}/>
            <ItemWidgetComponent icon={<Apple color="#479F76"/>} label="Apple"onClick={() => console.log('Widget clicked')}/>
            <ItemWidgetComponent icon={<Apple color="#479F76"/>} label="Apple"onClick={() => console.log('Widget clicked')}/>
            <ItemWidgetComponent icon={<Apple color="#479F76"/>} label="Apple" onClick={() => console.log('Widget clicked')}/>
            <ItemWidgetComponent icon={<Apple color="#479F76"/>} label="Apple"onClick={() => console.log('Widget clicked')}/>
            <ItemWidgetComponent icon={<Apple color="#479F76"/>} label="Apple"onClick={() => console.log('Widget clicked')}/>
            <ItemWidgetComponent icon={<Apple color="#479F76"/>} label="Apple" onClick={() => console.log('Widget clicked')}/>
            <ItemWidgetComponent icon={<Apple color="#479F76"/>} label="Apple"onClick={() => console.log('Widget clicked')}/>
            <ItemWidgetComponent icon={<Apple color="#479F76"/>} label="Apple"onClick={() => console.log('Widget clicked')}/>
            <ItemWidgetComponent icon={<Apple color="#479F76"/>} label="Apple" onClick={() => console.log('Widget clicked')}/>
            <ItemWidgetComponent icon={<Apple color="#479F76"/>} label="Apple"onClick={() => console.log('Widget clicked')}/>
            <ItemWidgetComponent icon={<Apple color="#479F76"/>} label="Apple"onClick={() => console.log('Widget clicked')}/>
            <ItemWidgetComponent icon={<Apple color="#479F76"/>} label="Apple" onClick={() => console.log('Widget clicked')}/>
            <ItemWidgetComponent icon={<Apple color="#479F76"/>} label="Apple"onClick={() => console.log('Widget clicked')}/>
            <ItemWidgetComponent icon={<Apple color="#479F76"/>} label="Apple"onClick={() => console.log('Widget clicked')}/>
            <ItemWidgetComponent icon={<Apple color="#479F76"/>} label="Apple" onClick={() => console.log('Widget clicked')}/>
            <ItemWidgetComponent icon={<Apple color="#479F76"/>} label="Apple"onClick={() => console.log('Widget clicked')}/>
            <ItemWidgetComponent icon={<Apple color="#479F76"/>} label="Apple"onClick={() => console.log('Widget clicked')}/>
            <ItemWidgetComponent icon={<Apple color="#479F76"/>} label="Apple" onClick={() => console.log('Widget clicked')}/>
            <ItemWidgetComponent icon={<Apple color="#479F76"/>} label="Apple"onClick={() => console.log('Widget clicked')}/>
            <ItemWidgetComponent icon={<Apple color="#479F76"/>} label="Apple"onClick={() => console.log('Widget clicked')}/>

          </div>
        );
      };
      
  const navigate = useNavigate();
  
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="taste-matching-view">
      <Header title="Taste Matching" onLogout={goBack} buttonText='Go back' />
      <div className='item-widget-container'>
      <ItemWidgetComponent icon={renderIcon(iconName)} label={label}/>
      </div>
      <ListPanelComponent variant='blank' label='List of porducts' children={<FridgeContent/>} />
      
    </div>
  );
};

export default TasteMatching;

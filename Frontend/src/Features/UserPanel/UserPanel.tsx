import React from 'react';
import Widget from '../../Components/WidgetComponent';
import Header from '../../Components/HeaderComponent';
import './UserPanel.css'; // Make sure the CSS file is imported
import { useNavigate } from 'react-router-dom';
import settingsIcon from '../../images/icons/settingsIcon.png';
import { CameraFill } from 'react-bootstrap-icons';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import {StarFill} from 'react-bootstrap-icons'
import {GearFill} from 'react-bootstrap-icons'
import {Book} from 'react-bootstrap-icons'
import {PuzzleFill} from "react-bootstrap-icons"
import Itembar from '../../Components/ItembarComponent';
import { Apple } from 'react-bootstrap-icons'; // Import a specific icon from a library
import RecipeBar from '../../Components/RecipeBarComponent';
import backgroundImage from '../../images/background.png';


const Fridge = () => {
  return (
    <CIcon icon={icon.cilFridge} size="xxl"/>
  )
}

const FridgeContent = () => {
  return (
    <div>
    <Itembar variant='small' itemName='Jabłko' expiryDate='20/20/2023' icon={<Apple color="#479F76"/>}/>
    <Itembar variant='small' itemName='Jabłko' expiryDate='20/20/2023' icon={<Apple color="#479F76"/>}/>
    <Itembar variant='small' itemName='Jabłko' expiryDate='20/20/2023' icon={<Apple color="#479F76"/>}/>
    <Itembar variant='small' itemName='Jabłko' expiryDate='20/20/2023' icon={<Apple color="#479F76"/>}/>
    <Itembar variant='small' itemName='Jabłko' expiryDate='20/20/2023' icon={<Apple color="#479F76"/>}/>
    <Itembar variant='small' itemName='Jabłko' expiryDate='20/20/2023' icon={<Apple color="#479F76"/>}/>
    <Itembar variant='small' itemName='Jabłko' expiryDate='20/20/2023' icon={<Apple color="#479F76"/>}/>
    </div>
  );
};

const Image = () => {
  return (
    <img src={backgroundImage} alt='Image'/>
  )
}
const RecipeContent = () => {
  return (
    <div>
    <RecipeBar recipeName='Nazwa przepisu' icon={<Image/>}/>
    <RecipeBar recipeName='Nazwa przepisu' icon={<Image/>}/>
    <RecipeBar recipeName='Nazwa przepisu' icon={<Image/>}/>
    <RecipeBar recipeName='Nazwa przepisu' icon={<Image/>}/>
    <RecipeBar recipeName='Nazwa przepisu' icon={<Image/>}/>
    </div>
  );
};


const UserPanel = () => {

  const navigate = useNavigate(); // Hook for navigation
  const username = localStorage.getItem('username') || 'user';

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    navigate('/login'); // Redirect to login page
  };


  function goToMyfridge(): void {
    navigate(`/${username}/my-fridge`);
  }

  function goToScan(): void {
    navigate(`/${username}/scan`)
  }

  function goToTasteMatching(): void {
    navigate(`/${username}/match`)
  }

  function goToRecipeList(): void {
    navigate(`/${username}/recipe-list`)
  }

  function goToLikedRecipeList(): void {
    navigate(`/${username}/liked-recipes`)
  }

  function goToSettings(): void {
    navigate(`/${username}/settings`)
  }

  return (
    <div className="user-panel">
      <Header title={`Welcome ${username}`} onLogout={handleLogout} buttonText='Log out'/>
      <div className='widget-container'>
      
      <Widget variant="big-dark" title="My fridge" content={<FridgeContent /> } icon={<Fridge/>} onClick={goToMyfridge}  />

      <Widget variant="small-bright" title="Scan" icon={<CameraFill size={230} color="#479F76"/> } onClick={goToScan} />

      <Widget variant="small-dark" title="Taste matching" icon={<PuzzleFill size={230} color="white"/>} onClick={goToTasteMatching} />

      <Widget variant="small-dark" title="Recipes" icon={<Book size={230} color="white"/>} onClick={goToRecipeList} />

      <Widget variant="big-bright" title="Liked recipes" content={<RecipeContent />} icon={<StarFill size={30} color="#479F76"/>} onClick={goToLikedRecipeList} />

      <Widget variant="small-dark" title="Settings" icon={<GearFill size={230} color="white" />} onClick={goToSettings}/>

      </div>

      {/* More widgets as needed */}
    </div>
  );
};

export default UserPanel;

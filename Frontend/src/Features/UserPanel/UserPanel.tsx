import Widget from '../../Components/WidgetComponent';
import Header from '../../Components/HeaderComponent';
import './UserPanel.css'; // Make sure the CSS file is imported
import { useNavigate } from 'react-router-dom';
import { CameraFill } from 'react-bootstrap-icons';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import { StarFill } from 'react-bootstrap-icons'
import { GearFill } from 'react-bootstrap-icons'
import { Book } from 'react-bootstrap-icons'
import { PuzzleFill } from "react-bootstrap-icons"
import Itembar from '../../Components/ItembarComponent';
import RecipeBar from '../../Components/RecipeBarComponent';
import backgroundImage from '../../images/background.png';
import { useContext, useEffect } from 'react';
import API from '../../Api';
import FoodItemContext from '../../Contexts/FoodItemContext';
import FridgeItemContext from '../../Contexts/FridgeItemContext';
import RecipeContext from '../../Contexts/RecipeContext';
import LikedRecipeContext from '../../Contexts/LikedRecipeContext';

const Fridge = () => {
  return (
    <CIcon icon={icon.cilFridge} size="xxl" />
  )
}



const UserPanel = () => {

  const { foodItems, setFoodItems, setRecognizedItems } = useContext(FoodItemContext);
  const { fridgeItems, setFridgeItems } = useContext(FridgeItemContext);
  const { recipes, setRecipes } = useContext(RecipeContext);
  const { likedRecipes, setLikedRecipes } = useContext(LikedRecipeContext);

  const navigate = useNavigate(); // Hook for navigation
  const username = localStorage.getItem('username') || 'user';


  useEffect(() => {
    const fetchFridgeItems = async () => {
      // Fetch food items if not already loaded
      if (foodItems.length === 0) {
        try {
          const foodItemsResponse = await API.get('/api/food-items');
          setFoodItems(foodItemsResponse.data);
        } catch (error) {
          console.error('Error fetching food items:', error);
        }
      }

      // Fetch fridge items if not already loaded
      if (fridgeItems.length === 0) {
        try {
          const fridgeItemsResponse = await API.get('/api/my-fridge');
          setFridgeItems(fridgeItemsResponse.data);
        } catch (error) {
          console.error('Error fetching fridge items:', error);
        }
      }
    };

    const fetchRecipes = async () => {
      try {
        const response = await API.get('/api/recipes'); // Replace with your actual endpoint
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };


    const fetchLikedRecipes = async () => {
      try {
        const response = await API.get('/api/liked-recipes'); // Replace with your actual endpoint
        setLikedRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    if (recipes.length === 0) {
      fetchRecipes();
    }

    if (likedRecipes.length === 0) {
      fetchLikedRecipes();
    }

    fetchFridgeItems();
  }, [setFoodItems, setFridgeItems, setRecipes, setLikedRecipes]);

  const FridgeContent = () => {
    return (
      <>
        {fridgeItems.length > 0 ? (
          fridgeItems.map((item) => (
            <Itembar
              key={item.fridge_item_id}
              variant="small"
              itemName={item.name}
              expiryDate={item.expiryDate}
              icon={item.icon_url}
            />
          ))) : (
          <p><strong>Your fridge is empty!</strong></p>
        )}
      </>
    );
  };

  const RecipeContent = () => {
    // Filter recipes to include only those that are liked
    const likedRecipeList = recipes.filter(recipe =>
      likedRecipes.some(lr => lr.recipe_id === recipe.id)
    );

    return (
      <>
        {likedRecipeList.length > 0 ? (
          likedRecipeList.map((recipe) => (
            <RecipeBar
              key={recipe.id}
              recipeName={recipe.name}
              icon={recipe.image_url} // Or use a specific image if available
            />
          ))
        ) : (
          <p><strong>You haven't liked any recipes yet!</strong></p>
        )}
      </>
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    localStorage.removeItem('username'); // Remove the token from local storage
    localStorage.removeItem('user_id'); // Remove the token from local storage
    setFridgeItems([]);
    setLikedRecipes([]);
    setRecognizedItems([]);
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
      <Header title={`Welcome ${username}`} onLogout={handleLogout} buttonText='Log out' />
      <div className='widget-container'>

        <Widget variant="big-dark" title="My fridge" content={<FridgeContent />} icon={<Fridge />} onClick={goToMyfridge} />

        <Widget variant="small-bright" title="Scan" icon={<CameraFill size={230} color="#479F76" />} onClick={goToScan} />

        <Widget variant="small-dark" title="Taste matching" icon={<PuzzleFill size={230} color="white" />} onClick={goToTasteMatching} />

        <Widget variant="small-dark" title="Recipes" icon={<Book size={230} color="white" />} onClick={goToRecipeList} />

        <Widget variant="big-bright" title="Liked recipes" content={<RecipeContent />} icon={<StarFill size={30} color="#479F76" />} onClick={goToLikedRecipeList} />

        <Widget variant="small-dark" title="Settings" icon={<GearFill size={230} color="white" />} onClick={goToSettings} />

      </div>

      {/* More widgets as needed */}
    </div>
  );
};

export default UserPanel;

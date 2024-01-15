// MyFridgeView.tsx
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/HeaderComponent';
import InputComponent from '../../Components/InputComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import ListPanelComponent from '../../Components/ListPanelComponent';
import './LikedRecipeListView.css';
import RecipeBarBigComponent from '../../Components/RecipeBarBigComponent';
import backgroundImage from '../../images/background.png';
import { useContext, useState, useEffect } from 'react';
import { QuestionCircle } from 'react-bootstrap-icons';
import API from '../../Api';
import { ResolvedIcons, checkImage } from '../../Contexts/CheckImage';
import LikedRecipeContext from '../../Contexts/LikedRecipeContext';
import RecipeContext from '../../Contexts/RecipeContext';

const LikedRecipeListView = () => {

  const { recipes } = useContext(RecipeContext);
  const [resolvedIcons, setResolvedIcons] = useState<ResolvedIcons>({});
  const { likedRecipes, setLikedRecipes } = useContext(LikedRecipeContext);
  const user_id = localStorage.getItem('user_id') || '0';
  const navigate = useNavigate();

  useEffect(() => {
    recipes.forEach(recipe => {
      const imageUrl = recipe.image_url ? recipe.image_url : `http://localhost:5000/static/recipes/${recipe.name}.png`;
      checkImage(imageUrl).then(exists => {
        setResolvedIcons(prev => ({ ...prev, [recipe.name]: exists ? imageUrl : <QuestionCircle color="#479F76" /> }));
      });
    });
  }, [recipes]);

  const handleLike = async (recipeId: number) => {
    // Make an API call to like the recipe
    await API.post(`/api/like-recipe/${recipeId}`);
    setLikedRecipes([...likedRecipes, { user_id: parseInt(user_id), recipe_id: recipeId }]);
  };

  const handleUnlike = async (recipeId: number) => {
    // Make an API call to unlike the recipe
    await API.delete(`/api/unlike-recipe/${recipeId}`);
    setLikedRecipes(likedRecipes.filter(lr => lr.recipe_id !== recipeId));
  };

  const handleRecipeClick = (recipeName: string) => {
    navigate(`/admin/${recipeName}`);
  };

  const goBack = () => {
    navigate(-1);
  };

  const isRecipeLiked = (recipeId: number) => {
    return likedRecipes.some(lr => lr.recipe_id === recipeId);
  };

  const LikedRecipeContent = () => {
    // Filter recipes to include only liked recipes
    const likedRecipeList = recipes.filter(recipe => isRecipeLiked(recipe.id));

    return (
      <div>
        {likedRecipeList.map((recipe, index) => (
          <RecipeBarBigComponent
            key={index}
            recipeId={recipe.id}
            liked={true} // Since we are displaying only liked recipes
            photo={resolvedIcons[recipe.name]}
            name={recipe.name}
            difficulty={recipe.difficulty}
            servings={recipe.servings}
            time={`${recipe.preparation_time} minutes`}
            onClick={() => handleRecipeClick(recipe.name)}
            onLike={handleLike}
            onUnlike={handleUnlike}
          />
        ))}
      </div>
    );
  };



  return (
    <div className="liked-recipe-list-view">
      <Header title="Liked Recipes" onLogout={goBack} buttonText='Go back' />
      <div className="controls-wrapper">
        <InputComponent placeholder="Search input" type='text' classElem='login' />
        <ButtonComponent text='Sort' onClick={goBack} classElem='big-silent' />
      </div>
      <ListPanelComponent variant='blank' label='Nazwa' children={<LikedRecipeContent />} />

    </div>
  );
};

export default LikedRecipeListView;

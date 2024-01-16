// MyFridgeView.tsx
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../Components/HeaderComponent';
import InputComponent from '../../Components/InputComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import ListPanelComponent from '../../Components/ListPanelComponent';
import './RecipeListView.css';
import RecipeBarBigComponent from '../../Components/RecipeBarBigComponent';
import RecipeContext, { Difficulty, difficultyOrder } from '../../Contexts/RecipeContext';
import { Key, useContext, useEffect, useState } from 'react';
import { ResolvedIcons, checkImage } from '../../Contexts/CheckImage';
import { QuestionCircle } from 'react-bootstrap-icons';
import API from '../../Api';
import LikedRecipeContext from '../../Contexts/LikedRecipeContext';
import RadioInputComponent from '../../Components/RadioInputComponent';



const RecipeListView = () => {

  const { recipes } =  useContext(RecipeContext);
  const [resolvedIcons, setResolvedIcons] = useState<ResolvedIcons>({});
  const { likedRecipes, setLikedRecipes } = useContext(LikedRecipeContext);
  const user_id = localStorage.getItem('user_id') || '0';
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");
  const [showSortOptions, setShowSortOptions] = useState(false); // State to track visibility of the sort options
  const location = useLocation();
  const availableRecipes = location.state?.availableRecipes;
  const baseRecipes = availableRecipes || recipes;
  const username = localStorage.getItem('username') || 'user';


  const handleSortButtonClick = () => {
    setShowSortOptions(!showSortOptions); // Toggle visibility of sort options
  };

  const handleSortChange = (selectedValue: string) => {
    setSortCriteria(selectedValue); // Update the sort criteria state
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // Update the searchTerm state on input change
  };

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
    navigate(`/${username}/${recipeName}`);
  };

  const goBack = () => {
    navigate(-1);
  };

  const isRecipeLiked = (recipeId: number) => {
    return likedRecipes.some(lr => lr.recipe_id === recipeId);
  };

  const filteredRecipes = baseRecipes.filter((item: { name: string; }) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const getSortedRecipes = () => {
    return filteredRecipes.sort((a: { name: string; difficulty: string; servings: number; preparation_time: number; }, b: { name: any; difficulty: string; servings: number; preparation_time: number; }) => {
      switch (sortCriteria) {
        case "Name":
          return a.name.localeCompare(b.name);
        case "Difficulty":
          if (a.difficulty in difficultyOrder && b.difficulty
            in difficultyOrder) {
            return difficultyOrder[a.difficulty as Difficulty] - difficultyOrder[b.difficulty as Difficulty];
          }
          return 0;
        case "Servings":
          return a.servings - b.servings;
        case "Time":
          return a.preparation_time - b.preparation_time;
        default:
          return 0;
      }
    });
  };

  const RecipeContent = () => {
    const sortedRecipes = getSortedRecipes();
    return (
      <div>
        {sortedRecipes.map((recipe: { id: number; name: string; difficulty: string; servings: number; preparation_time: any; }, index: Key | null | undefined) => (
          <RecipeBarBigComponent
            key={index}
            recipeId={recipe.id}
            liked={isRecipeLiked(recipe.id)} // Check if the recipe is liked
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
    <div className="recipe-list-view">
      <Header title="Recipes" onLogout={goBack} buttonText='Go back' />
      <div className="controls-wrapper">
        <InputComponent placeholder="Search input" type='text' classElem='login' onChange={handleSearchChange} />
        <ButtonComponent text='Sort' onClick={handleSortButtonClick} classElem='big-silent' />
        {showSortOptions && <RadioInputComponent names={["Name", "Difficulty", "Servings", "Time"]} onChange={handleSortChange} />}
      </div>
      <ListPanelComponent variant='blank' label='Recipes' children={<RecipeContent />} />

    </div>
  );
};

export default RecipeListView;

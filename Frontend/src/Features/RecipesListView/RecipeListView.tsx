// MyFridgeView.tsx
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/HeaderComponent';
import InputComponent from '../../Components/InputComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import ListPanelComponent from '../../Components/ListPanelComponent';
import './RecipeListView.css';
import RecipeBarBigComponent from '../../Components/RecipeBarBigComponent';
import backgroundImage from '../../images/background.png';

const RecipeListView = () => {

  const Image = () => {
    return (
      <img src={backgroundImage} alt='Image'/>
    )
  }
  

  const RecipeContent = () => {

    return (
      <div>
        <RecipeBarBigComponent
          photo= {<Image/>}
          name="Delicious Recipe"
          difficulty="Medium"
          servings={4}
          time="2 hours"
          onClick={() => console.log('Recipe bar clicked')}
        />
        <RecipeBarBigComponent
          photo= {<Image/>}
          name="Delicious Recipe"
          difficulty="Medium"
          servings={4}
          time="2 hours"
        />
        <RecipeBarBigComponent
          photo= {<Image/>}
          name="Delicious Recipe"
          difficulty="Medium"
          servings={4}
          time="2 hours"
        />
        <RecipeBarBigComponent
          photo= {<Image/>}
          name="Delicious Recipe"
          difficulty="Medium"
          servings={4}
          time="2 hours"
        />
        <RecipeBarBigComponent
          photo= {<Image/>}
          name="Delicious Recipe"
          difficulty="Medium"
          servings={4}
          time="2 hours"
        />

      </div>
    );
  };

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };



  return (
    <div className="recipe-list-view">
      <Header title="Recipes" onLogout={goBack} buttonText='Go back' />
      <div className="controls-wrapper">
        <InputComponent placeholder="Search input" type='login' classElem='login' />
        <ButtonComponent text='Sort' onClick={goBack} classElem='big-silent' />
      </div>
      <ListPanelComponent variant='recipe' label='Nazwa' children={<RecipeContent />} />

    </div>
  );
};

export default RecipeListView;

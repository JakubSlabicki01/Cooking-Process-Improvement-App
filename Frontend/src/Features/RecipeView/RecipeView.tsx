// MyFridgeView.tsx
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../Components/HeaderComponent';
import ListPanelComponent from '../../Components/ListPanelComponent';
import './RecipeView.css';
import ItemWidgetComponent from '../../Components/ItemWidgetComponent';
import API from '../../Api';
import { QuestionCircle } from 'react-bootstrap-icons';
import RecipeContext, { Recipe } from '../../Contexts/RecipeContext';
import FoodItemContext from '../../Contexts/FoodItemContext';




const RecipeView = () => {
    const { recipeName } = useParams();
    const { recipes } = useContext(RecipeContext);
    const { foodItems } = useContext(FoodItemContext);
    const navigate = useNavigate();


    const goBack = () => {
        navigate(-1);
    };

    const recipe = recipes.find(r => r.name === recipeName) as Recipe;


    return (
        <div className="recipe-view">
            <Header title={recipe?.name || 'Recipe'} onLogout={goBack} buttonText='Go back' />

            <img src={recipe?.image_url} alt={recipe?.name} className="recipe-photo" />

            <ListPanelComponent variant='blank' label='Recipe Details'>
                <div className="recipe-details">
                    <p><strong>Difficulty:</strong> {recipe?.difficulty}</p>
                    <p><strong>Preparation Time:</strong> {recipe?.preparation_time} minutes</p>
                    <p><strong>Servings:</strong> {recipe?.servings}</p>
                    <p><strong>Ingredients:</strong></p>
                    <ul>
                        {recipe.ingredients.map((ingredient: { id: number; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }, index: Key | null | undefined) => {
                            // Find the corresponding quantity in recipe_ingredients
                            const recipeIngredient = recipe.recipe_ingredients.find(ri => ri.food_item_id === ingredient.id);
                            return (
                                <div key={index}>
                                    {ingredient.name} - {recipeIngredient ? recipeIngredient.quantity : 'Unknown Quantity'}
                                </div>
                            );
                        })}
                    </ul>
                    <p><strong>Instructions:</strong></p>
                    <p>{recipe?.instructions}</p>
                </div>
            </ListPanelComponent>
        </div>
    );
};

export default RecipeView;

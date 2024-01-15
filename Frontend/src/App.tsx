
import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './Features/Home/Home';
import { QueryClient, QueryClientProvider } from "react-query";
import LoginForm from './Features/LoginForm/LoginForm';
import SigninForm from './Features/SignInForm/SigninForm';
import UserPanel from './Features/UserPanel/UserPanel';
import './index.css';
import './App.css'
import MyFridgeView from './Features/MyFridgeView/MyFridgeView';
import AddFromListView from './Features/AddFromListView/AddFromListView';
import ScanProducts from './Features/ScanProducts/ScanProducts';
import TasteMatching from './Features/TasteMatchingView/TasteMatching';
import ChosenProductView from './Features/TasteMatchingView/ChosenProductView';
import RecipeListView from './Features/RecipesListView/RecipeListView';
import LikedRecipeListView from './Features/LikedRecipesView/LikedRecipeListView';
import Settings from './Features/Settings/SettingsView';
import PrivateRoute from './PrivateRoute';
import ChatGPTTest from './ChatGPTTest';
import FoodItemContext, { FoodItem } from './Contexts/FoodItemContext';
import FridgeItemContext, { FridgeItem } from './Contexts/FridgeItemContext';
import RecipeContext, { Recipe } from './Contexts/RecipeContext';
import RecipeView from './Features/RecipeView/RecipeView';
import LikedRecipeContext, { LikedRecipe } from './Contexts/LikedRecipeContext';

// Placeholder components for the routes
// You would replace these placeholders with your actual components

const App = () => {

  const queryClient = new QueryClient();
  const username = localStorage.getItem('username') || 'user';
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [fridgeItems, setFridgeItems] = useState<FridgeItem[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [likedRecipes, setLikedRecipes] = useState<LikedRecipe[]>([]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />, // Assuming BackgroundImage is the layout component 
    },
    {
      path: "/login",
      element: <LoginForm />, // Assuming BackgroundImage is the layout component 
    },

    {
      path: "/register",
      element: <SigninForm />, // Assuming BackgroundImage is the layout component 
    },

    {
      path: `/${username}`,
      element: (
        <PrivateRoute>
          <UserPanel />
        </PrivateRoute>
      ),
    },

    {
      path: `/${username}/my-fridge`,
      element: (
        <PrivateRoute>
          <MyFridgeView />
        </PrivateRoute>
      ), // Assuming BackgroundImage is the layout component 
    },

    {
      path: `/${username}/add`,
      element: (
        <PrivateRoute>
          <AddFromListView />
        </PrivateRoute>
      ), // Assuming BackgroundImage is the layout component 
    },

    {
      path: `/${username}/scan`,
      element: (
        <PrivateRoute>
          <ScanProducts />
        </PrivateRoute>
      ), // Assuming BackgroundImage is the layout component 
    },

    {
      path: `/${username}/match`,
      element: (
        <PrivateRoute>
          <TasteMatching />
        </PrivateRoute>
      ), // Assuming BackgroundImage is the layout component 
    },
    {
      path: `/${username}/chosen-product`,
      element: (
        <PrivateRoute>
          <ChosenProductView />
        </PrivateRoute>
      ), // Assuming BackgroundImage is the layout component 
    },

    {
      path: `/${username}/recipe-list`,
      element: (
        <PrivateRoute>
          <RecipeListView />
        </PrivateRoute>
      ), // Assuming BackgroundImage is the layout component 
    },

    {
      path: `/${username}/liked-recipes`,
      element: (
        <PrivateRoute>
          <LikedRecipeListView />
        </PrivateRoute>
      ), // Assuming BackgroundImage is the layout component 
    },

    {
      path: `/${username}/:recipeName`,
      element: (
        <PrivateRoute>
          <RecipeView />
        </PrivateRoute>
      ), // Assuming BackgroundImage is the layout component 
    },

    {
      path: `/${username}/settings`,
      element: (
        <PrivateRoute>
          <ChatGPTTest />
        </PrivateRoute>
      ), // Assuming BackgroundImage is the layout component 
    },


  ]);




  return (
    <QueryClientProvider client={queryClient}>
      <LikedRecipeContext.Provider value={{ likedRecipes, setLikedRecipes }}>
      <FoodItemContext.Provider value={{ foodItems, setFoodItems }}>
      <FridgeItemContext.Provider value={{ fridgeItems, setFridgeItems }}>
      <RecipeContext.Provider value={{ recipes, setRecipes }}>
        <RouterProvider router={router} />
        </RecipeContext.Provider>
        </FridgeItemContext.Provider>
      </FoodItemContext.Provider>
      </LikedRecipeContext.Provider>
    </QueryClientProvider>
  );
};

export default App;

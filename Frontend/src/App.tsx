
import React from 'react';
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

// Placeholder components for the routes
// You would replace these placeholders with your actual components

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
    path: "/signin",
    element: <SigninForm />, // Assuming BackgroundImage is the layout component 
  },

  {
    path: "/signin",
    element: <SigninForm />, // Assuming BackgroundImage is the layout component 
  },
  {
    path: "/user",
    element: <UserPanel />, // Assuming BackgroundImage is the layout component 
  },

  {
    path: "/my-fridge",
    element: <MyFridgeView />, // Assuming BackgroundImage is the layout component 
  },

  {
    path: "/add",
    element: <AddFromListView />, // Assuming BackgroundImage is the layout component 
  },

  {
    path: "/scan",
    element: <ScanProducts />, // Assuming BackgroundImage is the layout component 
  },

  {
    path: "/my-fridge",
    element: <MyFridgeView />, // Assuming BackgroundImage is the layout component 
  },

  {
    path: "/match",
    element: <TasteMatching />, // Assuming BackgroundImage is the layout component 
  },
  {
    path: "/chosen-product",
    element: <ChosenProductView />, // Assuming BackgroundImage is the layout component 
  },

  {
    path: "/recipe-list",
    element: <RecipeListView />, // Assuming BackgroundImage is the layout component 
  },

  {
    path: "/liked-recipes",
    element: <LikedRecipeListView />, // Assuming BackgroundImage is the layout component 
  },

  {
    path: "/recipe",
    element: <MyFridgeView />, // Assuming BackgroundImage is the layout component 
  },

  {
    path: "/settings",
    element: <Settings />, // Assuming BackgroundImage is the layout component 
  },


]);

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;

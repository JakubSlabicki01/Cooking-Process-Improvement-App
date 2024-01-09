
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
import PrivateRoute from './PrivateRoute';

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
    path: "/register",
    element: <SigninForm />, // Assuming BackgroundImage is the layout component 
  },

  {
    path: "/user",
    element: (
      <PrivateRoute>
        <UserPanel />
      </PrivateRoute>
    ),
  },

  {
    path: "/my-fridge",
    element: (
      <PrivateRoute>
        <MyFridgeView />
      </PrivateRoute>
    ), // Assuming BackgroundImage is the layout component 
  },

  {
    path: "/add",
    element: (
      <PrivateRoute>
        <AddFromListView />
      </PrivateRoute>
    ), // Assuming BackgroundImage is the layout component 
  },

  {
    path: "/scan",
    element: (
      <PrivateRoute>
        <ScanProducts />
      </PrivateRoute>
    ), // Assuming BackgroundImage is the layout component 
  },

  {
    path: "/match",
    element: (
      <PrivateRoute>
        <TasteMatching />
      </PrivateRoute>
    ), // Assuming BackgroundImage is the layout component 
  },
  {
    path: "/chosen-product",
    element: (
      <PrivateRoute>
        <ChosenProductView />
      </PrivateRoute>
    ), // Assuming BackgroundImage is the layout component 
  },

  {
    path: "/recipe-list",
    element: (
      <PrivateRoute>
        <RecipeListView />
      </PrivateRoute>
    ), // Assuming BackgroundImage is the layout component 
  },

  {
    path: "/liked-recipes",
    element: (
      <PrivateRoute>
        <LikedRecipeListView />
      </PrivateRoute>
    ), // Assuming BackgroundImage is the layout component 
  },

  {
    path: "/recipe",
    element: (
      <PrivateRoute>
        <MyFridgeView />
      </PrivateRoute>
    ), // Assuming BackgroundImage is the layout component 
  },

  {
    path: "/settings",
    element: (
      <PrivateRoute>
        <Settings />
      </PrivateRoute>
    ), // Assuming BackgroundImage is the layout component 
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

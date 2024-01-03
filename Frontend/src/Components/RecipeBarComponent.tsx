import React from 'react';
import './RecipeBarComponent.css';

interface RecipeBarProps {
  recipeName: string;
  icon: React.ReactNode; // Accept a React node for the icon
}

const RecipeBar: React.FC<RecipeBarProps> = ({ recipeName, icon }) => {
  return (
    <div className="recipe-bar">
      <div className="recipe-icon">{icon}</div> {/* Render the larger icon */}
      <span className="recipe-name">{recipeName}</span>
    </div>
  );
};

export default RecipeBar;

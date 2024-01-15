import React from 'react';
import './RecipeBarComponent.css';

interface RecipeBarProps {
  recipeName: string;
  icon: React.ReactNode; // Accept a React node for the icon
}



const RecipeBar: React.FC<RecipeBarProps> = ({ recipeName, icon }) => {

  const renderImg = () => {
    if (typeof icon === 'string') {
      return (
        <div>
        <img src={icon} alt={icon} className="recipe-icon" />
        </div>
      )
    }
    return icon; // If it's not a string, it's assumed to be a JSX element or ReactNode
  };

  return (
    <div className="recipe-bar">
      <div className="recipe-icon">{renderImg()}</div> {/* Render the larger icon */}
      <span className="recipe-name">{recipeName}</span>
    </div>
  );
};

export default RecipeBar;

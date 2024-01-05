import React, { useState } from 'react';
import './RecipeBarBigComponent.css';
import { StarFill, Star } from 'react-bootstrap-icons';

interface RecipeBarProps {
  photo: React.ReactNode;
  name: string;
  difficulty: string;
  servings: number;
  time: string;
  onClick?: () => void;
}

const RecipeBarBigComponent: React.FC<RecipeBarProps> = ({ photo, name, difficulty, servings, time, onClick }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setLiked(!liked);
  };

  return (
    <div className={`recipe-bar-big${onClick ? ' clickable' : ''}`} onClick={onClick}>
      <div className="recipe-photo">{photo}</div>
      <span className="recipe-title">{name}</span>
      <span className="recipe-difficulty">{difficulty}</span>
      <span className="recipe-servings">{servings} servings</span>
      <span className="recipe-time">{time}</span>
      <button onClick={handleLike} className={`recipe-like ${liked ? 'star-filled' : ''}`}>
        {liked ? <StarFill color="#146C43" /> : <Star className="star-outline" />}
      </button>
    </div>
  );
};

export default RecipeBarBigComponent;

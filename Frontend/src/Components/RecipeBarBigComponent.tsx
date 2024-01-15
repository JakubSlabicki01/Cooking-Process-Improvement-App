import React, { useState } from 'react';
import './RecipeBarBigComponent.css';
import { StarFill, Star } from 'react-bootstrap-icons';

interface RecipeBarProps {
  recipeId: number;
  photo: React.ReactNode;
  name: string;
  difficulty: string;
  servings: number;
  time: string;
  liked: boolean;
  onClick?: () => void;
  onLike: (recipeId: number) => void;
  onUnlike: (recipeId: number) => void;

}

const RecipeBarBigComponent: React.FC<RecipeBarProps> = ({ recipeId, photo, name, difficulty, servings, time, liked: initialLiked, onClick, onLike, onUnlike }) => {
  const [liked, setLiked] = useState(initialLiked);

  const handleLike = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setLiked(!liked);

    if (liked) {
      onUnlike(recipeId);
    } else {
      onLike(recipeId);
    }
  };

  const renderImg = () => {
    if (typeof photo === 'string') {
      return (
        <div>
        <img src={photo} alt={photo} className="recipe-photo" />
        </div>
      )
    }
    return photo; // If it's not a string, it's assumed to be a JSX element or ReactNode
  };

  return (
    <div className={`recipe-bar-big${onClick ? ' clickable' : ''}`} onClick={onClick}>
      <div className="recipe-photo">{renderImg()}</div>
      <span className="recipe-title">{name}</span>
      <span className="recipe-difficulty">Difficulty: {difficulty}</span>
      <span className="recipe-servings">{servings} servings</span>
      <span className="recipe-time">Preparation: {time}</span>
      <button onClick={handleLike} className={`recipe-like ${liked ? 'star-filled' : ''}`}>
        {liked ? <StarFill color="#146C43" /> : <Star className="star-outline" />}
      </button>
    </div>
  );
};

export default RecipeBarBigComponent;

import React from 'react';
import { Button } from 'react-bootstrap';
import './Button.css';

interface ButtonCompProps {
  text: string;
  onClick: () => void;
  classElem?: 'big-silent' | 'big-normal' | 'small-silent' | 'small-normal';
}

const ButtonComponent: React.FC<ButtonCompProps> = ({ text, onClick, classElem = 'big-normal' }) => {
  // Extract 'big' or 'small' and 'silent' or 'normal' from classElem
  const size = classElem.includes('small') ? 'small' : 'big';
  const type = classElem.includes('silent') ? 'silent' : 'normal';

  return (
    <Button
      className={`${size}-button ${type}`}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default ButtonComponent;

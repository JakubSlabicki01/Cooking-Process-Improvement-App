import React from 'react';
import './HeaderComponent.css';
import ButtonComponent from '../Components/ButtonComponent'; // Assuming you have this component

interface HeaderProps {
  title: string;
  buttonText: string;
  onLogout: () => void; // Function to call when the logout button is clicked
}

const Header: React.FC<HeaderProps> = ({ title, onLogout, buttonText }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <ButtonComponent text={buttonText} onClick={onLogout} classElem="small-silent"/>
    </header>
  );
};

export default Header;

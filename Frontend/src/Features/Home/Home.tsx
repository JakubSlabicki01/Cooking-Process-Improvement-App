
import React from 'react';
import './Home.css';
import ButtonComponent from '../../Components/ButtonComponent';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
const Home = () => {
  const navigate = useNavigate(); // Hook for navigation

  const goToLogin = () => {
    navigate('/login'); // Define the navigation path
  }

  const goToSignin = () => {
    navigate('/signin'); // Define the navigation path
  }

  return (
    <div className="home">
      <h1>Application for cooking process improvement</h1>
      <div className="button-container">
      <ButtonComponent text={"Log in"} onClick={goToLogin} classElem="big-normal"/>
      <ButtonComponent text={"Create account"} onClick={goToSignin} classElem="big-silent"/>
      </div>
    </div>
  );
};

export default Home;

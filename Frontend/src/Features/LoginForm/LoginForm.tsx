
import React from 'react';
import './LoginForm.css';
import InputComponent from '../../Components/InputComponent.tsx';
import ButtonComponent from '../../Components/ButtonComponent.tsx';
import { useNavigate } from 'react-router-dom';
import { Alert, Container, Row, Col } from "react-bootstrap";
import CheckboxComponent from '../../Components/CheckboxComponent.tsx';

const LoginForm = () => {
  const navigate = useNavigate(); // Hook for navigation

  const goBack = () => {
    navigate(-1); // Define the navigation path
  }

  const goToUserPanel = () => {
    navigate('/user'); // Define the navigation path
  }
  return (
    <div className='page-container'>
      <div className="login-form">
        <h1>Welcome back to cooking</h1>
        <Container style={{marginBottom: "10%"}}>
        <Row>
        <InputComponent type="email" classElem='email' placeholder='E-mail'/>
        </Row>
        <Row>
        <InputComponent type="password" classElem='password' placeholder='Password'/>
        </Row>
        <Row>

        <CheckboxComponent label="Stay signed in" />

        </Row>
        </Container>
        <div className='button-container'>
        <ButtonComponent text={"Log in"} onClick={goToUserPanel} classElem="big-normal"/>
        <ButtonComponent text={"Cancel"} onClick={goBack} classElem="big-silent"/>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;


import React from 'react';
import '../LoginForm/LoginForm.css';
import InputComponent from '../../Components/InputComponent.tsx';
import ButtonComponent from '../../Components/ButtonComponent.tsx';
import { useNavigate } from 'react-router-dom';
import { Alert, Container, Row, Col } from "react-bootstrap";
import CheckboxComponent from '../../Components/CheckboxComponent.tsx';

const SigninForm = () => {
  const navigate = useNavigate(); // Hook for navigation

  const goBack = () => {
    navigate(-1); // Define the navigation path
  }
  return (
    <div className="login-form">
      <h1>Welcome! Create an account!</h1>
      <Container style={{margin: "10%"}}>
      <Row>
      <InputComponent type="email" classElem='email' placeholder='E-mail'/>
      </Row>
      <Row>
      <InputComponent type="login" classElem='login' placeholder='Login'/>
      </Row>
      <Row>
      <InputComponent type="password" classElem='password' placeholder='Password'/>
      </Row>
      </Container>
      <div className='button-container'>
      <ButtonComponent text={"Sign in"} onClick={goBack} classElem="big-normal"/>
      <ButtonComponent text={"Cancel"} onClick={goBack} classElem="big-silent"/>
      </div>
    </div>
  );
};

export default SigninForm;


import React, { useState } from 'react';
import '../LoginForm/LoginForm.css';
import InputComponent from '../../Components/InputComponent.tsx';
import ButtonComponent from '../../Components/ButtonComponent.tsx';
import { useNavigate } from 'react-router-dom';
import { Alert, Container, Row, Col } from "react-bootstrap";
import CheckboxComponent from '../../Components/CheckboxComponent.tsx';
import API from '../../Api.tsx';

const SigninForm = () => {
  const navigate = useNavigate(); // Hook for navigation

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const response = await API.post('/register', {
        email,
        username,
        password,
      });
      if (response.status === 201) {
        console.log('User created successfully');
        navigate('/login'); // Redirect to login page after successful registration
      } else {
        console.error('Registration failed:', response.data.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const goBack = () => {
    navigate(-1); // Define the navigation path
  }
  return (
    <div className="login-form">
      <div className='title'>Welcome! Create an account!</div>
      <Container style={{margin: "10%"}}>
      <Row>
      <InputComponent type="email" classElem='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='E-mail' />
      </Row>
      <Row>
      <InputComponent type="text" classElem='login' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
      </Row>
      <Row>
      <InputComponent type="password" classElem='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
      </Row>
      </Container>
      <div className='button-container'>
      <ButtonComponent text={"Sign in"} onClick={handleSignIn} classElem="big-normal"/>
      <ButtonComponent text={"Cancel"} onClick={goBack} classElem="big-silent"/>
      </div>
    </div>
  );
};

export default SigninForm;

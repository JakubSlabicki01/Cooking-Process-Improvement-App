
import React, { useState } from 'react';
import './LoginForm.css';
import InputComponent from '../../Components/InputComponent.tsx';
import ButtonComponent from '../../Components/ButtonComponent.tsx';
import { useNavigate } from 'react-router-dom';
import { Alert, Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import CheckboxComponent from '../../Components/CheckboxComponent.tsx';
import API from '../../Api';

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = () => {
    if (!email || !password) {  // Adjust validation rules as needed
      setErrorMessage('Email and password are required');
      return false;
    }
    // Add other validation rules as needed
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    try {
      const response = await API.post('/login', { email, password });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.access_token);
        navigate('/user');
      } else {
        console.error('Login failed:', response.data.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };


  const goBack = () => {
    navigate('/'); // Define the navigation path
  }

  return (
    <div className="login-form">
      <div className='title'>Welcome back to cooking</div>
      <Container style={{ margin: "10%" }}>
        <Row>
          <InputComponent type="email" classElem='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='E-mail' />
        </Row>
        <Row>
          <InputComponent type="password" classElem='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
        </Row>
      </Container>
      {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
      
      <div className='button-container'>
        <ButtonComponent text={"Log in"} onClick={handleLogin} classElem="big-normal" />
        <ButtonComponent text={"Cancel"} onClick={goBack} classElem="big-silent" />
      </div>
    </div>
  );
};

export default LoginForm;

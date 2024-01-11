
import { useState } from 'react';
import '../LoginForm/LoginForm.css';
import InputComponent from '../../Components/InputComponent.tsx';
import ButtonComponent from '../../Components/ButtonComponent.tsx';
import { useNavigate } from 'react-router-dom';
import { Container, Row } from "react-bootstrap";
import API from '../../Api.tsx';
import  axios, { AxiosError } from 'axios';

const SigninForm = () => {
  const navigate = useNavigate(); // Hook for navigation

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


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
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        if (serverError && serverError.response) {
          // Extract and set the error message from server response
          setErrorMessage(serverError.response.data.message);
        }
      } else {
        // Handle non-Axios error
        setErrorMessage('An unexpected error occurred: ' + error);
      }
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
      {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
      <div className='button-container'>
      <ButtonComponent text={"Sign in"} onClick={handleSignIn} classElem="big-normal"/>
      <ButtonComponent text={"Cancel"} onClick={goBack} classElem="big-silent"/>
      </div>
    </div>
  );
};

export default SigninForm;

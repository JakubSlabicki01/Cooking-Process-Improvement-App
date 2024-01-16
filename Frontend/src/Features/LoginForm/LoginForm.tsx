
import { useState } from 'react';
import './LoginForm.css';
import InputComponent from '../../Components/InputComponent.tsx';
import ButtonComponent from '../../Components/ButtonComponent.tsx';
import { useNavigate } from 'react-router-dom';
import { Container, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import API from '../../Api';
import axios, { AxiosError } from 'axios';


const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');



  const handleLogin = async () => {

    try {
      const response = await API.post('/login', { email, password });

      console.log(response)
  
      if (response.status === 200) {
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('user_id', response.data.user_id);

        navigate(`/${localStorage.getItem('username')}`);
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

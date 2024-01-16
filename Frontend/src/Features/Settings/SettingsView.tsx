import Header from '../../Components/HeaderComponent';
import { useNavigate } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import ButtonComponent from '../../Components/ButtonComponent';
import InputComponent from '../../Components/InputComponent';
import { useContext, useState } from 'react';
import API from '../../Api';
import FoodItemContext from '../../Contexts/FoodItemContext';
import FridgeItemContext from '../../Contexts/FridgeItemContext';
import LikedRecipeContext from '../../Contexts/LikedRecipeContext';
import axios, { AxiosError } from 'axios';



const Settings = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setRecognizedItems } = useContext(FoodItemContext);
  const { setFridgeItems } = useContext(FridgeItemContext);
  const { setLikedRecipes } = useContext(LikedRecipeContext);
  const userId = localStorage.getItem('user_id'); // Assuming user ID is stored in local storage


  const handleUpdate = async () => {
    try {
      const response = await API.put(`/update-user/${userId}`, {
        email,
        username,
        password,
      });
      if (response.status === 201) {
        alert('User information updated successfully');
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

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        await API.delete(`/delete-user/${userId}`);
        alert('Account deleted successfully');
        localStorage.removeItem('token'); // Remove the token from local storage
        localStorage.removeItem('username');
        localStorage.removeItem('user_id');
        setFridgeItems([]);
        setLikedRecipes([]);
        setRecognizedItems([]);
        navigate('/')
      } catch (error) {
        setErrorMessage('Failed to delete account' + error);
      }
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <Header title='Settings' onLogout={goBack} buttonText='Go back'></Header>
      <div className="login-form">
        <div className='title'>Change your data or delete your accout</div>
        <Container style={{ margin: "10%" }}>
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
          <ButtonComponent text={"Save changes"} onClick={handleUpdate} classElem="big-normal" />
          <ButtonComponent text={"Delete"} onClick={handleDeleteAccount} classElem="big-silent-delete" />
        </div>
      </div>
    </div>
  );
};

export default Settings;

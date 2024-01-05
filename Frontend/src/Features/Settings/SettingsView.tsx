import Header from '../../Components/HeaderComponent';
import { useNavigate } from 'react-router-dom';
import settingsIcon from '../../images/icons/settingsIcon.png';
import {Display, GearFill} from 'react-bootstrap-icons'



const Settings= () => {

  const navigate = useNavigate(); // Hook for navigation

  const goBack = () => {
    navigate(-1); // Define the navigation path
  }

  

  return (
    <div>
      <Header title='Settings' onLogout={goBack} buttonText='Go back'></Header>
      <div style={{display: "flex"}}>
      
      <GearFill size={230} color="green" />

      </div>

      {/* More widgets as needed */}
    </div>
  );
};

export default Settings;

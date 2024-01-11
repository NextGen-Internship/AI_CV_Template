import { useState } from 'react'
import './App.css'
// import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import LoginSignUp from './LoginSignUp/LoginSignUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import PdfUpload from './PdfUpload/PdfUpload';


function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      console.log(tokenResponse);
      setLoggedIn(true)
    }
  });
  
  
  return (
    <>
    {isLoggedIn ? 
    (<PdfUpload></PdfUpload>) : 
    (<LoginSignUp>
        <button onClick={() => login()}>
        <FontAwesomeIcon icon={faGoogle} size='2x' color=''/> 
        </button>
      </LoginSignUp>)
      }
    </>
  )
}

export default App

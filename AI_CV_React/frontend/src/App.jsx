import { useState } from 'react'
import './App.css'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import LoginSignUp from './LoginSignUp/LoginSignUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import PdfUpload from './PdfUpload/PdfUpload';
import PdfDownload from './PdfDownload/PdfDownload';


function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isUploadSuccessful, setIsUploadSuccessful] = useState(false);

  const login = useGoogleLogin({
    onSuccess: async (response) =>{
      console.log('Google Login Response:', response)
      try{
        //Send the access token to the backend
        const backendResponse = await axios.post(
          'http://localhost:9090/process-google-token',
          {
            accessToken: response.access_token
          },
          {
            headers: {
              'Content-Type' : 'application/json',
            },
          }
        );
        console.log('Backend Response: ', backendResponse.data)
        setLoggedIn(true)
      } catch(err) {
        console.error('Error sending access token to backend', err);
      }
    },
  });

  const handleUploadSuccess = () => {
    setIsUploadSuccessful(true);
  }
  
  return (
    <>
    {isLoggedIn ? 
    (<PdfUpload onUploadSuccess={handleUploadSuccess}></PdfUpload>) : 
    (<LoginSignUp>
        <button onClick={() => login()}>
        <FontAwesomeIcon icon={faGoogle} size='2x' color=''/> 
        </button>
      </LoginSignUp>)
      }
      {isUploadSuccessful && <PdfDownload></PdfDownload>}
    </>
  )
}

export default App;

import { useState } from 'react'
import './App.css'
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import LoginSignUp from './LoginSignUp/LoginSignUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import PdfUpload from './PdfUpload/PdfUpload';
import PdfDownload from './PdfDownload/PdfDownload';


function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isUploadSuccessful, setIsUploadSuccessful] = useState(false);



  const responseGoogle = async (response) => {
    console.log(response.credential);
    const credential = response.credential;
    try{
      const backendResponse = await axios.post('http://localhost:9090/process-google-token', credential);
      console.log('Backend Response:', backendResponse.data);
      setLoggedIn(true);
    }catch(error) {
      console.error('Error sending access token to backend', error);
    }
  };

  const handleUploadSuccess = () => {
    setIsUploadSuccessful(true);
  }

  return (
    <>
    {isLoggedIn ? 
    (<PdfUpload onUploadSuccess={handleUploadSuccess}></PdfUpload>) : 
    (<LoginSignUp>
        <GoogleLogin
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        clientId="882008211267-hm9q7m1g6ogig1j1nj1kug0tju1a96i4.apps.googleusercontent.com"
        buttonText="Login with Google"
        cookiePolicy={'single_host_origin'}
        className="google-login-button"
      />
      </LoginSignUp>)
      }
      {isUploadSuccessful && <PdfDownload></PdfDownload>}
      {/* {isLoggedIn ? 
    (<PdfUpload onUploadSuccess={handleUploadSuccess}></PdfUpload>) : 
    (<LoginSignUp>
        <button onClick={() => responseGoogle()}>
        <FontAwesomeIcon icon={faGoogle} size='2x' color=''/> 
        </button>
      </LoginSignUp>)
      }
      {isUploadSuccessful && <PdfDownload></PdfDownload>} */}
    </>
  )
}

export default App;


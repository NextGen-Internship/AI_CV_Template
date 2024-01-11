import { useState } from 'react'
import './App.css'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import LoginSignUp from './LoginSignUp/LoginSignUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

function App() {
  const [count, setCount] = useState(0)
  const [showAddTask, setShowAddTask] = useState(false)

  const login = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse),
  });

  // const login = useGoogleLogin({
  //   onSuccess: async (response) => {
  //     try{
  //       const res = await axios.get(
  //         "https://www.googleapis.com/oauth2/v3/userinfo",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${response.access_token}`,
  //           },
  //         }
  //       );
  //       console.log(res);
  //     } catch(err) {
  //       console.log(err);
  //     }
  //   },
  // });
  
  
  return (
    <>
      <LoginSignUp>
        <button onClick={() => login()}>
        <FontAwesomeIcon icon={faGoogle} size='2x' color=''/> 
        </button>
      </LoginSignUp>
    </>
  )
}

export default App

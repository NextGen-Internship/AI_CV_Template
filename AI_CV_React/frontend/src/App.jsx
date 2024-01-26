import { useState, useEffect } from "react";
import "./App.css";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import axios from "axios";
import LoginSignUp from "./Login/LoginSignUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import PdfUpload from "./PdfUpload/PdfUpload";
import PdfDownload from "./PdfDownload/PdfDownload";
import LogOut from "./Login/Logout";
import Navbar from "./Navbar/Navbar";
import { jwtDecode } from "jwt-decode";
// import jwt from 'jsonwebtoken';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isUploadSuccessful, setIsUploadSuccessful] = useState(false);
  const [user, setUser] = useState(null);

  const checkToken = async () => {
    const storedToken = localStorage.getItem("jwtToken");
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        if (decodedToken) {
          setUser(decodedToken.user);
          setLoggedIn(true);
        }
      } catch (error) {
        console.error("Error decoding JWT token:", error.message);
        localStorage.removeItem("jwtToken");
      }
    }
  };

  const responseGoogle = async (response) => {
    console.log(response.credential);
    const credential = response.credential;
    try {
      const backendResponse = await axios.post(
        "http://backend_java/process-google-token",
        credential
      );
      console.log("Backend Response:", backendResponse.data);
      const jwtToken = backendResponse.data;
      localStorage.setItem("jwtToken", jwtToken);
      const decodedToken = jwtDecode(jwtToken);
      console.log(decodedToken);

      if (decodedToken) {
        setUser({
          email: decodedToken.sub,
          exp: decodedToken.exp,
          iat: decodedToken.iat,
        });

        setLoggedIn(true);
      }
    } catch (error) {
      console.error("Error sending access token to backend", error);
    }
  };

  const handleUploadSuccess = () => {
    setIsUploadSuccessful(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUser(null);
    localStorage.removeItem("jwtToken");
  };

  useEffect(() => {
    console.log("User updated:", user);
  }, [user]);

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      {isLoggedIn ? (
        <PdfUpload onUploadSuccess={handleUploadSuccess}></PdfUpload>
      ) : (
        <LoginSignUp onGoogleLogin={responseGoogle} />
      )}
      {isUploadSuccessful && <PdfDownload></PdfDownload>}
    </>
  );
}

export default App;

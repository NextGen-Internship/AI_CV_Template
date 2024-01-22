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
import HomePage from "./HomePage/HomePage";

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

  const handleUploadSuccess = () => {
    setIsUploadSuccessful(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUser(null);
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userID");
  };

  useEffect(() => {
    console.log("User updated:", user);
    // localStorage.setItem("userID", user?.userid);
    if (user && user.userid !== undefined) {
      localStorage.setItem("userID", user.userid);
    }
  }, [user]);

  return (
    <>
      {/* <Navbar user={user} onLogout={handleLogout} /> */}
      {isLoggedIn ? (
        <>
          <Navbar user={user} onLogout={handleLogout} />
          <PdfUpload onUploadSuccess={handleUploadSuccess}></PdfUpload>
        </>
      ) : (
        <HomePage setUser={setUser} setLoggedIn={setLoggedIn} />
      )}
      {isUploadSuccessful && <PdfDownload></PdfDownload>}
    </>
  );
}

export default App;

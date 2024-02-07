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
import CvTemplate from "./cv/CvTemplate";
import Footer from "./Footer/Footer";
import WebSocket from "./WebSocket/Websocket";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isUploadSuccessful, setIsUploadSuccessful] = useState(false);
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);

  const checkToken = async () => {
    const storedToken = localStorage.getItem("jwtToken");
    const id = localStorage.getItem("userID");
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        if (decodedToken) {
          const response = await axios.get(
            `http://localhost:8080/api/v1/users/${id}`,
            {
              headers: {
                Authorization: `Bearer ${storedToken}`,
              },
            }
          );

          setUser(response.data);
          localStorage.setItem("userInfo", JSON.stringify(response.data));
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(
          "Error decoding or fetching user information:",
          error.message
        );
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
    localStorage.removeItem("userInfo");
  };

  useEffect(() => {
    if (user && user.userid !== undefined) {
      localStorage.setItem("userID", user.userid);
    }
  }, [user]);

  useEffect(() => {
    checkToken();
  }, [isLoggedIn]);

  return (
    <>
      {localStorage.getItem("jwtToken") ? (
        <>
          <Navbar user={user} onLogout={handleLogout} messages={messages} />
          <PdfUpload onUploadSuccess={handleUploadSuccess}></PdfUpload>
          <WebSocket messages={messages} setMessages={setMessages}></WebSocket>
          <Footer></Footer>
        </>
      ) : (
        <>
          <HomePage setUser={setUser} setLoggedIn={setLoggedIn} />
        </>
      )}
      {/* {isUploadSuccessful && <PdfDownload></PdfDownload>} */}
    </>
  );
}

export default App;

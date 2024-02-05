import { useState, useEffect } from "react";
import "./App.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Navbar from "./Navbar/Navbar";
import HomePage from "./HomePage/HomePage";
import CvTemplate from "./cv/CvTemplate";
import Footer from "./Footer/Footer";
import PdfUpload from "./PdfUpload/PdfUpload";
import PdfDownload from "./PdfDownload/PdfDownload";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isUploadSuccessful, setIsUploadSuccessful] = useState(false);
  const [user, setUser] = useState(null);
  const [showPdfUpload, setShowPdfUpload] = useState(false);

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
    setShowPdfUpload(false); 
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
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            localStorage.getItem("jwtToken") ? (
              showPdfUpload ? (
                <PdfUpload onUploadSuccess={handleUploadSuccess} />
              ) : (
                <>
                 <Navbar user={user} onLogout={handleLogout} />
                  <CvTemplate />
                  <Footer />
                </>
              )
            ) : (
              <Navigate to="/home-page" />
            )
          }
        />
        <Route
          path="/home-page"
          element={
            localStorage.getItem("jwtToken") ? (
              <>
               <Navbar user={user} onLogout={handleLogout} />
                <CvTemplate />
                <Footer />
              </>
            ) : (
              <HomePage setUser={setUser} setLoggedIn={setLoggedIn} />
            )
          }
        />
        <Route
  path="/pdf-upload"
  element={
    localStorage.getItem("jwtToken") ? (
      <>
        <Navbar user={user} onLogout={handleLogout} />
        <PdfUpload onUploadSuccess={handleUploadSuccess} />
        <Footer></Footer>
        
      </>
    ) : (
      <Navigate to="/home-page" />
    )
  } />
   <Route
  path="/cv-template"
  element={
    localStorage.getItem("jwtToken") ? (
      <>
        <Navbar user={user} onLogout={handleLogout} />
        <CvTemplate />
        <Footer></Footer>
      </>
    ) : (
      <Navigate to="/home-page" />
    )
  } />
        
      </Routes>
    </Router>
  );
}

export default App;

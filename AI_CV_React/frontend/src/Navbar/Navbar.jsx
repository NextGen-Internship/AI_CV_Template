// Navbar.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LogOut from "../Login/Logout";
import "./Navbar.css";

const Navbar = ({ onLogout }) => {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [picture, setPicture] = useState(null);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      try {
        const userInfoObject = JSON.parse(storedUserInfo);
        const userFirstName = userInfoObject?.firstname;
        const userPicture = userInfoObject?.pictureUrl;
        if (userFirstName) setFirstName(userFirstName);
        if (userPicture) setPicture(userPicture);
        setUser(userInfoObject);
      } catch (error) {
        console.error("Error parsing stored user info:", error.message);
      }
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img className="logo-image-nav" src="public/AI_CV_Logo.png" alt="Logo" />
        <div className="project-name">AI CV Template</div>
        <ul className="nav-links">
          <li>
            <Link className="link" to="/pdf-upload">Upload</Link>
          </li>
          <li>
            <Link className="link" to="/home-page">CV</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        {user && (
          <div className="user-info">
            <span className="userName">{firstName}</span>
            {picture && <img src={picture} alt="userProfile" className="userProfile" />}
            {/* Pass onLogout function to LogOut component */}
            <LogOut onLogout={onLogout} />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

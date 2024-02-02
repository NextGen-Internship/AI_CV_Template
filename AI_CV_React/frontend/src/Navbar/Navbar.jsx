import { useState, useEffect } from "react";
import React from "react";
import LogOut from "../Login/Logout";
import "./Navbar.css";

const Navbar = ({ user, onLogout }) => {
  const storedUserInfo = localStorage.getItem("userInfo");
  const [firstName, setFirstName] = useState("null");
  const [picture, setPicture] = useState(null);

  useEffect(() => {
    if (storedUserInfo) {
      try {
        const userInfoObject = JSON.parse(storedUserInfo);
        const userFirstName = userInfoObject?.firstname;
        const userPicture = userInfoObject?.pictureUrl;
        if (userInfoObject && userFirstName) {
          setFirstName(userFirstName);
        }
        if (userInfoObject && userPicture) {
          setPicture(userPicture);
        }
      } catch (error) {
        console.error("Error parsing stored user info:", error.message);
      }
    }
  }, [storedUserInfo]);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img className="logo-image-nav" src="public/AI_CV_Logo.png" />
        <div className="project-name">AI CV Template</div>
      </div>
      <div className="navbar-right">
        <div className="user-info">
          <span className="userName">{firstName}</span>
          <img src={picture} alt="userProfile" className="userProfile" />
          <LogOut onLogout={onLogout} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

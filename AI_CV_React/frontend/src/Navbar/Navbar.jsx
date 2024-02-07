import { useState, useEffect } from "react";
import React from "react";
import LogOut from "../Login/Logout";
import "./Navbar.css";
import PdfDownload from "../PdfDownload/PdfDownload";

const Navbar = ({ user, onLogout, messages }) => {
  const storedUserInfo = localStorage.getItem("userInfo");
  const [firstName, setFirstName] = useState("null");
  const [picture, setPicture] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);

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

  useEffect(() => {
    console.log("Messages updated:", messages);
  }, [messages]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOpenTemplate = (email) => {
    setSelectedEmail(email);
    console.log("Opening CV template for email:", email);
    toggleDropdown();
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img className="logo-image-nav" src="public/AI_CV_Logo.png" />
        <div className="project-name">AI CV Template</div>
        <div>Upload</div>
      </div>

      <div className="navbar-right">
        <div className="notification-bell" onClick={toggleDropdown}>
          <span className="notification-count">{messages.length}</span>{" "}
          <i class="fa fa-bell"></i>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <ul>
                {messages.map((message, index) => (
                  <li
                    key={index}
                    onClick={() => handleOpenTemplate(message.email)}
                  >
                    Your CV for {message.email} is ready
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="user-info">
          <span className="userName">{firstName}</span>
          <img src={picture} alt="userProfile" className="userProfile" />
          <LogOut onLogout={onLogout} />
        </div>
      </div>
      {selectedEmail && (
        <>
          <PdfDownload email={selectedEmail} />
        </>
      )}
    </nav>
  );
};

export default Navbar;

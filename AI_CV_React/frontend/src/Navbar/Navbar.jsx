import React, { useState, useEffect } from "react";
import LogOut from "../Login/Logout";
import "./Navbar.css";
import PdfDownload from "../PdfDownload/PdfDownload";

const Navbar = ({
  user,
  onLogout,
  messages,
  handleOpenTemplateApp,
  setSelectedEmail,
  setMessages,
}) => {
  const storedUserInfo = localStorage.getItem("userInfo");
  const [firstName, setFirstName] = useState(null);
  const [picture, setPicture] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      try {
        const userInfoObject = JSON.parse(storedUserInfo);
        const userFirstName = userInfoObject?.firstname;
        const userPicture = userInfoObject?.pictureUrl;
        if (userFirstName) setFirstName(userFirstName);
        if (userPicture) setPicture(userPicture);
      } catch (error) {
        console.error("Error parsing stored user info:", error.message);
      }
    }
  }, []);

  useEffect(() => {
    console.log("Messages updated:", messages);
  }, [messages]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOpenTemplate = (email) => {
    setSelectedEmail(email);
    console.log("Opening CV template for email:", email);
    setMessages(messages.filter((message) => message.email !== email));
    toggleDropdown();
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          className="logo-image-nav"
          src="public/AI_CV_Logo.png"
          alt="Logo"
        />
        <div className="project-name">AI CV Template</div>
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
        {user && (
          <div className="user-info">
            <span className="userName">{firstName}</span>
            <img src={picture} alt="userProfile" className="userProfile" />
            <LogOut onLogout={onLogout} />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

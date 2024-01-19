import React from "react";
import LogOut from "../Login/Logout";
import "./Navbar.css";

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/public/images.jpeg" alt="Logo" className="logo" />
      </div>
      <div className="navbar-right">
        <div className="user-info">
          <span>{user?.email}</span>
        </div>
        <LogOut onLogout={onLogout} />
      </div>
    </nav>
  );
};

export default Navbar;
